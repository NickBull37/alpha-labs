using alpha_labs._01.Configuration.Configs;
using alpha_labs._01.Configuration.Utilities;
using alpha_labs._02.Models.BudgetApp.Purchases;
using alpha_labs._06.Controllers.BudgetApp.Purchases;
using Microsoft.Extensions.Options;
using System.Globalization;

namespace alpha_labs._04.Services.BudgetApp
{
    public interface IPurchaseService
    {
        /// <summary>Calculates values for the purchase nodes.</summary>
        PurchaseNodesResponse CalculateNodeValues(List<Purchase> purchases);

        /// <summary>Creates a collection of category-specific purchase nodes.</summary>
        /// <param name="purchases"></param>
        /// <param name="month"></param>
        /// <param name="year"></param>
        /// <returns>A PurchaseHistoryRecord.</returns>
        PurchaseHistoryRecord CreatePurchaseHistoryRecord(List<Purchase> purchases, int month, int year);

        /// <summary>Creates a new purchase model entity.</summary>
        Purchase CreatePurchaseEntity(CreatePurchaseRequest request);

        /// <summary>Creates a new purchase report response.</summary>
        PurchaseReportResponse CreatePurchaseReportResponse(PurchaseNodesResponse nodes, List<Purchase> purchases);
    }

    public class PurchaseService : IPurchaseService
    {
        private readonly BudgetConfig _config;

        public PurchaseService(IOptions<BudgetConfig> config)
        {
            _config = config.Value;
        }

        /// <summary>Calculates values for the purchase nodes.</summary>
        /// DELETE LATER ONCE NEW ENDPOINT WORKS
        //public PurchaseNodesResponse CalculateNodeValues(List<Purchase> purchases)
        //{
        //    var totalMonthlySpending = purchases.Select(x => x.Amount).Sum();

        //    if (totalMonthlySpending == 0)
        //    {
        //        return new PurchaseNodesResponse
        //        {
        //            TotalEntertainmentSpending = 0,
        //            TotalEntertainmentPercentage = 0,
        //            TotalFoodSpending = 0,
        //            TotalFoodPercentage = 0,
        //            TotalHousingSpending = 0,
        //            TotalHousingPercentage = 0,
        //            TotalMiscSpending = 0,
        //            TotalMiscPercentage = 0,
        //        };
        //    }

        //    var totalEntertainmentSpending = purchases.Where(x => x.Category == "Entertainment").Select(x => x.Amount).Sum();
        //    var totalFoodSpending = purchases.Where(x => x.Category == "Food").Select(x => x.Amount).Sum();
        //    var totalHousingSpending = purchases.Where(x => x.Category == "Housing").Select(x => x.Amount).Sum();
        //    var totalMiscSpending = purchases.Where(x => x.Category == "Miscellaneous").Select(x => x.Amount).Sum();

        //    var entertainmentPercentage = totalEntertainmentSpending != 0 ? totalEntertainmentSpending / totalMonthlySpending : 0;
        //    var foodPercentage = totalFoodSpending != 0 ? totalFoodSpending / totalMonthlySpending : 0;
        //    var housingPercentage = totalHousingSpending != 0 ? totalHousingSpending / totalMonthlySpending : 0;
        //    var miscPercentage = totalMiscSpending != 0 ? totalMiscSpending / totalMonthlySpending : 0;

        //    Converter converter = new();
        //    return new PurchaseNodesResponse
        //    {
        //        TotalEntertainmentSpending = totalEntertainmentSpending,
        //        TotalEntertainmentPercentage = converter.ConvertDecimalToPercent(entertainmentPercentage),
        //        TotalFoodSpending = totalFoodSpending,
        //        TotalFoodPercentage = converter.ConvertDecimalToPercent(foodPercentage),
        //        TotalHousingSpending = totalHousingSpending,
        //        TotalHousingPercentage = converter.ConvertDecimalToPercent(housingPercentage),
        //        TotalMiscSpending = totalMiscSpending,
        //        TotalMiscPercentage = converter.ConvertDecimalToPercent(miscPercentage),
        //    };
        //}

        /// <summary>Calculates values for the purchase nodes.</summary>
        public PurchaseNodesResponse CalculateNodeValues(List<Purchase> purchases)
        {
            var totalMonthlySpending = purchases.Select(x => x.Amount).Sum();

            if (totalMonthlySpending == 0)
            {
                return new PurchaseNodesResponse();
            }

            (decimal amazonSpending, int amazonPercentage) = CalcSpendingAndPercentage(purchases, "Amazon");
            (decimal entertainmentSpending, int entertainmentPercentage) = CalcSpendingAndPercentage(purchases, "Entertainment");
            (decimal foodSpending, int foodPercentage) = CalcSpendingAndPercentage(purchases, "Food");
            (decimal housingSpending, int housingPercentage) = CalcSpendingAndPercentage(purchases, "Housing");
            (decimal miscSpending, int miscPercentage) = CalcSpendingAndPercentage(purchases, "Miscellaneous");
            (decimal wawaSpending, int wawaPercentage) = CalcSpendingAndPercentage(purchases, "Wawa");

            return new PurchaseNodesResponse
            {
                AmazonValues = CreateCategoryValues(amazonSpending, amazonPercentage),
                EntertainmentValues = CreateCategoryValues(entertainmentSpending, entertainmentPercentage),
                FoodValues = CreateCategoryValues(foodSpending, foodPercentage),
                HousingValues = CreateCategoryValues(housingSpending, housingPercentage),
                MiscValues = CreateCategoryValues(miscSpending, miscPercentage),
                WawaValues = CreateCategoryValues(wawaSpending, wawaPercentage)
            };
        }

        /// <summary>Creates a collection of category-specific purchase nodes.</summary>
        /// <param name="purchases"></param>
        /// <param name="month"></param>
        /// <param name="year"></param>
        /// <returns>A PurchaseHistoryRecord.</returns>
        public PurchaseHistoryRecord CreatePurchaseHistoryRecord(List<Purchase> purchases, int month, int year)
        {
            List<PurchaseNode> purchaseNodes = [];

            var totalPurchaseAmount = purchases.Select(x => x.Amount).Sum();

            if (totalPurchaseAmount == 0)
            {
                return new();
            }

            List<string> categories = purchases.Select(x => x.Category).Distinct().ToList();

            foreach (var category in categories)
            {
                List<Purchase> catSpecificPurchases = purchases.Where(x => x.Category == category).ToList();

                var purchaseNode = CreatePurchaseNodeModel(catSpecificPurchases, category, totalPurchaseAmount);

                purchaseNodes.Add(purchaseNode);
            }

            return CreatePurchaseHistoryRecordModel(purchaseNodes, month, year);
        }

        private static PurchaseNode CreatePurchaseNodeModel(List<Purchase> purchases, string category, decimal totalAmount)
        {
            var sum = purchases.Select(x => x.Amount).Sum();
            var percentage = sum != 0 ? sum / totalAmount : 0;

            Converter converter = new();
            return new PurchaseNode
            {
                Category = category,
                Percentage = converter.ConvertDecimalToPercent(percentage),
                Total = sum
            };
        }

        private static PurchaseHistoryRecord CreatePurchaseHistoryRecordModel(List<PurchaseNode> nodes, int month, int year)
        {
            var orderedNodes = nodes.OrderByDescending(x => x.Total);
            return new PurchaseHistoryRecord
            {
                Month = CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(month),
                Year = year,
                Total = nodes.Select(x => x.Total).Sum(),
                PurchaseNodes = orderedNodes
            };
        }

        /// <summary>Creates a new purchase model entity.</summary>
        public Purchase CreatePurchaseEntity(CreatePurchaseRequest request)
        {
            Converter converter = new();
            return new Purchase()
            {
                CreatedDate = DateTime.Now,
                UpdatedDate = null,
                PurchaseDate = converter.ConvertStringToDateTime(request.PurchaseDate),
                PurchaseDateFormatted = converter.ConvertStringToDateTime(request.PurchaseDate).ToString("M/d/yy"),
                Amount = request.Amount,
                Category = request.Category,
                Description = request.Description,
                IsLuxury = request.IsLuxury,
            };
        }

        /// <summary>Creates a new purchase report response.</summary>
        public PurchaseReportResponse CreatePurchaseReportResponse(PurchaseNodesResponse nodes, List<Purchase> purchases)
        {
            return new PurchaseReportResponse()
            {
                PurchaseTotal = purchases.Select(p => p.Amount).Sum(),
                LuxuryPurchaseTotal = purchases.Where(p => p.IsLuxury).Select(p => p.Amount).Sum(),
                LuxuryPurchaseLimit = _config.LuxuryPurchaseLimit,
                NecessityPurchaseTotal = purchases.Where(p => !p.IsLuxury).Select(p => p.Amount).Sum(),
                NodeResponse = nodes,
                PurchaseList = purchases
            };
        }

        private static (decimal, int) CalcSpendingAndPercentage(List<Purchase> purchases, string category)
        {
            Converter converter = new();
            var totalMonthlySpending = purchases.Select(x => x.Amount).Sum();

            var spendingTotal = purchases.Where(x => x.Category == category).Select(x => x.Amount).Sum();
            var percentage = spendingTotal != 0
                ? converter.ConvertDecimalToPercent(spendingTotal / totalMonthlySpending)
                : 0;

            return (spendingTotal, percentage);
        }

        private static CategoryValues CreateCategoryValues(decimal totalSpent, int percentage)
        {
            return new CategoryValues()
            {
                TotalSpent = totalSpent,
                Percentage = percentage
            };
        }
    }
}

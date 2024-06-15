using alpha_labs._01.Configuration.ActionResponse;
using alpha_labs._01.Configuration.Utilities;
using alpha_labs._02.Models.BudgetApp.Bills;
using alpha_labs._03.DataAccess.BudgetApp;
using alpha_labs._06.Controllers.BudgetApp.Bills;

namespace alpha_labs._04.Services.BudgetApp
{
    public interface IBillService
    {
        /// <summary>Runs the batch process for active bill templates.</summary>
        Task<ActionResponse> RunBillsBatch(List<BillTemplate> templates);

        /// <summary>Filters out any bill templates that already have a bill created for the current month.</summary>
        Task<ActionResponse<List<BillTemplate>>> FilterBillingTemplates(List<BillTemplate> templates);

        /// <summary>Calculates values for the billing nodes.</summary>
        BillingNodesResponse CalculateNodeValues(List<Bill> bills);

        /// <summary>Creates a new bill template model entity.</summary>
        BillTemplate CreateBillTemplateEntity(CreateBillTemplateRequest request);

        /// <summary>Creates a new billing report response.</summary>
        BillingReportResponse CreateBillingReportResponse(bool hasUnbatchedBills, BillingNodesResponse nodes, List<Bill> bills);
    }

    public class BillService : IBillService
    {
        private readonly IBillRepository _billsRepository;

        public BillService(IBillRepository billsRepository)
        {
            _billsRepository = billsRepository;
        }

        /// <summary>Runs the batch process for active bill templates.</summary>
        public async Task<ActionResponse> RunBillsBatch(List<BillTemplate> templates)
        {
            var currentDate = DateTime.Today;
            var currentMonth = currentDate.Month;
            var currentYear = currentDate.Year;

            foreach (var template in templates)
            {
                var prevBillsAvg = 0m;
                if (template.IsVariableAmount)
                {
                    var billsResponse = await _billsRepository.GetBillsByType(template.Description);
                    if (!billsResponse.IsSuccess)
                    {
                        return new FailingAR(billsResponse.ErrorMessage!);
                    }
                    if (billsResponse.Content!.Count > 0)
                    {
                        prevBillsAvg = billsResponse.Content!.Select(x => x.Amount).Average();
                    }
                }

                var dueDate = new DateTime(currentYear, currentMonth, template.PaymentDueDay);
                var bill = new Bill
                {
                    CreatedDate = DateTime.Now,
                    UpdatedDate = null,
                    Category = template.Category,
                    Description = template.Description,
                    DueDate = dueDate,
                    DueDateFormatted = dueDate.ToString("M/d/yy"),
                    Amount = prevBillsAvg == 0 ? template.Amount : prevBillsAvg,
                    IsAutoPay = template.IsAutoPay,
                    IsPaid = template.IsAutoPay,
                    HasEstimatedAmount = prevBillsAvg != 0,
                };

                var response = await _billsRepository.SaveBillToDB(bill);
                if (!response.IsSuccess)
                {
                    return new FailingAR(response.ErrorMessage!);
                }
            }
            return new PassingAR();
        }

        /// <summary>Filters out any bill templates that already have a bill created for the current month.</summary>
        public async Task<ActionResponse<List<BillTemplate>>> FilterBillingTemplates(List<BillTemplate> templates)
        {
            var billsResponse = await _billsRepository.GetBills();
            if (!billsResponse.IsSuccess)
            {
                return new FailingAR<List<BillTemplate>>(billsResponse.ErrorMessage!);
            }
            var bills = billsResponse.Content!;

            List<BillTemplate> unmatchedTemplates = [];
            unmatchedTemplates = templates
                .Where(template => !bills
                    .Any(bill => bill.Amount == template.Amount
                        && bill.Category == template.Category
                        && bill.Description == template.Description)).ToList();

            return new PassingAR<List<BillTemplate>>(unmatchedTemplates);
        }

        /// <summary>Calculates values for the billing nodes.</summary>
        public BillingNodesResponse CalculateNodeValues(List<Bill> bills)
        {
            var totalBillsAmount = bills.Select(x => x.Amount).Sum();

            if (totalBillsAmount == 0)
            {
                return new BillingNodesResponse
                {
                    BusinessBillsAmount = 0,
                    BusinessBillsPercentage = 0,
                    CarBillsAmount = 0,
                    CarBillsPercentage = 0,
                    EntertainmentBillsAmount = 0,
                    EntertainmentBillsPercentage = 0,
                    HousingBillsAmount = 0,
                    HousingBillsPercentage = 0,
                    MiscBillsAmount = 0,
                    MiscBillsPercentage = 0,
                    WebDevBillsAmount = 0,
                    WebDevBillsPercentage = 0,
                };
            }

            var billCount = bills.Count;
            var billsPaidCount = bills.Where(x => x.IsPaid).Count();

            var totalBusinessBills = bills.Where(x => x.Category == "Business").Select(x => x.Amount).Sum();
            var totalCarBills = bills.Where(x => x.Category == "Car").Select(x => x.Amount).Sum();
            var totalEntertainmentBills = bills.Where(x => x.Category == "Entertainment").Select(x => x.Amount).Sum();
            var totalHousingBills = bills.Where(x => x.Category == "Housing").Select(x => x.Amount).Sum();
            var totalMiscBills = bills.Where(x => x.Category == "Misc").Select(x => x.Amount).Sum();
            var totalWebDevBills = bills.Where(x => x.Category == "WebDev").Select(x => x.Amount).Sum();

            var businessBillPercentage = totalBusinessBills != 0 ? totalBusinessBills / totalBillsAmount : 0;
            var carBillPercentage = totalCarBills != 0 ? totalCarBills / totalBillsAmount : 0;
            var entertainmentBillPercentage = totalEntertainmentBills != 0 ? totalEntertainmentBills / totalBillsAmount : 0;
            var housingBillPercentage = totalHousingBills != 0 ? totalHousingBills / totalBillsAmount : 0;
            var miscBillPercentage = totalMiscBills != 0 ? totalMiscBills / totalBillsAmount : 0;
            var webDevBillPercentage = totalWebDevBills != 0 ? totalWebDevBills / totalBillsAmount : 0;

            Converter converter = new();
            return new BillingNodesResponse
            {
                BusinessBillsAmount = totalBusinessBills,
                BusinessBillsPercentage = converter.ConvertDecimalToPercent(businessBillPercentage),
                CarBillsAmount = totalCarBills,
                CarBillsPercentage = converter.ConvertDecimalToPercent(carBillPercentage),
                EntertainmentBillsAmount = totalEntertainmentBills,
                EntertainmentBillsPercentage = converter.ConvertDecimalToPercent(entertainmentBillPercentage),
                HousingBillsAmount = totalHousingBills,
                HousingBillsPercentage = converter.ConvertDecimalToPercent(housingBillPercentage),
                MiscBillsAmount = totalMiscBills,
                MiscBillsPercentage = converter.ConvertDecimalToPercent(miscBillPercentage),
                WebDevBillsAmount = totalWebDevBills,
                WebDevBillsPercentage = converter.ConvertDecimalToPercent(webDevBillPercentage),
            };
        }

        /// <summary>Creates a new bill template model entity.</summary>
        public BillTemplate CreateBillTemplateEntity(CreateBillTemplateRequest request)
        {
            return new BillTemplate()
            {
                CreatedDate = DateTime.Now,
                UpdatedDate = null,
                PaymentFrequency = request.PaymentFrequency,
                PaymentDueDay = request.PaymentDueDay,
                Amount = request.Amount,
                IsVariableAmount = request.IsVariableAmount,
                Category = request.Category,
                Description = request.Description,
                IsAutoPay = request.IsAutoPay,
                IsActive = true,
            };
        }

        /// <summary>Creates a new billing report response.</summary>
        public BillingReportResponse CreateBillingReportResponse(bool hasUnbatchedBills, BillingNodesResponse nodes, List<Bill> bills)
        {
            return new BillingReportResponse()
            {
                BillsCount = bills.Count,
                BillsPaidCount = bills.Where(b => b.IsPaid).Count(),
                BillingTotal = bills.Select(b => b.Amount).Sum(),
                HasUnbatchedBills = hasUnbatchedBills,
                NodeResponse = nodes,
                BillingList = bills
            };
        }
    }
}

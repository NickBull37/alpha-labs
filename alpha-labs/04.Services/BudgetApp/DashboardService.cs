using alpha_labs._01.Configuration.Configs;
using alpha_labs._02.Models.BudgetApp.Bills;
using alpha_labs._02.Models.BudgetApp.Paychecks;
using alpha_labs._02.Models.BudgetApp.Purchases;
using alpha_labs._02.Models.BudgetApp.Transactions;
using alpha_labs._06.Controllers.BudgetApp.Dashboard;
using Microsoft.Extensions.Options;

namespace alpha_labs._04.Services.BudgetApp
{
    public interface IDashboardService
    {
        /// <summary>Calculates values for the dashboard nodes.</summary>
        DashboardNodesResponse CalculateNodeValues(
            List<Bill> bills,
            List<Purchase> purchases,
            List<Paycheck> paychecks,
            List<PaycheckTemplate> templates,
            List<Transaction> transactions);
    }

    public class DashboardService : IDashboardService
    {
        private readonly BudgetConfig _config;

        public DashboardService(IOptions<BudgetConfig> config)
        {
            _config = config.Value;
        }

        /// <summary>Calculates values for the dashboard nodes.</summary>
        public DashboardNodesResponse CalculateNodeValues(
            List<Bill> bills,
            List<Purchase> purchases,
            List<Paycheck> paychecks,
            List<PaycheckTemplate> templates,
            List<Transaction> transactions)
        {
            var purchaseTotal = purchases.Select(x => x.Amount).Sum();
            var recSpendingTotal = purchases
                .Where(purchase => purchase.IsLuxury)
                .Sum(purchase => purchase.Amount);

            var billCount = bills.Count;
            var billsPaidCount = bills.Where(x => x.IsPaid).Count();
            var billsTotal = bills.Sum(bill => bill.Amount);

            var paycheckCount = paychecks.Count;
            var paycheckTemplateCount = templates.Count;
            var paycheckTotal = templates.Select(x => x.Amount).Sum();

            var transactionsTotal = transactions.Select(x => x.Amount).Sum();

            var monthlyIncomeTotal = paycheckTotal + transactionsTotal;
            var addToSavingsAmount = monthlyIncomeTotal - (purchaseTotal + billsTotal);

            return new DashboardNodesResponse
            {
                MonthlyPurchaseTotal = purchaseTotal,
                LuxuryPurchaseTotal = recSpendingTotal,
                LuxuryPurchaseLimit = _config.LuxuryPurchaseLimit,
                BillsCount = billCount,
                BillsPaidCount = billsPaidCount,
                MonthlyBillingTotal = billsTotal,
                PaycheckCount = paychecks.Count,
                PaycheckTemplateCount = templates.Count,
                MonthlyIncomeTotal = paycheckTotal,
                CurrentMonthlySavings = addToSavingsAmount,
            };
        }
    }
}

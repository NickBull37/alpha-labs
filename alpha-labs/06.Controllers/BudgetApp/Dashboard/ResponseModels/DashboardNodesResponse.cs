namespace alpha_labs._06.Controllers.BudgetApp.Dashboard
{
    public class DashboardNodesResponse
    {
        public decimal MonthlyPurchaseTotal { get; set; }

        public decimal LuxuryPurchaseTotal { get; set; }

        public decimal LuxuryPurchaseLimit { get; set; }

        public int BillsCount { get; set; }

        public int BillsPaidCount { get; set; }

        public decimal MonthlyBillingTotal { get; set; }

        public int PaycheckCount { get; set; }

        public int PaycheckTemplateCount { get; set; }

        public decimal MonthlyIncomeTotal { get; set; }

        public decimal CurrentMonthlySavings { get; set; }
    }
}

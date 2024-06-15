using alpha_labs._02.Models.BudgetApp.Funds;

namespace alpha_labs._06.Controllers.BudgetApp.Funds
{
    public class FundReportResponse
    {
        public decimal TotalMonthlyIncome { get; set; }

        public decimal CurrentMonthlySavings { get; set; }

        public decimal CombinedFundTotal { get; set; }

        public int PaycheckCount { get; set; }

        public int PaycheckTemplateCount { get; set; }

        public List<Fund> FundList { get; set; } = [];

        public IOrderedEnumerable<SavingsTableRecord> TableRecords { get; set; }
    }
}

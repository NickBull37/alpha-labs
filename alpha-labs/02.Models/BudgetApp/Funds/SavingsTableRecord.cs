namespace alpha_labs._02.Models.BudgetApp.Funds
{
    public class SavingsTableRecord
    {
        public DateTime Date { get; set; }

        public string FormattedDate { get; set; } = string.Empty;

        public string Type { get; set; } = string.Empty;

        public string Category { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public decimal Amount { get; set; }

        public decimal? Balance { get; set; }

        public string FundElementType { get; set; } = string.Empty;

        public int FundElementID { get; set; }
    }
}

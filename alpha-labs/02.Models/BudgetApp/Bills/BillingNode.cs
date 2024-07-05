namespace alpha_labs._02.Models.BudgetApp.Bills
{
    public class BillingNode
    {
        public string Category { get; set; } = string.Empty;

        public int Percentage { get; set; }

        public decimal Total { get; set; }
    }
}

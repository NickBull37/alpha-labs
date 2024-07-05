using alpha_labs._02.Models.BudgetApp.Bills;

namespace alpha_labs._06.Controllers.BudgetApp.Bills
{
    public class BillingHistoryResponse
    {
        public IEnumerable<BillingHistoryRecord> Records { get; set; } = [];
    }

    public class BillingHistoryRecord
    {
        public int ID { get; set; }

        public string Month { get; set; } = string.Empty;

        public int Year { get; set; }

        public decimal Total { get; set; }

        public IEnumerable<BillingNode> BillingNodes { get; set; } = [];
    }
}

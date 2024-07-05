using alpha_labs._02.Models.BudgetApp.Purchases;

namespace alpha_labs._06.Controllers.BudgetApp.Purchases
{
    public class PurchaseHistoryResponse
    {
        public IEnumerable<PurchaseHistoryRecord> Records { get; set; } = [];
    }

    public class PurchaseHistoryRecord
    {
        public int ID { get; set; }

        public string Month { get; set; } = string.Empty;

        public int Year { get; set; }

        public decimal Total { get; set; }

        public IEnumerable<PurchaseNode> PurchaseNodes { get; set; } = [];
    }
}

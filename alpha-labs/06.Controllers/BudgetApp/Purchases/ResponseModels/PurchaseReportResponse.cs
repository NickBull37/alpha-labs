using alpha_labs._02.Models.BudgetApp.Purchases;

namespace alpha_labs._06.Controllers.BudgetApp.Purchases
{
    public class PurchaseReportResponse
    {
        public decimal PurchaseTotal { get; set; }

        public decimal LuxuryPurchaseTotal { get; set; }

        public decimal LuxuryPurchaseLimit { get; set; }

        public decimal NecessityPurchaseTotal { get; set; }

        public PurchaseNodesResponse NodeResponse { get; set; } = new();

        public List<Purchase> PurchaseList { get; set; } = [];
    }
}

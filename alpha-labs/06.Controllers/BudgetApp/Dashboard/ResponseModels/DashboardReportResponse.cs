using alpha_labs._02.Models.BudgetApp.Funds;
using alpha_labs._06.Controllers.BudgetApp.Bills;
using alpha_labs._06.Controllers.BudgetApp.Purchases;

namespace alpha_labs._06.Controllers.BudgetApp.Dashboard
{
    public class DashboardReportResponse
    {
        public DashboardNodesResponse DashboardNodes { get; set; } = new();

        public PurchaseNodesResponse PurchaseNodes { get; set; } = new();

        public BillingNodesResponse BillingNodes { get; set; } = new();

        public List<Fund> FundsList { get; set; } = [];
    }
}

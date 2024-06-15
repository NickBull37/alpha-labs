using alpha_labs._02.Models.BudgetApp.Bills;

namespace alpha_labs._06.Controllers.BudgetApp.Bills
{
    public class BillingReportResponse
    {
        public int BillsCount { get; set; }

        public int BillsPaidCount { get; set; }

        public decimal BillingTotal { get; set; }

        public bool HasUnbatchedBills { get; set; }

        public BillingNodesResponse NodeResponse { get; set; } = new();

        public List<Bill> BillingList { get; set; } = [];
    }
}

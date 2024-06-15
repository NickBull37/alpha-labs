namespace alpha_labs._06.Controllers.BudgetApp.Bills
{
    public class BillingNodesResponse
    {
        public decimal BusinessBillsAmount { get; set; }
        public int BusinessBillsPercentage { get; set; }


        public decimal CarBillsAmount { get; set; }
        public int CarBillsPercentage { get; set; }


        public decimal EntertainmentBillsAmount { get; set; }
        public int EntertainmentBillsPercentage { get; set; }


        public decimal HousingBillsAmount { get; set; }
        public int HousingBillsPercentage { get; set; }


        public decimal MiscBillsAmount { get; set; }
        public int MiscBillsPercentage { get; set; }


        public decimal WebDevBillsAmount { get; set; }
        public int WebDevBillsPercentage { get; set; }
    }
}

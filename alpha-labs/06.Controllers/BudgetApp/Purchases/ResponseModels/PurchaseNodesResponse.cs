namespace alpha_labs._06.Controllers.BudgetApp.Purchases
{
    public class PurchaseNodesResponse
    {
        public CategoryValues AmazonValues { get; set; } = new();

        public CategoryValues EntertainmentValues { get; set; } = new();

        public CategoryValues FoodValues { get; set; } = new();

        public CategoryValues HousingValues { get; set; } = new();

        public CategoryValues MiscValues { get; set; } = new();

        public CategoryValues WawaValues { get; set; } = new();
    }

    public class CategoryValues
    {
        public decimal TotalSpent { get; set; }

        public int Percentage { get; set; }
    }
}

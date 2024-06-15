using System.ComponentModel.DataAnnotations;

namespace alpha_labs._06.Controllers.BudgetApp.Purchases
{
    public class DeletePurchasesRequest
    {
        [Required]
        public int[] PurchaseIDs { get; set; } = [];
    }
}

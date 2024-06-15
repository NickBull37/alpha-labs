using System.ComponentModel.DataAnnotations;

namespace alpha_labs._06.Controllers.BudgetApp.Purchases
{
    /// <summary>The request object for creating a purchase entity.</summary>
    public class CreatePurchaseRequest
    {
        [Required]
        public string PurchaseDate { get; set; } = string.Empty;

        [Required]
        public decimal Amount { get; set; }

        [Required]
        public string Category { get; set; } = string.Empty;

        [Required]
        public string Description { get; set; } = string.Empty;

        [Required]
        public bool IsLuxury { get; set; }
    }
}

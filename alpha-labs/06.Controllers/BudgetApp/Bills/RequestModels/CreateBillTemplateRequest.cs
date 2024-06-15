using System.ComponentModel.DataAnnotations;

namespace alpha_labs._06.Controllers.BudgetApp.Bills
{
    /// <summary>The request object for creating a bill template entity.</summary>
    public class CreateBillTemplateRequest
    {
        [Required]
        public string PaymentFrequency { get; set; } = string.Empty;

        [Required]
        public int PaymentDueDay { get; set; }

        [Required]
        public decimal Amount { get; set; }

        [Required]
        public bool IsVariableAmount { get; set; }

        [Required]
        public string Category { get; set; } = string.Empty;

        [Required]
        public string Description { get; set; } = string.Empty;

        [Required]
        public bool IsAutoPay { get; set; }
    }
}

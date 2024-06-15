using System.ComponentModel.DataAnnotations;

namespace alpha_labs._06.Controllers.BudgetApp.Transactions
{
    public class CreateTransactionRequest
    {
        [Required]
        public string TransactionDate { get; set; } = string.Empty;

        [Required]
        public string Type { get; set; } = string.Empty;

        [Required]
        public decimal Amount { get; set; }

        [Required]
        public string Description { get; set; } = string.Empty;
    }
}

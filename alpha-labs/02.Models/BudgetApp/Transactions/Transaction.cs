using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace alpha_labs._02.Models.BudgetApp.Transactions
{
    public interface ITransaction
    {
        int ID { get; set; }

        DateTime TransactionDate { get; set; }

        string TransactionDateFormatted { get; set; }

        decimal Amount { get; set; }

        string Type { get; set; }

        string Description { get; set; }

        DateTime CreatedDate { get; set; }

        DateTime? UpdatedDate { get; set; }
    }

    [Table("Transactions")]
    public class Transaction : ITransaction
    {
        [Key]
        public int ID { get; set; }

        [Required]
        public DateTime TransactionDate { get; set; }

        [Required]
        public string TransactionDateFormatted { get; set; } = string.Empty;

        [Required]
        public decimal Amount { get; set; }

        [Required]
        public string Type { get; set; } = string.Empty;

        [Required]
        public string Description { get; set; } = string.Empty;

        [Required]
        public DateTime CreatedDate { get; set; }

        public DateTime? UpdatedDate { get; set; }
    }
}

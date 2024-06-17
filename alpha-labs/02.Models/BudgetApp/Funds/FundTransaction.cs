using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace alpha_labs._02.Models.BudgetApp.Funds
{
    public interface IFundTransaction
    {
        int ID { get; set; }

        DateTime Date { get; set; }

        string DateFormatted { get; set; }

        decimal Amount { get; set; }

        decimal NewBalance { get; set; }

        string Type { get; set; }

        string FundName { get; set; }

        string Description { get; set; }

        /// <summary>The date the database record was created.</summary>
        DateTime CreatedDate { get; set; }

        /// <summary>The date of the most recent update to the database record.</summary>
        DateTime? UpdatedDate { get; set; }
    }

    [Table("Budget.FundTransactions")]
    public class FundTransaction : IFundTransaction
    {
        [Key]
        public int ID { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public string DateFormatted { get; set; } = string.Empty;

        [Required]
        public decimal Amount { get; set; }

        [Required]
        public decimal NewBalance { get; set; }

        [Required]
        public string Type { get; set; } = string.Empty;

        [Required]
        public string FundName { get; set; } = string.Empty;

        [Required]
        public string Description { get; set; } = string.Empty;

        [Required]
        public DateTime CreatedDate { get; set; }

        public DateTime? UpdatedDate { get; set; }
    }
}

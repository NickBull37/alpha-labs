using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace alpha_labs._02.Models.BudgetApp.Funds
{
    public interface IFund
    {
        int ID { get; set; }

        string Name { get; set; }

        decimal Balance { get; set; }

        int DepositCount { get; set; }

        /// <summary>The date the database record was created.</summary>
        DateTime CreatedDate { get; set; }

        /// <summary>The date of the most recent update to the database record.</summary>
        DateTime? UpdatedDate { get; set; }

        /// <summary>A boolean indicating if the bill is active.</summary>
        bool IsActive { get; set; }
    }

    [Table("Budget.Funds")]
    public class Fund : IFund
    {
        [Key]
        public int ID { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public decimal Balance { get; set; }

        [Required]
        public int DepositCount { get; set; }

        [Required]
        public DateTime CreatedDate { get; set; }

        public DateTime? UpdatedDate { get; set; }

        [Required]
        public bool IsActive { get; set; }
    }
}

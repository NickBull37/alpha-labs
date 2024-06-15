using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace alpha_labs._02.Models.BudgetApp.Paychecks
{
    public interface IPaycheck
    {
        int ID { get; set; }

        string Employer { get; set; }

        int PayDay { get; set; }

        DateTime DepositDate { get; set; }

        string DepositDateFormatted { get; set; }

        decimal Amount { get; set; }

        string Description { get; set; }

        DateTime CreatedDate { get; set; }

        DateTime? UpdatedDate { get; set; }
    }

    [Table("Paychecks")]
    public class Paycheck : IPaycheck
    {
        [Key]
        public int ID { get; set; }

        [Required]
        public string Employer { get; set; } = string.Empty;

        [Required]
        public int PayDay { get; set; }

        [Required]
        public DateTime DepositDate { get; set; }

        [Required]
        public string DepositDateFormatted { get; set; } = string.Empty;

        [Required]
        public decimal Amount { get; set; }

        [Required]
        public string Description { get; set; } = string.Empty;

        [Required]
        public DateTime CreatedDate { get; set; }

        public DateTime? UpdatedDate { get; set; }
    }
}

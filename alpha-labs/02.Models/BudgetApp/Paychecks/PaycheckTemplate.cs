using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace alpha_labs._02.Models.BudgetApp.Paychecks
{
    public interface IPaycheckTemplate
    {
        int ID { get; set; }

        string Employer { get; set; }

        int PayDay { get; set; }

        decimal Amount { get; set; }

        string Description { get; set; }

        DateTime CreatedDate { get; set; }

        DateTime? UpdatedDate { get; set; }

        bool IsActive { get; set; }
    }

    [Table("PaycheckTemplates")]
    public class PaycheckTemplate : IPaycheckTemplate
    {
        [Key]
        public int ID { get; set; }

        [Required]
        public string Employer { get; set; } = string.Empty;

        [Required]
        public int PayDay { get; set; }

        [Required]
        public decimal Amount { get; set; }

        [Required]
        public string Description { get; set; } = string.Empty;

        [Required]
        public DateTime CreatedDate { get; set; }

        public DateTime? UpdatedDate { get; set; }

        [Required]
        public bool IsActive { get; set; }
    }
}

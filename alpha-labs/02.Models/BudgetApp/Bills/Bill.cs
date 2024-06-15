using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace alpha_labs._02.Models.BudgetApp.Bills
{
    public interface IBill
    {
        int ID { get; set; }

        DateTime DueDate { get; set; }

        string DueDateFormatted { get; set; }

        decimal Amount { get; set; }

        string Category { get; set; }

        string Description { get; set; }

        bool IsAutoPay { get; set; }

        bool IsPaid { get; set; }

        bool HasEstimatedAmount { get; set; }

        DateTime CreatedDate { get; set; }

        DateTime? UpdatedDate { get; set; }
    }

    [Table("Bills")]
    public class Bill : IBill
    {
        [Key]
        public int ID { get; set; }

        [Required]
        public DateTime DueDate { get; set; }

        [Required]
        public string DueDateFormatted { get; set; } = string.Empty;

        [Required]
        public decimal Amount { get; set; }

        [Required]
        public string Category { get; set; } = string.Empty;

        [Required]
        public string Description { get; set; } = string.Empty;

        [Required]
        public bool IsAutoPay { get; set; }

        [Required]
        public bool IsPaid { get; set; }

        [Required]
        public bool HasEstimatedAmount { get; set; }

        [Required]
        public DateTime CreatedDate { get; set; }

        public DateTime? UpdatedDate { get; set; }
    }
}

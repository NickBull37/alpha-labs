using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace alpha_labs._02.Models.BudgetApp.Bills
{
    public interface IBillTemplate
    {
        /// <summary> </summary>
        int ID { get; set; }

        /// <summary> </summary>
        string PaymentFrequency { get; set; }

        /// <summary> </summary>
        int PaymentDueDay { get; set; }

        /// <summary> </summary>
        decimal Amount { get; set; }

        /// <summary> </summary>
        bool IsVariableAmount { get; set; }

        /// <summary> </summary>
        string Category { get; set; }

        /// <summary> </summary>
        string Description { get; set; }

        /// <summary> </summary>
        bool IsAutoPay { get; set; }

        /// <summary> </summary>
        DateTime CreatedDate { get; set; }

        /// <summary> </summary>
        DateTime? UpdatedDate { get; set; }

        /// <summary> </summary>
        bool IsActive { get; set; }
    }

    [Table("BillTemplates")]
    public class BillTemplate : IBillTemplate
    {
        [Key]
        public int ID { get; set; }

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

        [Required]
        public DateTime CreatedDate { get; set; }

        public DateTime? UpdatedDate { get; set; }

        [Required]
        public bool IsActive { get; set; }
    }
}

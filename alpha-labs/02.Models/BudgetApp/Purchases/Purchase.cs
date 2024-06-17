using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace alpha_labs._02.Models.BudgetApp.Purchases
{
    public interface IPurchase
    {
        /// <summary> </summary>
        int ID { get; set; }

        /// <summary> </summary>
        DateTime PurchaseDate { get; set; }

        /// <summary> </summary>
        string PurchaseDateFormatted { get; set; }

        /// <summary> </summary>
        decimal Amount { get; set; }

        /// <summary> </summary>
        string Category { get; set; }

        /// <summary> </summary>
        string Description { get; set; }

        /// <summary> </summary>
        bool IsLuxury { get; set; }

        /// <summary>The date the database record was created.</summary>
        DateTime CreatedDate { get; set; }

        /// <summary>The date of the most recent update to the database record.</summary>
        DateTime? UpdatedDate { get; set; }
    }

    public enum PurchaseCategory
    {
        Entertainment,
        Food,
        Housing,
        SpecialOccasion,
        Utilities,
    }

    [Table("Budget.Purchases")]
    public class Purchase : IPurchase
    {
        [Key]
        public int ID { get; set; }

        [Required]
        public DateTime PurchaseDate { get; set; }

        [Required]
        public string PurchaseDateFormatted { get; set; } = string.Empty;

        [Required]
        public decimal Amount { get; set; }

        [Required]
        public string Category { get; set; } = string.Empty;

        [Required]
        public string Description { get; set; } = string.Empty;

        [Required]
        public bool IsLuxury { get; set; }

        [Required]
        public DateTime CreatedDate { get; set; }

        public DateTime? UpdatedDate { get; set; }
    }
}

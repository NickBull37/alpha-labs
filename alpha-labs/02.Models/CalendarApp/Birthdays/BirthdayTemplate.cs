using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace alpha_labs._02.Models.CalendarApp.Birthdays
{
    public interface IBirthdayTemplate
    {
        /// <summary>The ID of the template.</summary>
        int ID { get; set; }

        /// <summary>The day of the month a person was born.</summary>
        int Day { get; set; }

        /// <summary>The month of the year a person was born.</summary>
        int Month { get; set; }

        /// <summary>The name of the person in the birthday record.</summary>
        string Name { get; set; }

        /// <summary>The date the database record was created.</summary>
        DateTime CreatedDate { get; set; }

        /// <summary>The date of the most recent update to the database record.</summary>
        DateTime? UpdatedDate { get; set; }

        /// <summary>A boolean indicating if the record is active.</summary>
        bool IsActive { get; set; }
    }

    [Table("Calendar.BirthdayTemplates")]
    public class BirthdayTemplate : IBirthdayTemplate
    {
        [Key]
        public int ID { get; set; }

        [Required]
        public int Day { get; set; }

        [Required]
        public int Month { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public DateTime CreatedDate { get; set; }

        public DateTime? UpdatedDate { get; set; }

        [Required]
        public bool IsActive { get; set; }
    }
}

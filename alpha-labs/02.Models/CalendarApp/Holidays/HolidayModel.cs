using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace alpha_labs._02.Models.CalendarApp.Holidays
{
    public interface IHolidayModel
    {
        /// <summary>The ID of the holiday model entity.</summary>
        int ID { get; set; }

        int Day { get; set; }

        int Month { get; set; }

        /// <summary> </summary>
        DateTime Date { get; set; }

        /// <summary> </summary>
        string Name { get; set; }

        /// <summary>The date the database record was created.</summary>
        DateTime CreatedDate { get; set; }

        /// <summary>The date of the most recent update to the database record.</summary>
        DateTime? UpdatedDate { get; set; }

        /// <summary>A boolean indicating if the record is active.</summary>
        bool IsActive { get; set; }
    }

    [Table("Calendar.Holidays")]
    public class HolidayModel : IHolidayModel
    {
        [Required]
        public int ID { get; set; }

        [Required]
        public int Day { get; set; }

        [Required]
        public int Month { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public DateTime CreatedDate { get; set; }

        public DateTime? UpdatedDate { get; set; }

        [Required]
        public bool IsActive { get; set; }
    }
}

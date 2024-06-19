using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace alpha_labs._02.Models.CalendarApp.Holidays
{
    public interface IHolidayModel
    {
        int ID { get; set; }

        int Day { get; set; }

        int Month { get; set; }

        string MonthName { get; set; }

        DateTime Date { get; set; }

        string Name { get; set; }

        DateTime CreatedDate { get; set; }

        DateTime? UpdatedDate { get; set; }

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
        public string MonthName { get; set; } = string.Empty;

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

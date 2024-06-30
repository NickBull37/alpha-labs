using System.ComponentModel.DataAnnotations;

namespace alpha_labs._02.Models.CalendarApp.Events
{
    public interface IEventModel
    {

    }

    public class EventModel
    {
        [Required]
        public int ID { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public int StartDay { get; set; }

        [Required]
        public int StartMonth { get; set; }

        [Required]
        public string StartDayMonthName { get; set; } = string.Empty;

        [Required]
        public DateTime EndDate { get; set; }

        [Required]
        public int EndDay { get; set; }

        [Required]
        public int EndMonth { get; set; }

        [Required]
        public string EndDayMonthName { get; set; } = string.Empty;

        [Required]
        public List<int> MiddleDays { get; set; } = [];

        [Required]
        public List<string> MonthNames { get; set; } = [];

        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public DateTime CreatedDate { get; set; }

        public DateTime? UpdatedDate { get; set; }

        [Required]
        public bool IsActive { get; set; }
    }
}

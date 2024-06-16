using System.ComponentModel.DataAnnotations;

namespace alpha_labs._06.Controllers.CalendarApp.Birthdays
{
    /// <summary>The request object for creating a birthday record.</summary>
    public class AddBirthdayRequest
    {
        [Required]
        public int Day { get; set; }

        [Required]
        public int Month { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;
    }
}

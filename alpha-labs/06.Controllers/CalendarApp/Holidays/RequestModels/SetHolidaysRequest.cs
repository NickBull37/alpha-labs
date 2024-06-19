using System.ComponentModel.DataAnnotations;

namespace alpha_labs._06.Controllers.CalendarApp.Holidays
{
    /// <summary>The request object for setting active holidays.</summary>
    public class SetHolidaysRequest
    {
        [Required]
        public IEnumerable<string> EnabledHolidays { get; set; } = [];

        [Required]
        public IEnumerable<string> DisabledHolidays { get; set; } = [];
    }
}

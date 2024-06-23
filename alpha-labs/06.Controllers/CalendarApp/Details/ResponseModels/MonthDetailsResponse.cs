using alpha_labs._02.Models.CalendarApp.Birthdays;
using alpha_labs._02.Models.CalendarApp.Holidays;

namespace alpha_labs._06.Controllers.CalendarApp.Details
{
    public class MonthDetailsResponse
    {
        public IEnumerable<BirthdayDetail>? Birthdays { get; set; }

        public IEnumerable<HolidayDetail>? Holidays { get; set; }
    }

    public class BirthdayDetail
    {
        public BirthdayModel Birthday { get; set; } = new();

        public int DaysUntil { get; set; }
    }

    public class HolidayDetail
    {
        public HolidayModel Holiday { get; set; } = new();

        public int DaysUntil { get; set; }
    }
}

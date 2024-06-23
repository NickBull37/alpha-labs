using alpha_labs._02.Models.CalendarApp.Birthdays;
using alpha_labs._02.Models.CalendarApp.Holidays;
using alpha_labs._06.Controllers.CalendarApp.Details;

namespace alpha_labs._04.Services.CalendarApp
{
    public interface IDetailsService
    {
        MonthDetailsResponse BuildResponse(IEnumerable<BirthdayModel> birthdays, IEnumerable<HolidayModel> holidays);
    }

    public class DetailsService : IDetailsService
    {
        public DetailsService()
        {
        }

        public MonthDetailsResponse BuildResponse(IEnumerable<BirthdayModel> birthdays, IEnumerable<HolidayModel> holidays)
        {
            List<BirthdayDetail> birthdayDetails = [];
            foreach (var birthday in birthdays)
            {
                BirthdayDetail detail = new()
                {
                    Birthday = birthday,
                    DaysUntil = CalculateDaysUntil(birthday.Date)
                };
                birthdayDetails.Add(detail);
            }

            List<HolidayDetail> holidayDetails = [];
            foreach (var holiday in holidays)
            {
                HolidayDetail detail = new()
                {
                    Holiday = holiday,
                    DaysUntil = CalculateDaysUntil(holiday.Date)
                };
                holidayDetails.Add(detail);
            }

            return new MonthDetailsResponse
            {
                Birthdays = birthdayDetails.OrderBy(x => x.Birthday.Date),
                Holidays = holidayDetails.OrderBy(x => x.Holiday.Date)
            };
        }

        private static int CalculateDaysUntil(DateTime date)
        {
            TimeSpan span;
            var currentDate = DateTime.Now;
            span = date - currentDate;

            // Date is in the future
            if (span.Days > 0)
            {
                return span.Days + 1;
            }
            // Date is in the past
            else if (span.Days < 0)
            {
                return span.Days;
            }
            // Date is today
            else
            {
                return 0;
            }
        }
    }
}

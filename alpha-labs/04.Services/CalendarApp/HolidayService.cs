using alpha_labs._02.Models.CalendarApp.Holidays;
using System.Globalization;

namespace alpha_labs._04.Services.CalendarApp
{
    public interface IHolidayService
    {
        /// <summary>Creates a list of holiday models for the next 100 years.</summary>
        List<HolidayModel> CreateHolidayModels(string name);
    }

    public class HolidayService : IHolidayService
    {
        const string CHRISTMAS_MONTH_NAME = "December";
        const int CHRISTMAS_MONTH_INT = 12;
        const int CHRISTMAS_DAY_INT = 25;

        const string HALLOWEEN_MONTH_NAME = "October";
        const int HALLOWEEN_MONTH_INT = 10;
        const int HALLOWEEN_DAY_INT = 31;

        const string INDEPENDENCEDAY_MONTH_NAME = "July";
        const int INDEPENDENCEDAY_MONTH_INT = 7;
        const int INDEPENDENCEDAY_DAY_INT = 4;

        const string NEWYEARSDAY_MONTH_NAME = "January";
        const int NEWYEARSDAY_MONTH_INT = 1;
        const int NEWYEARSDAY_DAY_INT = 1;

        const string NEWYEARSEVE_MONTH_NAME = "December";
        const int NEWYEARSEVE_MONTH_INT = 12;
        const int NEWYEARSEVE_DAY_INT = 31;

        const string VALENTINESDAY_MONTH_NAME = "February";
        const int VALENTINESDAY_MONTH_INT = 2;
        const int VALENTINESDAY_DAY_INT = 14;

        public HolidayService()
        {
        }

        /// <summary>Creates a list of holiday models for the next 100 years.</summary>
        public List<HolidayModel> CreateHolidayModels(string name)
        {
            List<HolidayModel> models = [];

            switch (name)
            {
                case "Christmas":
                    models = CreateFixedHolidayModels(name, CHRISTMAS_MONTH_NAME, CHRISTMAS_MONTH_INT, CHRISTMAS_DAY_INT);
                    break;
                case "Easter":
                    models = CreateEasterHolidayModels(name);
                    break;
                case "Father's Day":
                    models = CreateFathersDayHolidayModels(name);
                    break;
                case "Halloween":
                    models = CreateFixedHolidayModels(name, HALLOWEEN_MONTH_NAME, HALLOWEEN_MONTH_INT, HALLOWEEN_DAY_INT);
                    break;
                case "Independence Day":
                    models = CreateFixedHolidayModels(name, INDEPENDENCEDAY_MONTH_NAME, INDEPENDENCEDAY_MONTH_INT, INDEPENDENCEDAY_DAY_INT);
                    break;
                case "Labor Day":
                    models = CreateLaborDayHolidayModels(name);
                    break;
                case "Memorial Day":
                    models = CreateMemorialDayHolidayModels(name);
                    break;
                case "Mother's Day":
                    models = CreateMothersDayHolidayModels(name);
                    break;
                case "New Year's Day":
                    models = CreateFixedHolidayModels(name, NEWYEARSDAY_MONTH_NAME, NEWYEARSDAY_MONTH_INT, NEWYEARSDAY_DAY_INT);
                    break;
                case "New Year's Eve":
                    models = CreateFixedHolidayModels(name, NEWYEARSEVE_MONTH_NAME, NEWYEARSEVE_MONTH_INT, NEWYEARSEVE_DAY_INT);
                    break;
                case "Thanksgiving":
                    models = CreateThanksgivingHolidayModels(name);
                    break;
                case "Valentine's Day":
                    models = CreateFixedHolidayModels(name, VALENTINESDAY_MONTH_NAME, VALENTINESDAY_MONTH_INT, VALENTINESDAY_DAY_INT);
                    break;
                default:
                    break;
            }

            return models;
        }

        private static List<HolidayModel> CreateFixedHolidayModels(string name, string monthName, int monthValue, int dayValue)
        {
            List<HolidayModel> holidays = [];

            int count = 0;
            var currentDate = DateTime.Today;
            var currentYear = currentDate.Year;

            while (count < 100)
            {
                var holidayDate = new DateTime(currentYear + count, monthValue, dayValue);

                var model = new HolidayModel
                {
                    Day = dayValue,
                    Month = monthValue,
                    MonthName = monthName,
                    Date = holidayDate,
                    Name = name,
                    CreatedDate = DateTime.Now,
                    UpdatedDate = null,
                    IsActive = true,
                };

                holidays.Add(model);
                count++;
            }
            return holidays;
        }

        private static List<HolidayModel> CreateEasterHolidayModels(string name)
        {
            List<HolidayModel> holidays = [];

            int count = 0;
            var currentDate = DateTime.Today;
            var currentYear = currentDate.Year;

            while (count < 100)
            {
                currentYear += count;

                // Algorithm to calculate Easter Sunday (Meeus/Jones/Butcher algorithm)
                int a = currentYear % 19;
                int b = currentYear / 100;
                int c = currentYear % 100;
                int d = b / 4;
                int e = b % 4;
                int f = (b + 8) / 25;
                int g = (b - f + 1) / 3;
                int h = (19 * a + b - d - g + 15) % 30;
                int i = c / 4;
                int k = c % 4;
                int l = (32 + 2 * e + 2 * i - h - k) % 7;
                int m = (a + 11 * h + 22 * l) / 451;
                int month = (h + l - 7 * m + 114) / 31;
                int day = ((h + l - 7 * m + 114) % 31) + 1;

                var easterDate = new DateTime(currentYear, month, day);

                var model = new HolidayModel
                {
                    Day = easterDate.Day,
                    Month = easterDate.Month,
                    MonthName = CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(easterDate.Month),
                    Date = easterDate,
                    Name = name,
                    CreatedDate = DateTime.Now,
                    UpdatedDate = null,
                    IsActive = true,
                };

                holidays.Add(model);
                count++;
            }
            return holidays;
        }

        private static List<HolidayModel> CreateFathersDayHolidayModels(string name)
        {
            List<HolidayModel> holidays = [];

            int count = 0;
            var currentDate = DateTime.Today;
            var currentYear = currentDate.Year;

            while (count < 100)
            {
                // Father's Day is the third Sunday in June
                var firstDayOfJune = new DateTime(currentYear + count, 6, 1);
                int dayOfWeek = (int)firstDayOfJune.DayOfWeek;
                int daysUntilSunday = ((int)DayOfWeek.Sunday - dayOfWeek + 7) % 7;
                var firstSunday = firstDayOfJune.AddDays(daysUntilSunday);
                var fathersDay = firstSunday.AddDays(14); // Third Sunday is 2 weeks after the first Sunday

                var model = new HolidayModel
                {
                    Day = fathersDay.Day,
                    Month = fathersDay.Month,
                    MonthName = CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(fathersDay.Month),
                    Date = fathersDay,
                    Name = name,
                    CreatedDate = DateTime.Now,
                    UpdatedDate = null,
                    IsActive = true,
                };

                holidays.Add(model);
                count++;
            }
            return holidays;
        }

        private static List<HolidayModel> CreateLaborDayHolidayModels(string name)
        {
            List<HolidayModel> holidays = [];

            int count = 0;
            var currentDate = DateTime.Today;
            var currentYear = currentDate.Year;

            while (count < 100)
            {
                // Labor Day is the first Monday in September
                var firstDayOfSeptember = new DateTime(currentYear + count, 9, 1);
                int dayOfWeek = (int)firstDayOfSeptember.DayOfWeek;
                int daysUntilMonday = ((int)DayOfWeek.Monday - dayOfWeek + 7) % 7;
                var laborDay = firstDayOfSeptember.AddDays(daysUntilMonday);

                var model = new HolidayModel
                {
                    Day = laborDay.Day,
                    Month = laborDay.Month,
                    MonthName = CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(laborDay.Month),
                    Date = laborDay,
                    Name = name,
                    CreatedDate = DateTime.Now,
                    UpdatedDate = null,
                    IsActive = true,
                };

                holidays.Add(model);
                count++;
            }
            return holidays;
        }

        private static List<HolidayModel> CreateMemorialDayHolidayModels(string name)
        {
            List<HolidayModel> holidays = [];

            int count = 0;
            var currentDate = DateTime.Today;
            var currentYear = currentDate.Year;

            while (count < 100)
            {
                // Memorial Day is the last Monday in May
                var lastDayOfMay = new DateTime(currentYear + count, 5, 31);
                int dayOfWeek = (int)lastDayOfMay.DayOfWeek;
                int daysToLastMonday = (dayOfWeek + 6) % 7;
                var memorialDay = lastDayOfMay.AddDays(-daysToLastMonday);

                var model = new HolidayModel
                {
                    Day = memorialDay.Day,
                    Month = memorialDay.Month,
                    MonthName = CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(memorialDay.Month),
                    Date = memorialDay,
                    Name = name,
                    CreatedDate = DateTime.Now,
                    UpdatedDate = null,
                    IsActive = true,
                };

                holidays.Add(model);
                count++;
            }
            return holidays;
        }

        private static List<HolidayModel> CreateMothersDayHolidayModels(string name)
        {
            List<HolidayModel> holidays = [];

            int count = 0;
            var currentDate = DateTime.Today;
            var currentYear = currentDate.Year;

            while (count < 100)
            {
                // Mother's Day is the second Sunday in May
                var firstDayOfMay = new DateTime(currentYear + count, 5, 1);
                int dayOfWeek = (int)firstDayOfMay.DayOfWeek;
                int daysUntilSunday = ((int)DayOfWeek.Sunday - dayOfWeek + 7) % 7;
                var firstSunday = firstDayOfMay.AddDays(daysUntilSunday);
                var mothersDay = firstSunday.AddDays(7); // Second Sunday is 1 week after the first Sunday

                var model = new HolidayModel
                {
                    Day = mothersDay.Day,
                    Month = mothersDay.Month,
                    MonthName = CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(mothersDay.Month),
                    Date = mothersDay,
                    Name = name,
                    CreatedDate = DateTime.Now,
                    UpdatedDate = null,
                    IsActive = true,
                };

                holidays.Add(model);
                count++;
            }
            return holidays;
        }

        private static List<HolidayModel> CreateThanksgivingHolidayModels(string name)
        {
            List<HolidayModel> holidays = [];

            int count = 0;
            var currentDate = DateTime.Today;
            var currentYear = currentDate.Year;

            while (count < 100)
            {
                var firstDayOfNovember = new DateTime(currentYear + count, 11, 1);
                int dayOfWeek = (int)firstDayOfNovember.DayOfWeek;
                int daysUntilThursday = ((int)DayOfWeek.Thursday - dayOfWeek + 7) % 7;
                var firstThursday = firstDayOfNovember.AddDays(daysUntilThursday);
                var thanksgivingDate = firstThursday.AddDays(21); // Fourth Thursday is 3 weeks after the first Thursday

                var model = new HolidayModel
                {
                    Day = thanksgivingDate.Day,
                    Month = thanksgivingDate.Month,
                    MonthName = CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(thanksgivingDate.Month),
                    Date = thanksgivingDate,
                    Name = name,
                    CreatedDate = DateTime.Now,
                    UpdatedDate = null,
                    IsActive = true,
                };

                holidays.Add(model);
                count++;
            }
            return holidays;
        }


    }
}

using alpha_labs._02.Models.CalendarApp.Birthdays;
using alpha_labs._06.Controllers.CalendarApp.Birthdays;

namespace alpha_labs._04.Services.CalendarApp
{
    public interface IBirthdayService
    {
        /// <summary>Creates a list of birthday models for the next 100 years.</summary>
        List<BirthdayModel> CreateBirthdayModels(AddBirthdayRequest request);
    }

    public class BirthdayService : IBirthdayService
    {
        public BirthdayService()
        {
        }

        /// <summary>Creates a list of birthday models for the next 100 years.</summary>
        public List<BirthdayModel> CreateBirthdayModels(AddBirthdayRequest request)
        {
            List<BirthdayModel> birthdays = [];

            int count = 0;
            var currentDate = DateTime.Today;
            var currentYear = currentDate.Year;

            while (count < 100)
            {
                var birthdayDate = new DateTime(currentYear + count, request.Month, request.Day);

                var monthName = string.Empty;
                switch (request.Month)
                {
                    case 1:
                        monthName = "January";
                        break;
                    case 2:
                        monthName = "February";
                        break;
                    case 3:
                        monthName = "March";
                        break;
                    case 4:
                        monthName = "April";
                        break;
                    case 5:
                        monthName = "May";
                        break;
                    case 6:
                        monthName = "June";
                        break;
                    case 7:
                        monthName = "July";
                        break;
                    case 8:
                        monthName = "August";
                        break;
                    case 9:
                        monthName = "September";
                        break;
                    case 10:
                        monthName = "October";
                        break;
                    case 11:
                        monthName = "November";
                        break;
                    case 12:
                        monthName = "December";
                        break;
                    default:
                        break;
                }

                var model = new BirthdayModel
                {
                    Day = request.Day,
                    Month = request.Month,
                    MonthName = monthName,
                    Date = birthdayDate,
                    Name = request.Name,
                    CreatedDate = DateTime.Now,
                    UpdatedDate = null,
                    IsActive = true,
                };

                birthdays.Add(model);
                count++;
            }
            return birthdays;
        }
    }
}

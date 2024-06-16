using alpha_labs._02.Models.CalendarApp.Birthdays;
using alpha_labs._06.Controllers.CalendarApp.Birthdays;

namespace alpha_labs._04.Services.CalendarApp
{
    public interface IBirthdayService
    {
        /// <summary>Creates a list of birthday models for the next 100 years.</summary>
        List<BirthdayModel> CreateBirthdayModels(AddBirthdayRequest request);

        /// <summary>Creates a new birthday template model entity.</summary>
        BirthdayTemplate CreateBirthdayTemplateEntity(AddBirthdayRequest request);
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

                var model = new BirthdayModel
                {
                    Day = request.Day,
                    Month = request.Month,
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

        /// <summary>Creates a new birthday template model entity.</summary>
        public BirthdayTemplate CreateBirthdayTemplateEntity(AddBirthdayRequest request)
        {
            return new BirthdayTemplate
            {
                Day = request.Day,
                Month = request.Month,
                Name = request.Name,
                CreatedDate = DateTime.Now,
                UpdatedDate = null,
                IsActive = true,
            };
        }
    }
}

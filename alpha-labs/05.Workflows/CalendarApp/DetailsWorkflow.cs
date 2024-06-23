using alpha_labs._01.Configuration.ActionResponse;
using alpha_labs._03.DataAccess.CalendarApp;
using alpha_labs._04.Services.CalendarApp;
using alpha_labs._06.Controllers.CalendarApp.Details;

namespace alpha_labs._05.Workflows.CalendarApp
{
    public interface IDetailsWorkflow
    {
        Task<ActionResponse<MonthDetailsResponse>> ExecGetMonthDetails(string month);
    }

    public class DetailsWorkflow : IDetailsWorkflow
    {
        private readonly IBirthdayRepository _birthdayRepository;
        private readonly IHolidayRepository _holidayRepository;
        private readonly IDetailsService _detailsService;

        public DetailsWorkflow(IBirthdayRepository birthdayRepository, IHolidayRepository holidayRepository, IDetailsService detailsService)
        {
            _birthdayRepository = birthdayRepository;
            _holidayRepository = holidayRepository;
            _detailsService = detailsService;
        }

        public async Task<ActionResponse<MonthDetailsResponse>> ExecGetMonthDetails(string month)
        {
            // Get birthdays & holidays from database
            var monthlyBdaysResopnse = await _birthdayRepository.GetBirthdaysByMonth(month);
            if (!monthlyBdaysResopnse.IsSuccess)
            {
                // throw error
            }
            var monthlyHolidaysResopnse = await _holidayRepository.GetHolidaysByMonth(month);
            if (!monthlyHolidaysResopnse.IsSuccess)
            {
                // throw error
            }

            var response = _detailsService.BuildResponse(monthlyBdaysResopnse.Content!, monthlyHolidaysResopnse.Content!);
            return new PassingAR<MonthDetailsResponse>(response);
        }
    }
}

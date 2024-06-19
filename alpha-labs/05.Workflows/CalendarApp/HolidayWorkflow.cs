using alpha_labs._01.Configuration.ActionResponse;
using alpha_labs._02.Models.CalendarApp.Holidays;
using alpha_labs._03.DataAccess.CalendarApp;
using alpha_labs._04.Services.CalendarApp;
using alpha_labs._06.Controllers.CalendarApp.Holidays;

namespace alpha_labs._05.Workflows.CalendarApp
{
    public interface IHolidayWorkflow
    {
        /// <summary>Workflow for the [holiday/get-active-holidays] endpoint.</summary>
        Task<ActionResponse<List<HolidayModel>>> ExecGetActiveHolidays();

        /// <summary>Workflow for the [holiday/set-holidays] endpoint.</summary>
        Task<ActionResponse> ExecSetHolidays(SetHolidaysRequest request);
    }

    public class HolidayWorkflow : IHolidayWorkflow
    {
        private readonly IHolidayService _holidayService;
        private readonly IHolidayRepository _holidayRepository;

        public HolidayWorkflow(IHolidayService holidayService, IHolidayRepository holidayRepository)
        {
            _holidayService = holidayService;
            _holidayRepository = holidayRepository;
        }

        /// <summary>Workflow for the [holiday/get-active-holidays] endpoint.</summary>
        public async Task<ActionResponse<List<HolidayModel>>> ExecGetActiveHolidays()
        {
            return await _holidayRepository.GetHolidays();
        }

        /// <summary>Workflow for the [holiday/set-holidays] endpoint.</summary>
        public async Task<ActionResponse> ExecSetHolidays(SetHolidaysRequest request)
        {
            // Disabled Holidays
            foreach (var holiday in request.DisabledHolidays)
            {
                var alreadyExists = await _holidayRepository.CheckIfHolidayRecordsExist(holiday);

                if (alreadyExists.Content)
                {
                    // mark as inactive
                    await _holidayRepository.UpdateHolidayActiveStatus(holiday, false);
                }
            }

            // Enabled Holidays
            foreach (var holiday in request.EnabledHolidays)
            {
                var alreadyExists = await _holidayRepository.CheckIfHolidayRecordsExist(holiday);

                if (alreadyExists.Content)
                {
                    // mark as active
                    await _holidayRepository.UpdateHolidayActiveStatus(holiday, true);
                }
                else
                {
                    // create new db records
                    var models = _holidayService.CreateHolidayModels(holiday);
                    await _holidayRepository.SaveHolidayModelsToDB(models);
                }
            }

            return new PassingAR();
        }
    }
}

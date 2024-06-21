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

        /// <summary>Workflow for the [holiday/get-holiday-statuses] endpoint.</summary>
        Task<ActionResponse<ActiveHolidaysResponse>> ExecGetHolidayStatuses();

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

        /// <summary>Workflow for the [holiday/get-holiday-statuses] endpoint.</summary>
        public async Task<ActionResponse<ActiveHolidaysResponse>> ExecGetHolidayStatuses()
        {
            var activeHolidayResponse = new ActiveHolidaysResponse();

            var dbResponse = await _holidayRepository.GetHolidays();
            var holidays = dbResponse.Content!;

            foreach (var holiday in holidays)
            {
                if (holiday.Name == "Christmas")
                {
                    activeHolidayResponse.IsChristmasActive = true;
                }
                if (holiday.Name == "Easter")
                {
                    activeHolidayResponse.IsEasterActive = true;
                }
                if (holiday.Name == "Father's Day")
                {
                    activeHolidayResponse.IsFathersDayActive = true;
                }
                if (holiday.Name == "Halloween")
                {
                    activeHolidayResponse.IsHalloweenActive = true;
                }
                if (holiday.Name == "IndependenceDay")
                {
                    activeHolidayResponse.IsIndependenceDayActive = true;
                }
                if (holiday.Name == "Labor Day")
                {
                    activeHolidayResponse.IsLaborDayActive = true;
                }
                if (holiday.Name == "Memorial Day")
                {
                    activeHolidayResponse.IsMemorialDayActive = true;
                }
                if (holiday.Name == "Mother's Day")
                {
                    activeHolidayResponse.IsMothersDayActive = true;
                }
                if (holiday.Name == "New Year's Day")
                {
                    activeHolidayResponse.IsNewYearsDayActive = true;
                }
                if (holiday.Name == "New Year's Eve")
                {
                    activeHolidayResponse.IsNewYearsEveActive = true;
                }
                if (holiday.Name == "Thanksgiving")
                {
                    activeHolidayResponse.IsThanksgivingActive = true;
                }
                if (holiday.Name == "Valentine's Day")
                {
                    activeHolidayResponse.IsValentinesDayActive = true;
                }
            }

            return new PassingAR<ActiveHolidaysResponse>(activeHolidayResponse);
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
                var isActive = await _holidayRepository.CheckIfHolidayIsActive(holiday);
                if (isActive.Content)
                {
                    continue;
                }

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

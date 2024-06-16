using alpha_labs._01.Configuration.ActionResponse;
using alpha_labs._02.Models.CalendarApp.Birthdays;
using alpha_labs._03.DataAccess.CalendarApp;
using alpha_labs._04.Services.CalendarApp;
using alpha_labs._06.Controllers.CalendarApp.Birthdays;

namespace alpha_labs._05.Workflows.CalendarApp
{
    public interface IBirthdayWorkflow
    {
        /// <summary>Workflow for the [birthday/birthdays] endpoint.</summary>
        Task<ActionResponse<List<BirthdayModel>>> ExecGetBirthdays();

        /// <summary>Workflow for the [birthday/add-birthday] endpoint.</summary>
        Task<ActionResponse> ExecAddBirthday(AddBirthdayRequest request);
    }

    public class BirthdayWorkflow : IBirthdayWorkflow
    {
        private readonly IBirthdayService _birthdayService;
        private readonly IBirthdayRepository _birthdayRepository;

        public BirthdayWorkflow(IBirthdayService birthdayService, IBirthdayRepository birthdayRepository)
        {
            _birthdayService = birthdayService;
            _birthdayRepository = birthdayRepository;
        }

        /// <summary>Workflow for the [birthday/birthdays] endpoint.</summary>
        public async Task<ActionResponse<List<BirthdayModel>>> ExecGetBirthdays()
        {
            return await _birthdayRepository.GetBirthdays();
        }

        /// <summary>Workflow for the [birthday/add-birthday] endpoint.</summary>
        public async Task<ActionResponse> ExecAddBirthday(AddBirthdayRequest request)
        {
            var models = _birthdayService.CreateBirthdayModels(request);
            return await _birthdayRepository.SaveBirthdayModelsToDB(models);
        }
    }
}

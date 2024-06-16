using alpha_labs._05.Workflows.CalendarApp;
using Microsoft.AspNetCore.Mvc;

namespace alpha_labs._06.Controllers.CalendarApp.Birthdays
{
    [ApiController]
    [Route("[controller]")]
    public class BirthdayController : ControllerBase
    {
        private readonly IBirthdayWorkflow _birthdayWorkflow;

        public BirthdayController(IBirthdayWorkflow birthdayWorkflow)
        {
            _birthdayWorkflow = birthdayWorkflow;
        }

        #region GET Endpoints
        /// <summary>Gets all birthday records for the current calendar year.</summary>
        [HttpGet]
        [Route("birthdays")]
        public async Task<IActionResult> GetBirthdays()
        {
            var response = await _birthdayWorkflow.ExecGetBirthdays();
            if (!response.IsSuccess)
            {
                return Problem(statusCode: 500);
            }
            return Ok(response.Content);
        }
        #endregion

        #region POST Endpoints
        [HttpPost]
        [Route("add-birthday")]
        public async Task<IActionResult> AddBirthday(AddBirthdayRequest request)
        {
            if (string.IsNullOrEmpty(request.Name))
            {
                return BadRequest(new { message = "Missing or invalid required fields." });
            }
            var response = await _birthdayWorkflow.ExecAddBirthday(request);
            if (!response.IsSuccess)
            {
                return Problem(statusCode: 500);
            }
            return Ok();
        }
        #endregion
    }
}

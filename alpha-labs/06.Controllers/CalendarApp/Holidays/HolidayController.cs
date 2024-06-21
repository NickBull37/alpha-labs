using alpha_labs._05.Workflows.CalendarApp;
using Microsoft.AspNetCore.Mvc;

namespace alpha_labs._06.Controllers.CalendarApp.Holidays
{
    [ApiController]
    [Route("[controller]")]
    public class HolidayController : ControllerBase
    {
        private readonly IHolidayWorkflow _holidayWorkflow;

        public HolidayController(IHolidayWorkflow holidayWorkflow)
        {
            _holidayWorkflow = holidayWorkflow;
        }

        #region GET Endpoints
        /// <summary>Gets all holiday records for the current calendar year.</summary>
        [HttpGet]
        [Route("get-active-holidays")]
        public async Task<IActionResult> GetActiveHolidays()
        {
            var response = await _holidayWorkflow.ExecGetActiveHolidays();
            if (!response.IsSuccess)
            {
                return Problem(statusCode: 500);
            }
            return Ok(response.Content);
        }

        /// <summary>Gets an active or inactive status value for each holiday.</summary>
        [HttpGet]
        [Route("get-holiday-statuses")]
        public async Task<IActionResult> GetHolidayStatuses()
        {
            var response = await _holidayWorkflow.ExecGetHolidayStatuses();
            if (!response.IsSuccess)
            {
                return Problem(statusCode: 500);
            }
            return Ok(response.Content);
        }
        #endregion

        #region POST Endpoints
        /// <summary>Creates & sets the holiday records in the database.</summary>
        [HttpPost]
        [Route("set-holidays")]
        public async Task<IActionResult> SetHolidays(SetHolidaysRequest request)
        {
            if (!request.EnabledHolidays.Any() && !request.DisabledHolidays.Any())
            {
                return BadRequest(new { message = "Missing or invalid required fields." });
            }
            var response = await _holidayWorkflow.ExecSetHolidays(request);
            if (!response.IsSuccess)
            {
                return Problem(statusCode: 500);
            }
            return Ok();
        }
        #endregion
    }
}

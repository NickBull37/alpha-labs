using alpha_labs._05.Workflows.CalendarApp;
using Microsoft.AspNetCore.Mvc;

namespace alpha_labs._06.Controllers.CalendarApp.Details
{
    [ApiController]
    [Route("[controller]")]
    public class DetailsController : ControllerBase
    {
        private readonly IDetailsWorkflow _detailsWorkflow;

        public DetailsController(IDetailsWorkflow detailsWorkflow)
        {
            _detailsWorkflow = detailsWorkflow;
        }

        #region GET Endpoints
        /// <summary>Gets the birthdays, events, and holidays for the month.</summary>
        [HttpGet]
        [Route("get-month-details")]
        public async Task<IActionResult> GetMonthDetails([FromQuery] string month)
        {
            var response = await _detailsWorkflow.ExecGetMonthDetails(month);
            if (!response.IsSuccess)
            {
                return Problem(statusCode: 500);
            }
            return Ok(response.Content);
        }
        #endregion
    }
}

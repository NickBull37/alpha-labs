using alpha_labs._05.Workflows.BudgetApp;
using Microsoft.AspNetCore.Mvc;

namespace alpha_labs._06.Controllers.BudgetApp.Paychecks
{
    [ApiController]
    [Route("[controller]")]
    public class PaycheckController : ControllerBase
    {
        private readonly IPaycheckWorkflow _paycheckWorkflow;

        public PaycheckController(IPaycheckWorkflow paycheckWorkflow)
        {
            _paycheckWorkflow = paycheckWorkflow;
        }

        #region GET Endpoints
        /// <summary>Gets all paychecks for the current month.</summary>
        [HttpGet]
        [Route("get-paychecks")]
        public async Task<IActionResult> GetPaychecks()
        {
            var response = await _paycheckWorkflow.ExecGetPaychecks();
            if (!response.IsSuccess)
            {
                return Problem(statusCode: 500);
            }
            return Ok(response.Content);
        }

        /// <summary>Gets all paycheck templates.</summary>
        [HttpGet]
        [Route("templates")]
        public async Task<IActionResult> GetPaycheckTemplates()
        {
            var response = await _paycheckWorkflow.ExecGetPaycheckTemplates();
            if (!response.IsSuccess)
            {
                return Problem(statusCode: 500);
            }
            return Ok(response.Content);
        }
        #endregion

        #region POST Endpoints
        [HttpPost]
        [Route("create-paycheck-template")]
        public async Task<IActionResult> CreatePaycheckTemplate(CreatePaycheckTemplateRequest request)
        {
            if (string.IsNullOrEmpty(request.Employer)
                || string.IsNullOrEmpty(request.Description)
                || request.Amount <= 0
                || request.PayDay <= 0)
            {
                return BadRequest(new { message = "Missing or invalid required fields." });
            }
            var response = await _paycheckWorkflow.ExecCreatePaycheckTemplate(request);
            if (!response.IsSuccess)
            {
                return Problem(statusCode: 500);
            }
            return Ok();
        }

        [HttpPost]
        [Route("log-paycheck")]
        public async Task<IActionResult> LogPaycheck([FromQuery] int id)
        {
            var response = await _paycheckWorkflow.ExecLogPaycheck(id);
            if (!response.IsSuccess)
            {
                return Problem(statusCode: 500);
            }
            return Ok();
        }
        #endregion
    }
}

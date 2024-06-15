using alpha_labs._05.Workflows.BudgetApp;
using Microsoft.AspNetCore.Mvc;

namespace alpha_labs._06.Controllers.BudgetApp.Dashboard
{
    [ApiController]
    [Route("[controller]")]
    public class DashboardController : ControllerBase
    {
        private readonly IDashboardWorkflow _dashboardWorkflow;

        public DashboardController(IDashboardWorkflow dashboardWorkflow)
        {
            _dashboardWorkflow = dashboardWorkflow;
        }

        #region GET Endpoints
        /// <summary>Gets monthly dashboard report.</summary>
        [HttpGet]
        [Route("report")]
        public async Task<IActionResult> GetDashboardReport()
        {
            var response = await _dashboardWorkflow.ExecGetDashboardReport();
            if (!response.IsSuccess)
            {
                return Problem(statusCode: 500);
            }
            return Ok(response.Content);
        }
        #endregion
    }
}

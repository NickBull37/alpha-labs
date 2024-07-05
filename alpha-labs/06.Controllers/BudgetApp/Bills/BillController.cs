using alpha_labs._05.Workflows.BudgetApp;
using Microsoft.AspNetCore.Mvc;

namespace alpha_labs._06.Controllers.BudgetApp.Bills
{
    [ApiController]
    [Route("[controller]")]
    public class BillController : ControllerBase
    {
        private readonly IBillWorkflow _workflow;
        private readonly ILogger<BillController> _logger;

        public BillController(IBillWorkflow workflow, ILogger<BillController> logger)
        {
            _workflow = workflow;
            _logger = logger;
        }

        #region GET Endpoints
        [HttpGet]
        [Route("batch")]
        public async Task<IActionResult> RunBillsBatch()
        {
            var response = await _workflow.ExecRunBillsBatch();
            if (!response.IsSuccess)
            {
                return Problem(statusCode: 500);
            }
            return Ok();
        }

        /// <summary>Gets bill nodes for the current month.</summary>
        [HttpGet]
        [Route("nodes")]
        public async Task<IActionResult> GetBillingNodes()
        {
            var response = await _workflow.ExecGetBillingNodes();
            if (!response.IsSuccess)
            {
                return Problem(statusCode: 500);
            }
            return Ok(response.Content);
        }

        /// <summary>Gets bill nodes and table data for the current month.</summary>
        [HttpGet]
        [Route("report")]
        public async Task<IActionResult> GetBillingReport()
        {
            var response = await _workflow.ExecGetBillingReport();
            if (!response.IsSuccess)
            {
                return Problem(statusCode: 500);
            }
            return Ok(response.Content);
        }

        /// <summary>Gets all billing history.</summary>
        [HttpGet]
        [Route("get-billing-history")]
        public async Task<IActionResult> GetBillingHistory()
        {
            var response = await _workflow.ExecGetBillingHistory();
            if (!response.IsSuccess)
            {
                return Problem(statusCode: 500);
            }
            return Ok(response.Content);
        }
        #endregion

        #region POST Endpoints
        [HttpPost]
        [Route("create-bill-template")]
        public async Task<IActionResult> CreateBillTemplate(CreateBillTemplateRequest request)
        {
            if (string.IsNullOrEmpty(request.Category)
                || string.IsNullOrEmpty(request.Description)
                || request.Amount == 0)
            {
                return BadRequest(new { message = "Missing required fields." });
            }
            var response = await _workflow.ExecCreateBillTemplate(request);
            if (!response.IsSuccess)
            {
                return Problem(statusCode: 500);
            }
            return Ok();
        }

        [HttpPost]
        [Route("delete-bills")]
        public async Task<IActionResult> DeleteBills(DeleteBillsRequest request)
        {
            var response = await _workflow.ExecDeleteBills(request);
            if (!response.IsSuccess)
            {
                return Problem(statusCode: 500);
            }
            return Ok();
        }

        [HttpPost]
        [Route("set-paid")]
        public async Task<IActionResult> SetBillPaid([FromQuery] int id)
        {
            var response = await _workflow.ExecSetBillPaid(id);
            if (!response.IsSuccess)
            {
                return Problem(statusCode: 500, title: response.ErrorMessage);
            }
            return Ok();
        }
        #endregion
    }
}

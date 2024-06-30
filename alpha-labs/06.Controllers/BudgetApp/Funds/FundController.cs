using alpha_labs._05.Workflows.BudgetApp;
using Microsoft.AspNetCore.Mvc;

namespace alpha_labs._06.Controllers.BudgetApp.Funds
{
    [ApiController]
    [Route("[controller]")]
    public class FundController : ControllerBase
    {
        private readonly IFundWorkflow _fundWorkflow;
        private readonly ILogger<FundController> _logger;

        public FundController(IFundWorkflow fundWorkflow, ILogger<FundController> logger)
        {
            _fundWorkflow = fundWorkflow;
            _logger = logger;
        }

        #region GET Endpoints
        /// <summary>Gets fund nodes.</summary>
        [HttpGet]
        [Route("nodes")]
        public async Task<IActionResult> GetFundNodes()
        {
            var response = await _fundWorkflow.ExecGetFundNodes();
            if (!response.IsSuccess)
            {
                return Problem(statusCode: 500);
            }
            return Ok(response.Content);
        }

        /// <summary>Gets fund nodes and fund table data.</summary>
        [HttpGet]
        [Route("report")]
        public async Task<IActionResult> GetFundReport()
        {
            var response = await _fundWorkflow.ExecGetFundReport();
            if (!response.IsSuccess)
            {
                return Problem(statusCode: 500);
            }
            return Ok(response.Content);
        }

        /// <summary>Gets monthly savings amount.</summary>
        [HttpGet]
        [Route("get-monthly-savings")]
        public async Task<IActionResult> GetMonthlySavings()
        {
            var response = await _fundWorkflow.ExecGetMonthlySavings();
            if (!response.IsSuccess)
            {
                return Problem(statusCode: 500);
            }
            return Ok(response.Content);
        }
        #endregion

        #region POST Endpoints
        [HttpPost]
        [Route("create-fund")]
        public async Task<IActionResult> CreateFundRecord(CreateFundRequest request)
        {
            if (string.IsNullOrEmpty(request.Name))
            {
                return BadRequest(new { message = "Missing or invalid required fields." });
            }
            var response = await _fundWorkflow.ExecCreateFund(request);
            if (!response.IsSuccess)
            {
                return Problem(statusCode: 500);
            }
            return Ok();
        }

        [HttpPost]
        [Route("deposit-funds")]
        public async Task<IActionResult> DepositFunds([FromBody] DepositFundsRequest request)
        {
            if (!request.FundDeposits.Any() || request.FundDeposits.Any(x => x.FundId == default))
            {
                return BadRequest(new { message = "Missing or invalid required fields." });
            }
            var response = await _fundWorkflow.ExecDepositFunds(request);
            if (!response.IsSuccess)
            {
                return Problem(statusCode: 500, title: response.ErrorMessage);
            }
            return Ok();
        }
        #endregion
    }
}

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

        ///// <summary>Gets all paycheck templates.</summary>
        //[HttpGet]
        //[Route("templates")]
        //public async Task<IActionResult> GetPaycheckTemplates()
        //{
        //    var response = await _fundWorkflow.ExecGetPaycheckTemplates();
        //    if (!response.IsSuccess)
        //    {
        //        return Problem(statusCode: 500);
        //    }
        //    return Ok(response.Content);
        //}
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

        //[HttpPost]
        //[Route("create-paycheck-template")]
        //public async Task<IActionResult> CreatePaycheckTemplate(CreatePaycheckTemplateRequest request)
        //{
        //    if (string.IsNullOrEmpty(request.Employer)
        //        || string.IsNullOrEmpty(request.Description)
        //        || request.Amount <= 0
        //        || request.PayDay <= 0)
        //    {
        //        return BadRequest(new { message = "Missing or invalid required fields." });
        //    }
        //    var response = await _fundWorkflow.ExecCreatePaycheckTemplate(request);
        //    if (!response.IsSuccess)
        //    {
        //        return Problem(statusCode: 500);
        //    }
        //    return Ok();
        //}

        //[HttpPost]
        //[Route("log-paycheck")]
        //public async Task<IActionResult> LogPaycheck([FromQuery] int id)
        //{
        //    var response = await _fundWorkflow.ExecLogPaycheck(id);
        //    if (!response.IsSuccess)
        //    {
        //        return Problem(statusCode: 500);
        //    }
        //    return Ok();
        //}

        [HttpPost]
        [Route("create-fund-transaction")]
        public async Task<IActionResult> CreateFundTransactionRecord(CreateFundTransactionRequest request)
        {
            if (request.Amount <= 0)
            {
                return BadRequest(new { message = "Missing or invalid required fields." });
            }
            var response = await _fundWorkflow.ExecCreateFundTransaction(request);
            if (!response.IsSuccess)
            {
                return Problem(statusCode: 500, title: response.ErrorMessage);
            }
            return Ok();
        }
        #endregion
    }
}

using alpha_labs._05.Workflows.BudgetApp;
using Microsoft.AspNetCore.Mvc;

namespace alpha_labs._06.Controllers.BudgetApp.Transactions
{
    [ApiController]
    [Route("[controller]")]
    public class TransactionController : ControllerBase
    {
        private readonly ITransactionWorkflow _workflow;

        public TransactionController(ITransactionWorkflow workflow)
        {
            _workflow = workflow;
        }

        #region GET Endpoints
        /// <summary>Kicks off the GetTransactions workflow.</summary>
        [HttpGet]
        [Route("transactions")]
        public async Task<IActionResult> GetTransactions()
        {
            var response = await _workflow.ExecGetTransactions();
            if (!response.IsSuccess)
            {
                return Problem(statusCode: 500);
            }
            return Ok(response.Content);
        }
        #endregion

        #region POST Endpoints
        /// <summary>Kicks off the CreateTransaction workflow.</summary>
        [HttpPost]
        [Route("create-transaction")]
        public async Task<IActionResult> CreateTransaction(CreateTransactionRequest request)
        {
            if (string.IsNullOrEmpty(request.TransactionDate)
                || string.IsNullOrEmpty(request.Type)
                || string.IsNullOrEmpty(request.Description)
                || request.Amount <= 0)
            {
                return BadRequest(new { message = "Missing required fields." });
            }
            var response = await _workflow.ExecCreateTransaction(request);
            if (!response.IsSuccess)
            {
                return Problem(statusCode: 500);
            }
            return Ok();
        }
        #endregion
    }
}

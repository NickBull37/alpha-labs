using alpha_labs._05.Workflows.BudgetApp;
using Microsoft.AspNetCore.Mvc;

namespace alpha_labs._06.Controllers.BudgetApp.Purchases
{
    [ApiController]
    [Route("[controller]")]
    public class PurchaseController : ControllerBase
    {
        private readonly IPurchaseWorkflow _purchaseWorkflow;

        public PurchaseController(IPurchaseWorkflow purchaseWorkflow)
        {
            _purchaseWorkflow = purchaseWorkflow;
        }

        #region GET Endpoints
        /// <summary>Gets monthly purchase nodes.</summary>
        [HttpGet]
        [Route("nodes")]
        public async Task<IActionResult> GetPurchaseNodes()
        {
            var response = await _purchaseWorkflow.ExecGetPurchaseNodes();
            if (!response.IsSuccess)
            {
                return Problem(statusCode: 500);
            }
            return Ok(response.Content);
        }

        /// <summary>Gets previous monthly purchase nodes.</summary>
        [HttpGet]
        [Route("prev-nodes")]
        public async Task<IActionResult> GetPrevPurchaseNodes()
        {
            var response = await _purchaseWorkflow.ExecGetPrevPurchaseNodes();
            if (!response.IsSuccess)
            {
                return Problem(statusCode: 500);
            }
            return Ok(response.Content);
        }

        /// <summary>Gets monthly purchase nodes and table data.</summary>
        [HttpGet]
        [Route("report")]
        public async Task<IActionResult> GetPurchaseReport()
        {
            var response = await _purchaseWorkflow.ExecGetPurchaseReport();
            if (!response.IsSuccess)
            {
                return Problem(statusCode: 500);
            }
            return Ok(response.Content);
        }
        #endregion

        #region POST Endpoints
        [HttpPost]
        [Route("create-purchase")]
        public async Task<IActionResult> CreatePurchaseRecord(CreatePurchaseRequest request)
        {
            if (string.IsNullOrEmpty(request.PurchaseDate)
                || string.IsNullOrEmpty(request.Category)
                || string.IsNullOrEmpty(request.Description)
                || request.Amount <= 0)
            {
                return BadRequest(new { message = "Missing or invalid required fields." });
            }
            var response = await _purchaseWorkflow.ExecCreatePurchase(request);
            if (!response.IsSuccess)
            {
                return Problem(title: response.ErrorMessage, statusCode: 500);
            }
            return Ok();
        }

        [HttpPost]
        [Route("delete-purchases")]
        public async Task<IActionResult> DeletePurchases(DeletePurchasesRequest request)
        {
            var response = await _purchaseWorkflow.ExecDeletePurchases(request);
            if (!response.IsSuccess)
            {
                return Problem(title: response.ErrorMessage, statusCode: 500);
            }
            return Ok();
        }
        #endregion
    }
}

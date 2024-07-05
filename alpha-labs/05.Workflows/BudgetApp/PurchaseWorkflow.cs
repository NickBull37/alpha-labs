using alpha_labs._01.Configuration.ActionResponse;
using alpha_labs._02.Models.BudgetApp.Purchases;
using alpha_labs._03.DataAccess.BudgetApp;
using alpha_labs._04.Services.BudgetApp;
using alpha_labs._06.Controllers.BudgetApp.Purchases;

namespace alpha_labs._05.Workflows.BudgetApp
{
    public interface IPurchaseWorkflow
    {
        /// <summary>Workflow for the [purchase/nodes] endpoint.</summary>
        Task<ActionResponse<PurchaseNodesResponse>> ExecGetPurchaseNodes();

        /// <summary>Workflow for the [purchase/prev-nodes] endpoint.</summary>
        Task<ActionResponse<PurchaseNodesResponse>> ExecGetPrevPurchaseNodes();

        /// <summary>Workflow for the [purchase/get-purchase-history] endpoint.</summary>
        Task<ActionResponse<PurchaseHistoryResponse>> ExecGetPurchaseHistory();

        /// <summary>Workflow for the [purchase/report] endpoint.</summary>
        Task<ActionResponse<PurchaseReportResponse>> ExecGetPurchaseReport();

        /// <summary>Workflow for the [purchase/create-purchase] endpoint.</summary>
        Task<ActionResponse> ExecCreatePurchase(CreatePurchaseRequest request);

        /// <summary>Workflow for the [purchase/delete-purchases] endpoint.</summary>
        Task<ActionResponse> ExecDeletePurchases(DeletePurchasesRequest request);
    }

    public class PurchaseWorkflow : IPurchaseWorkflow
    {
        private readonly IPurchaseService _purchaseService;
        private readonly IPurchaseRepository _purchaseRepository;

        public PurchaseWorkflow(IPurchaseService purchaseService, IPurchaseRepository purchaseRepository)
        {
            _purchaseService = purchaseService;
            _purchaseRepository = purchaseRepository;
        }

        /// <summary>Workflow for the [purchase/nodes] endpoint.</summary>
        public async Task<ActionResponse<PurchaseNodesResponse>> ExecGetPurchaseNodes()
        {
            var response = await _purchaseRepository.GetPurchases();

            if (!response.IsSuccess)
            {
                return new FailingAR<PurchaseNodesResponse>(response.ErrorMessage!);
            }

            var purchaseNodesResponse = _purchaseService.CalculateNodeValues(response.Content!);

            return new PassingAR<PurchaseNodesResponse>(purchaseNodesResponse);
        }

        /// <summary>Workflow for the [purchase/prev-nodes] endpoint.</summary>
        public async Task<ActionResponse<PurchaseNodesResponse>> ExecGetPrevPurchaseNodes()
        {
            var response = await _purchaseRepository.GetPrevPurchases();

            if (!response.IsSuccess)
            {
                return new FailingAR<PurchaseNodesResponse>(response.ErrorMessage!);
            }

            var purchaseNodesResponse = _purchaseService.CalculateNodeValues(response.Content!);

            return new PassingAR<PurchaseNodesResponse>(purchaseNodesResponse);
        }

        /// <summary>Workflow for the [purchase/get-purchase-history] endpoint.</summary>
        public async Task<ActionResponse<PurchaseHistoryResponse>> ExecGetPurchaseHistory()
        {
            var purchaseHistoryResponse = await _purchaseRepository.GetPastPurchases();
            if (!purchaseHistoryResponse.IsSuccess)
            {
                return new FailingAR<PurchaseHistoryResponse>(purchaseHistoryResponse.ErrorMessage!);
            }
            var purchases = purchaseHistoryResponse.Content;

            List<int> years = purchases!.Select(x => x.PurchaseDate.Year).Distinct().ToList();

            var index = 1;
            List<PurchaseNode> purchaseNodes = [];
            List<PurchaseHistoryRecord> historyRecords = [];
            foreach (var year in years)
            {
                List<int> months = purchases!.Select(x => x.PurchaseDate.Month).Distinct().ToList();

                foreach (var month in months)
                {
                    List<Purchase> monthlyPurchases = purchases!.Where(x => x.PurchaseDate.Year == year && x.PurchaseDate.Month == month).ToList();

                    var historyRecord = _purchaseService.CreatePurchaseHistoryRecord(monthlyPurchases, month, year);

                    historyRecord.ID = index;
                    index++;

                    historyRecords.Add(historyRecord);
                }
            }

            var response = new PurchaseHistoryResponse
            {
                Records = historyRecords
            };

            return new PassingAR<PurchaseHistoryResponse>(response);
        }

        /// <summary>Workflow for the [purchase/report] endpoint.</summary>
        public async Task<ActionResponse<PurchaseReportResponse>> ExecGetPurchaseReport()
        {
            var nodesResponse = await ExecGetPurchaseNodes();
            if (!nodesResponse.IsSuccess)
            {
                return new FailingAR<PurchaseReportResponse>(nodesResponse.ErrorMessage!);
            }

            var purchaseListResponse = await _purchaseRepository.GetPurchases();
            if (!purchaseListResponse.IsSuccess)
            {
                return new FailingAR<PurchaseReportResponse>(purchaseListResponse.ErrorMessage!);
            }

            var purchaseReport = _purchaseService.CreatePurchaseReportResponse(
                nodesResponse.Content!,
                purchaseListResponse.Content!);

            return new PassingAR<PurchaseReportResponse>(purchaseReport);
        }

        /// <summary>Workflow for the [purchase/create-purchase] endpoint.</summary>
        public async Task<ActionResponse> ExecCreatePurchase(CreatePurchaseRequest request)
        {
            var purchase = _purchaseService.CreatePurchaseEntity(request);
            return await _purchaseRepository.SavePurchaseToDB(purchase);
        }

        /// <summary>Workflow for the [purchase/delete-purchases] endpoint.</summary>
        public async Task<ActionResponse> ExecDeletePurchases(DeletePurchasesRequest request)
        {
            var purchaseIDs = request.PurchaseIDs;
            return await _purchaseRepository.DeletePurchasesFromDB(purchaseIDs);
        }
    }
}

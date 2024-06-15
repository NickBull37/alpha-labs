using alpha_labs._01.Configuration.ActionResponse;
using alpha_labs._03.DataAccess.BudgetApp;
using alpha_labs._04.Services.BudgetApp;
using alpha_labs._06.Controllers.BudgetApp.Dashboard;

namespace alpha_labs._05.Workflows.BudgetApp
{
    public interface IDashboardWorkflow
    {
        /// <summary>Workflow for the [dashboard/nodes] endpoint.</summary>
        Task<ActionResponse<DashboardNodesResponse>> ExecGetDashboardNodes();

        /// <summary>Workflow for the [dashboard/report] endpoint.</summary>
        Task<ActionResponse<DashboardReportResponse>> ExecGetDashboardReport();
    }

    public class DashboardWorkflow : IDashboardWorkflow
    {
        private readonly IDashboardService _dashboardService;

        private readonly IBillRepository _billRepository;
        private readonly IBillWorkflow _billWorkflow;

        private readonly IPaycheckRepository _paycheckRepository;

        private readonly IPurchaseRepository _purchaseRepository;
        private readonly IPurchaseWorkflow _purchaseWorkflow;

        private readonly IFundWorkflow _fundWorkflow;

        private readonly ITransactionRepository _transactionRepository;

        public DashboardWorkflow(IDashboardService dashboardService,
            IBillRepository billRepository,
            IBillWorkflow billWorkflow,
            IPaycheckRepository paycheckRepository,
            IPurchaseRepository purchaseRepository,
            IPurchaseWorkflow purchaseWorkflow,
            IFundWorkflow fundWorkflow,
            ITransactionRepository transactionRepository)
        {
            _dashboardService = dashboardService;
            _billRepository = billRepository;
            _billWorkflow = billWorkflow;
            _paycheckRepository = paycheckRepository;
            _purchaseRepository = purchaseRepository;
            _purchaseWorkflow = purchaseWorkflow;
            _fundWorkflow = fundWorkflow;
            _transactionRepository = transactionRepository;
        }

        /// <summary>Workflow for the [dashboard/nodes] endpoint.</summary>
        public async Task<ActionResponse<DashboardNodesResponse>> ExecGetDashboardNodes()
        {
            var purchaseResponse = await _purchaseRepository.GetPurchases();
            if (!purchaseResponse.IsSuccess)
            {
                return new FailingAR<DashboardNodesResponse>(purchaseResponse.ErrorMessage!);
            }
            var billsResponse = await _billRepository.GetBills();
            if (!billsResponse.IsSuccess)
            {
                return new FailingAR<DashboardNodesResponse>(billsResponse.ErrorMessage!);
            }
            var paycheckResponse = await _paycheckRepository.GetPaychecks();
            if (!paycheckResponse.IsSuccess)
            {
                return new FailingAR<DashboardNodesResponse>(paycheckResponse.ErrorMessage!);
            }
            var paycheckTemplateResponse = await _paycheckRepository.GetPaycheckTemplates();
            if (!paycheckTemplateResponse.IsSuccess)
            {
                return new FailingAR<DashboardNodesResponse>(paycheckTemplateResponse.ErrorMessage!);
            }
            var transactionResponse = await _transactionRepository.GetTransactions();
            if (!transactionResponse.IsSuccess)
            {
                return new FailingAR<DashboardNodesResponse>(transactionResponse.ErrorMessage!);
            }

            var dashboardReport = _dashboardService.CalculateNodeValues(
                billsResponse.Content!,
                purchaseResponse.Content!,
                paycheckResponse.Content!,
                paycheckTemplateResponse.Content!,
                transactionResponse.Content!);

            return new PassingAR<DashboardNodesResponse>(dashboardReport);
        }

        /// <summary>Workflow for the [dashboard/report] endpoint.</summary>
        public async Task<ActionResponse<DashboardReportResponse>> ExecGetDashboardReport()
        {
            var dashboardNodesResponse = await ExecGetDashboardNodes();
            if (!dashboardNodesResponse.IsSuccess)
            {
                return new FailingAR<DashboardReportResponse>(dashboardNodesResponse.ErrorMessage!);
            }
            var purchaseNodesResponse = await _purchaseWorkflow.ExecGetPurchaseNodes();
            if (!purchaseNodesResponse.IsSuccess)
            {
                return new FailingAR<DashboardReportResponse>(purchaseNodesResponse.ErrorMessage!);
            }
            var billingNodesResponse = await _billWorkflow.ExecGetBillingNodes();
            if (!billingNodesResponse.IsSuccess)
            {
                return new FailingAR<DashboardReportResponse>(billingNodesResponse.ErrorMessage!);
            }
            var fundsResponse = await _fundWorkflow.ExecGetFundNodes();
            if (!fundsResponse.IsSuccess)
            {
                return new FailingAR<DashboardReportResponse>(fundsResponse.ErrorMessage!);
            }

            var dashboardReport = new DashboardReportResponse
            {
                DashboardNodes = dashboardNodesResponse.Content!,
                PurchaseNodes = purchaseNodesResponse.Content!,
                BillingNodes = billingNodesResponse.Content!,
                FundsList = fundsResponse.Content!
            };

            return new PassingAR<DashboardReportResponse>(dashboardReport);
        }
    }
}

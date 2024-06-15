using alpha_labs._01.Configuration.ActionResponse;
using alpha_labs._02.Models;
using alpha_labs._03.DataAccess.BudgetApp;
using alpha_labs._04.Services.BudgetApp;
using alpha_labs._06.Controllers.BudgetApp.Bills;

namespace alpha_labs._05.Workflows.BudgetApp
{
    public interface IBillWorkflow
    {
        /// <summary>Workflow for the [bills/batch] endpoint.</summary>
        Task<ActionResponse> ExecRunBillsBatch();

        /// <summary>Workflow for the [bills/nodes] endpoint.</summary>
        Task<ActionResponse<BillingNodesResponse>> ExecGetBillingNodes();

        /// <summary>Workflow for the [bills/report] endpoint.</summary>
        Task<ActionResponse<BillingReportResponse>> ExecGetBillingReport();

        /// <summary>Workflow for the [bills/create-bill-template] endpoint.</summary>
        Task<ActionResponse> ExecCreateBillTemplate(CreateBillTemplateRequest request);

        /// <summary>Workflow for the [bills/delete-bills] endpoint.</summary>
        Task<ActionResponse> ExecDeleteBills(DeleteBillsRequest request);

        /// <summary>Workflow for the [bills/set-paid] endpoint.</summary>
        Task<ActionResponse> ExecSetBillPaid(int billID);
    }

    public class BillWorkflow : IBillWorkflow
    {
        private readonly IBillService _billService;
        private readonly IBillRepository _billRepository;
        private readonly AlphaLabsDbContext _dbContext;

        public BillWorkflow(IBillService service, IBillRepository repository, AlphaLabsDbContext dbContext)
        {
            _billService = service;
            _billRepository = repository;
            _dbContext = dbContext;
        }

        /// <summary>Workflow for the [bills/batch] endpoint.</summary>
        public async Task<ActionResponse> ExecRunBillsBatch()
        {
            // Step 1
            var templatesResponse = await _billRepository.GetBillTemplates();
            if (!templatesResponse.IsSuccess)
            {
                return new FailingAR(templatesResponse.ErrorMessage!);
            }

            // Step 2
            var unmatchedTemplatesResponse = await _billService.FilterBillingTemplates(templatesResponse.Content!);
            if (!unmatchedTemplatesResponse.IsSuccess)
            {
                return new FailingAR(unmatchedTemplatesResponse.ErrorMessage!);
            }

            // Step 3
            var batchResponse = await _billService.RunBillsBatch(unmatchedTemplatesResponse.Content!);
            if (!batchResponse.IsSuccess)
            {
                return new FailingAR(batchResponse.ErrorMessage!);
            }

            return new PassingAR();
        }

        /// <summary>Workflow for the [bills/nodes] endpoint.</summary>
        public async Task<ActionResponse<BillingNodesResponse>> ExecGetBillingNodes()
        {
            var response = await _billRepository.GetBills();

            if (!response.IsSuccess)
            {
                return new FailingAR<BillingNodesResponse>(response.ErrorMessage!);
            }

            var billingNodesResponse = _billService.CalculateNodeValues(response.Content!);
            return new PassingAR<BillingNodesResponse>(billingNodesResponse);
        }

        /// <summary>Workflow for the [bills/report] endpoint.</summary>
        public async Task<ActionResponse<BillingReportResponse>> ExecGetBillingReport()
        {
            var nodesResponse = await ExecGetBillingNodes();
            if (!nodesResponse.IsSuccess)
            {
                return new FailingAR<BillingReportResponse>(nodesResponse.ErrorMessage!);
            }

            var billingListResponse = await _billRepository.GetBills();
            if (!billingListResponse.IsSuccess)
            {
                return new FailingAR<BillingReportResponse>(billingListResponse.ErrorMessage!);
            }

            var templatesResponse = await _billRepository.GetBillTemplates();
            if (!templatesResponse.IsSuccess)
            {
                return new FailingAR<BillingReportResponse>(templatesResponse.ErrorMessage!);
            }

            var unmatchedTemplatesResponse = await _billService.FilterBillingTemplates(templatesResponse.Content!);
            if (!unmatchedTemplatesResponse.IsSuccess)
            {
                return new FailingAR<BillingReportResponse>(unmatchedTemplatesResponse.ErrorMessage!);
            }
            var hasUnbatchedBills = unmatchedTemplatesResponse.Content!.Count > 0;

            var billingReport = _billService.CreateBillingReportResponse(
                hasUnbatchedBills,
                nodesResponse.Content!,
                billingListResponse.Content!);

            return new PassingAR<BillingReportResponse>(billingReport);
        }

        /// <summary>Workflow for the [bills/create-bill-template] endpoint.</summary>
        public async Task<ActionResponse> ExecCreateBillTemplate(CreateBillTemplateRequest request)
        {
            var billTemplate = _billService.CreateBillTemplateEntity(request);
            return await _billRepository.SaveBillTemplateToDB(billTemplate);
        }

        /// <summary>Workflow for the [bills/delete-bills] endpoint.</summary>
        public async Task<ActionResponse> ExecDeleteBills(DeleteBillsRequest request)
        {
            var billIDs = request.BillIDs;
            // TODO: get bill templates for matching billIDs
            //var test = await _billsRepository.GetBillTemplatesByIDs(billIDs);

            // Delete bill templates
            return await _billRepository.DeleteBillsFromDB(billIDs);
        }

        /// <summary>Workflow for the [bills/set-paid] endpoint.</summary>
        public async Task<ActionResponse> ExecSetBillPaid(int billID)
        {
            var billResponse = await _billRepository.GetBillByID(billID);
            if (!billResponse.IsSuccess)
            {
                return new FailingAR(billResponse.ErrorMessage!);
            }

            var bill = billResponse.Content!;

            bill.IsPaid = true;
            bill.UpdatedDate = DateTime.Now;
            await _dbContext.SaveChangesAsync();
            return new PassingAR();
        }
    }
}

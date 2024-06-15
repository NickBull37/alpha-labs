using alpha_labs._01.Configuration.ActionResponse;
using alpha_labs._02.Models;
using alpha_labs._02.Models.BudgetApp.Funds;
using alpha_labs._03.DataAccess.BudgetApp;
using alpha_labs._04.Services.BudgetApp;
using alpha_labs._06.Controllers.BudgetApp.Funds;

namespace alpha_labs._05.Workflows.BudgetApp
{
    public interface IFundWorkflow
    {
        /// <summary>Workflow for the [fund/nodes] endpoint.</summary>
        Task<ActionResponse<List<Fund>>> ExecGetFundNodes();

        /// <summary>Workflow for the [fund/report] endpoint.</summary>
        Task<ActionResponse<FundReportResponse>> ExecGetFundReport();

        /// <summary>Workflow for the [fund/create-fund] endpoint.</summary>
        Task<ActionResponse> ExecCreateFund(CreateFundRequest request);

        /// <summary>Workflow for the [fund/create-fund-transaction] endpoint.</summary>
        Task<ActionResponse> ExecCreateFundTransaction(CreateFundTransactionRequest request);
    }

    public class FundWorkflow : IFundWorkflow
    {
        private readonly IFundService _fundService;
        private readonly IFundRepository _fundRepository;
        private readonly IPaycheckRepository _paycheckRepository;
        private readonly ITransactionRepository _transactionRepository;
        private readonly AlphaLabsDbContext _dbContext;

        public FundWorkflow(IFundService fundService, IFundRepository fundRepository, IPaycheckRepository paycheckRepository, ITransactionRepository transactionRepository,
            AlphaLabsDbContext dbContext)
        {
            _fundService = fundService;
            _fundRepository = fundRepository;
            _paycheckRepository = paycheckRepository;
            _transactionRepository = transactionRepository;
            _dbContext = dbContext;
        }

        /// <summary>Workflow for the [fund/nodes] endpoint.</summary>
        public async Task<ActionResponse<List<Fund>>> ExecGetFundNodes()
        {
            return await _fundRepository.GetFunds();
        }

        /// <summary>Workflow for the [fund/report] endpoint.</summary>
        public async Task<ActionResponse<FundReportResponse>> ExecGetFundReport()
        {
            // Step 1. Collect data to generate report
            var fundResponse = await _fundRepository.GetFunds();
            if (!fundResponse.IsSuccess)
            {
                return new FailingAR<FundReportResponse>(fundResponse.ErrorMessage!);
            }
            var paycheckResponse = await _paycheckRepository.GetPaychecks();
            if (!paycheckResponse.IsSuccess)
            {
                return new FailingAR<FundReportResponse>(paycheckResponse.ErrorMessage!);
            }
            var fundTransactionResponse = await _fundRepository.GetFundTransactions();
            if (!fundTransactionResponse.IsSuccess)
            {
                return new FailingAR<FundReportResponse>(fundTransactionResponse.ErrorMessage!);
            }
            var transactionResponse = await _transactionRepository.GetTransactions();
            if (!transactionResponse.IsSuccess)
            {
                return new FailingAR<FundReportResponse>(transactionResponse.ErrorMessage!);
            }

            // Step 2. Generate report
            var reportResponse = await _fundService.CreateFundReportEntity(
                fundResponse.Content!,
                paycheckResponse.Content!,
                fundTransactionResponse.Content!,
                transactionResponse.Content!);
            return new PassingAR<FundReportResponse>(reportResponse.Content!);
        }

        /// <summary>Workflow for the [fund/create-fund] endpoint.</summary>
        public async Task<ActionResponse> ExecCreateFund(CreateFundRequest request)
        {
            var fund = _fundService.CreateFundEntity(request);
            return await _fundRepository.SaveFundToDB(fund);
        }

        /// <summary>Workflow for the [fund/create-fund-transaction] endpoint.</summary>
        public async Task<ActionResponse> ExecCreateFundTransaction(CreateFundTransactionRequest request)
        {
            var fundResponse = await _fundRepository.GetFundByID(request.FundID);
            if (!fundResponse.IsSuccess)
            {
                return new FailingAR(fundResponse.ErrorMessage!);
            }
            var fund = fundResponse.Content!;

            var fundTransaction = _fundService.CreateFundTransactionEntity(request, fund);

            fund.Balance = fundTransaction.NewBalance;
            fund.DepositCount++;
            fund.UpdatedDate = DateTime.Now;

            await _dbContext.SaveChangesAsync();
            return await _fundRepository.SaveFundTransactionToDB(fundTransaction);
        }
    }
}

using alpha_labs._01.Configuration.ActionResponse;
using alpha_labs._02.Models.BudgetApp.Transactions;
using alpha_labs._03.DataAccess.BudgetApp;
using alpha_labs._04.Services.BudgetApp;
using alpha_labs._06.Controllers.BudgetApp.Transactions;

namespace alpha_labs._05.Workflows.BudgetApp
{
    public interface ITransactionWorkflow
    {
        /// <summary>Workflow for the [transaction/transactions] endpoint.</summary>
        Task<ActionResponse<List<Transaction>>> ExecGetTransactions();

        /// <summary>Workflow for the [transaction/create-transaction] endpoint.</summary>
        Task<ActionResponse> ExecCreateTransaction(CreateTransactionRequest request);
    }

    public class TransactionWorkflow : ITransactionWorkflow
    {
        private readonly ITransactionService _transactionService;
        private readonly ITransactionRepository _transactionRepository;

        public TransactionWorkflow(ITransactionService transactionService, ITransactionRepository transactionRepository)
        {
            _transactionService = transactionService;
            _transactionRepository = transactionRepository;
        }

        /// <summary>Workflow for the [transaction/transactions] endpoint.</summary>
        public async Task<ActionResponse<List<Transaction>>> ExecGetTransactions()
        {
            return await _transactionRepository.GetTransactions();
        }

        /// <summary>Workflow for the [transaction/create-transaction] endpoint.</summary>
        public async Task<ActionResponse> ExecCreateTransaction(CreateTransactionRequest request)
        {
            var transaction = _transactionService.CreateTransactionEntity(request);
            return await _transactionRepository.SaveTransactionToDB(transaction);
        }
    }
}

using alpha_labs._01.Configuration.Utilities;
using alpha_labs._02.Models.BudgetApp.Transactions;
using alpha_labs._06.Controllers.BudgetApp.Transactions;

namespace alpha_labs._04.Services.BudgetApp
{
    public interface ITransactionService
    {
        /// <summary>Creates a new transaction model entity.</summary>
        Transaction CreateTransactionEntity(CreateTransactionRequest request);
    }

    public class TransactionService : ITransactionService
    {
        /// <summary>Creates a new transaction model entity.</summary>
        public Transaction CreateTransactionEntity(CreateTransactionRequest request)
        {
            Converter converter = new();
            Formatter formatter = new();

            return new Transaction()
            {
                CreatedDate = DateTime.Now,
                UpdatedDate = null,
                TransactionDate = converter.ConvertStringToDateTime(request.TransactionDate),
                TransactionDateFormatted = formatter.FormatDateString(request.TransactionDate),
                Amount = request.Amount,
                Type = request.Type,
                Description = request.Description,
            };
        }
    }
}

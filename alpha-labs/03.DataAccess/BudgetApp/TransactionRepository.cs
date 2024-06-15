using alpha_labs._01.Configuration.ActionResponse;
using alpha_labs._02.Models;
using alpha_labs._02.Models.BudgetApp.Transactions;
using Microsoft.EntityFrameworkCore;

namespace alpha_labs._03.DataAccess.BudgetApp
{
    public interface ITransactionRepository
    {
        #region CREATE
        /// <summary>Saves a new transaction record to the database.</summary>
        Task<ActionResponse> SaveTransactionToDB(Transaction transaction);
        #endregion

        #region READ
        /// <summary>Gets all transactions for the current month from the database.</summary>
        Task<ActionResponse<List<Transaction>>> GetTransactions();
        #endregion

        #region UPDATE
        #endregion

        #region DELETE
        #endregion
    }

    public class TransactionRepository : ITransactionRepository
    {
        private readonly AlphaLabsDbContext _dbContext;

        public TransactionRepository(AlphaLabsDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        #region CREATE
        /// <summary>Saves a new transaction record to the database.</summary>
        public async Task<ActionResponse> SaveTransactionToDB(Transaction transaction)
        {
            try
            {
                _dbContext.Transactions.Add(transaction);
                await _dbContext.SaveChangesAsync();
                return new PassingAR();
            }
            catch
            {
                return new FailingAR("Failed to save transaction record to database.");
            }
        }
        #endregion

        #region READ
        /// <summary>Gets all transactions for the current month from the database.</summary>
        public async Task<ActionResponse<List<Transaction>>> GetTransactions()
        {
            var currentDate = DateTime.Today;
            var startOfMonth = new DateTime(currentDate.Year, currentDate.Month, 1);
            var startOfNextMonth = startOfMonth.AddMonths(1);

            try
            {
                var transactions = await _dbContext.Transactions
                    .AsNoTracking()
                    .Where(p => p.TransactionDate >= startOfMonth && p.TransactionDate < startOfNextMonth)
                    .ToListAsync()
                    .ConfigureAwait(false);
                return new PassingAR<List<Transaction>>(transactions);
            }
            catch
            {
                return new FailingAR<List<Transaction>>("Failed to retrieve transactions from the database.");
            }
        }
        #endregion

        #region UPDATE
        #endregion

        #region DELETE
        #endregion
    }
}

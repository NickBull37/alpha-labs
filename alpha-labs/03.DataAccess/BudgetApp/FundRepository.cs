using alpha_labs._01.Configuration.ActionResponse;
using alpha_labs._02.Models;
using alpha_labs._02.Models.BudgetApp.Funds;
using Microsoft.EntityFrameworkCore;

namespace alpha_labs._03.DataAccess.BudgetApp
{
    public interface IFundRepository
    {
        #region CREATE
        /// <summary>Saves a new fund record to the database.</summary>
        Task<ActionResponse> SaveFundToDB(Fund fund);

        /// <summary>Saves a new fund deposit record to the database.</summary>
        Task<ActionResponse> SaveFundDepositToDB(FundTransaction transaction);
        #endregion

        #region READ
        /// <summary>Gets all fund records from the database.</summary>
        Task<ActionResponse<List<Fund>>> GetFunds();

        /// <summary>Gets a fund record from the database by ID.</summary>
        Task<ActionResponse<Fund>> GetFundByID(int id);

        /// <summary>Gets all fund transaction records for the current month from the database.</summary>
        Task<ActionResponse<List<FundTransaction>>> GetFundTransactions();
        #endregion

        #region UPDATE
        #endregion

        #region DELETE
        #endregion
    }

    public class FundRepository : IFundRepository
    {
        private readonly AlphaLabsDbContext _dbContext;

        public FundRepository(AlphaLabsDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        #region CREATE
        /// <summary>Saves a new fund record to the database.</summary>
        public async Task<ActionResponse> SaveFundToDB(Fund fund)
        {
            try
            {
                _dbContext.Funds.Add(fund);
                await _dbContext.SaveChangesAsync();
                return new PassingAR();
            }
            catch
            {
                return new FailingAR("Failed to save fund record to database.");
            }
        }

        /// <summary>Saves a new fund deposit record to the database.</summary>
        public async Task<ActionResponse> SaveFundDepositToDB(FundTransaction transaction)
        {
            try
            {
                _dbContext.FundTransactions.Add(transaction);
                await _dbContext.SaveChangesAsync();
                return new PassingAR();
            }
            catch
            {
                return new FailingAR("Failed to save fund transaction record to database.");
            }
        }
        #endregion

        #region READ
        /// <summary>Gets all fund records from the database.</summary>
        public async Task<ActionResponse<List<Fund>>> GetFunds()
        {
            try
            {
                var funds = await _dbContext.Funds
                    .AsNoTracking()
                    .ToListAsync()
                    .ConfigureAwait(false);
                return new PassingAR<List<Fund>>(funds);
            }
            catch
            {
                return new FailingAR<List<Fund>>("Failed to retrieve funds from the database.");
            }
        }

        /// <summary>Gets a fund record from the database by ID.</summary>
        public async Task<ActionResponse<Fund>> GetFundByID(int id)
        {
            try
            {
                var fund = await _dbContext.Funds
                    .Where(x => x.ID == id)
                    .SingleAsync()
                    .ConfigureAwait(false);
                return new PassingAR<Fund>(fund);
            }
            catch
            {
                return new FailingAR<Fund>("Failed to retrieve fund from the database.");
            }
        }

        /// <summary>Gets all fund transaction records for the current month from the database.</summary>
        public async Task<ActionResponse<List<FundTransaction>>> GetFundTransactions()
        {
            var currentDate = DateTime.Today;
            var startOfMonth = new DateTime(currentDate.Year, currentDate.Month, 1);
            var startOfNextMonth = startOfMonth.AddMonths(1);

            try
            {
                var transactions = await _dbContext.FundTransactions
                    .AsNoTracking()
                    .Where(x => x.Date >= startOfMonth && x.Date < startOfNextMonth)
                    .ToListAsync()
                    .ConfigureAwait(false);
                return new PassingAR<List<FundTransaction>>(transactions);
            }
            catch
            {
                return new FailingAR<List<FundTransaction>>("Failed to retrieve transactions from the database.");
            }
        }
        #endregion

        #region UPDATE
        #endregion

        #region DELETE
        #endregion
    }
}

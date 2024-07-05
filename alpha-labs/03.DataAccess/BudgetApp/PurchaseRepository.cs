using alpha_labs._01.Configuration.ActionResponse;
using alpha_labs._02.Models;
using alpha_labs._02.Models.BudgetApp.Purchases;
using Microsoft.EntityFrameworkCore;

namespace alpha_labs._03.DataAccess.BudgetApp
{
    public interface IPurchaseRepository
    {
        #region CREATE
        /// <summary>Saves the new purchase record to the database.</summary>
        Task<ActionResponse> SavePurchaseToDB(Purchase purchase);
        #endregion

        #region READ
        /// <summary>Gets all purchase records for the current month from the db.</summary>
        Task<ActionResponse<List<Purchase>>> GetPurchases();

        /// <summary>Gets all purchase records for the previous month from the database.</summary>
        Task<ActionResponse<List<Purchase>>> GetPrevPurchases();

        /// <summary>Gets all past purchases from the database.</summary>
        Task<ActionResponse<List<Purchase>>> GetPastPurchases();
        #endregion

        #region UPDATE
        #endregion

        #region DELETE
        /// <summary>Deletes purchase records from the database.</summary>
        Task<ActionResponse> DeletePurchasesFromDB(int[] purchaseIDs);
        #endregion
    }

    public class PurchaseRepository : IPurchaseRepository
    {
        private readonly AlphaLabsDbContext _dbContext;

        public PurchaseRepository(AlphaLabsDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        #region CREATE
        /// <summary>Saves a new purchase record to the database.</summary>
        public async Task<ActionResponse> SavePurchaseToDB(Purchase purchase)
        {
            try
            {
                _dbContext.Purchases.Add(purchase);
                await _dbContext.SaveChangesAsync();
                return new PassingAR();
            }
            catch
            {
                return new FailingAR("Failure occured attempting to save purchase record to database.");
            }
        }
        #endregion

        #region READ
        /// <summary>Gets all purchase records for the current month from the database.</summary>
        public async Task<ActionResponse<List<Purchase>>> GetPurchases()
        {
            var currentDate = DateTime.Today;
            var startOfMonth = new DateTime(currentDate.Year, currentDate.Month, 1);
            var startOfNextMonth = startOfMonth.AddMonths(1);

            try
            {
                var purchases = await _dbContext.Purchases
                    .AsNoTracking()
                    .Where(p => p.PurchaseDate >= startOfMonth && p.PurchaseDate < startOfNextMonth)
                    .ToListAsync()
                    .ConfigureAwait(false);
                return new PassingAR<List<Purchase>>(purchases);
            }
            catch
            {
                return new FailingAR<List<Purchase>>("Failed to retrieve purchases from the database.");
            }
        }

        /// <summary>Gets all purchase records for the previous month from the database.</summary>
        public async Task<ActionResponse<List<Purchase>>> GetPrevPurchases()
        {
            var currentDate = DateTime.Today;
            var startOfMonth = new DateTime(currentDate.Year, currentDate.Month, 1);
            var startOfPrevMonth = new DateTime(currentDate.Year, currentDate.Month - 1, 1);

            try
            {
                var purchases = await _dbContext.Purchases
                    .AsNoTracking()
                    .Where(p => p.PurchaseDate >= startOfPrevMonth && p.PurchaseDate < startOfMonth)
                    .ToListAsync()
                    .ConfigureAwait(false);
                return new PassingAR<List<Purchase>>(purchases);
            }
            catch
            {
                return new FailingAR<List<Purchase>>("Failed to retrieve purchases from the database.");
            }
        }

        /// <summary>Gets all past purchases from the database.</summary>
        public async Task<ActionResponse<List<Purchase>>> GetPastPurchases()
        {
            var currentDate = DateTime.Today;
            var startOfMonth = new DateTime(currentDate.Year, currentDate.Month, 1);

            try
            {
                var purchases = await _dbContext.Purchases
                    .AsNoTracking()
                    .Where(p => p.PurchaseDate < startOfMonth)
                    .ToListAsync()
                    .ConfigureAwait(false);
                return new PassingAR<List<Purchase>>(purchases);
            }
            catch
            {
                return new FailingAR<List<Purchase>>("Failed to retrieve bills from the database.");
            }
        }
        #endregion

        #region UPDATE
        #endregion

        #region DELETE
        /// <summary>Deletes purchase records from the database.</summary>
        public async Task<ActionResponse> DeletePurchasesFromDB(int[] purchaseIDs)
        {
            try
            {
                var purchasesToDelete = await _dbContext.Purchases
                    .Where(p => purchaseIDs.Contains(p.ID))
                    .ToListAsync();

                if (purchasesToDelete == null || purchasesToDelete.Count == 0)
                {
                    return new FailingAR("No purchase records found to delete.");
                }

                _dbContext.Purchases.RemoveRange(purchasesToDelete);
                await _dbContext.SaveChangesAsync();
                return new PassingAR();
            }
            catch
            {
                return new FailingAR("Failure occured attempting to delete purchase records from database.");
            }
        }
        #endregion
    }
}

using alpha_labs._01.Configuration.ActionResponse;
using alpha_labs._02.Models;
using alpha_labs._02.Models.BudgetApp.Bills;
using Microsoft.EntityFrameworkCore;

namespace alpha_labs._03.DataAccess.BudgetApp
{
    public interface IBillRepository
    {
        #region CREATE
        /// <summary>Saves a new bill template record to the database.</summary>
        Task<ActionResponse> SaveBillTemplateToDB(BillTemplate template);

        /// <summary>Saves a new bill record to the database.</summary>
        Task<ActionResponse> SaveBillToDB(Bill bill);
        #endregion

        #region READ
        /// <summary>Gets all bill templates from the database.</summary>
        Task<ActionResponse<List<BillTemplate>>> GetBillTemplates();

        /// <summary>Gets all bills for the current month from the database.</summary>
        Task<ActionResponse<List<Bill>>> GetBills();

        /// <summary>Gets the bill with matching ID from the database.</summary>
        Task<ActionResponse<Bill>> GetBillByID(int id);

        /// <summary>Gets all bills with matching description from the database.</summary>
        Task<ActionResponse<List<Bill>>> GetBillsByType(string description);
        #endregion

        #region UPDATE
        #endregion

        #region DELETE
        /// <summary>Deletes bill records from the database.</summary>
        Task<ActionResponse> DeleteBillsFromDB(int[] billIDs);
        #endregion
    }

    public class BillRepository : IBillRepository
    {
        private readonly AlphaLabsDbContext _dbContext;

        public BillRepository(AlphaLabsDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        #region CREATE
        /// <summary>Saves a new bill template record to the database.</summary>
        public async Task<ActionResponse> SaveBillTemplateToDB(BillTemplate template)
        {
            try
            {
                _dbContext.BillTemplates.Add(template);
                await _dbContext.SaveChangesAsync();
                return new PassingAR();
            }
            catch
            {
                return new FailingAR("Failed to save bill template record to database.");
            }
        }

        /// <summary>Saves a new bill record to the database.</summary>
        public async Task<ActionResponse> SaveBillToDB(Bill bill)
        {
            try
            {
                _dbContext.Bills.Add(bill);
                await _dbContext.SaveChangesAsync();
                return new PassingAR();
            }
            catch
            {
                return new FailingAR("Failed to save bill record to database.");
            }
        }
        #endregion

        #region READ
        /// <summary>Gets all bill templates from the database.</summary>
        public async Task<ActionResponse<List<BillTemplate>>> GetBillTemplates()
        {
            try
            {
                var templates = await _dbContext.BillTemplates
                    .AsNoTracking()
                    .ToListAsync()
                    .ConfigureAwait(false);
                return new PassingAR<List<BillTemplate>>(templates);
            }
            catch
            {
                return new FailingAR<List<BillTemplate>>("Failed to retrieve bill templatess from the database.");
            }
        }

        /// <summary>Gets all bills for the current month from the database.</summary>
        public async Task<ActionResponse<List<Bill>>> GetBills()
        {
            var currentDate = DateTime.Today;
            var startOfMonth = new DateTime(currentDate.Year, currentDate.Month, 1);
            var startOfNextMonth = startOfMonth.AddMonths(1);

            try
            {
                var bills = await _dbContext.Bills
                    .AsNoTracking()
                    .Where(p => p.DueDate >= startOfMonth && p.DueDate < startOfNextMonth)
                    .ToListAsync()
                    .ConfigureAwait(false);
                return new PassingAR<List<Bill>>(bills);
            }
            catch
            {
                return new FailingAR<List<Bill>>("Failed to retrieve bills from the database.");
            }
        }

        /// <summary>Gets the bill with matching ID from the database.</summary>
        public async Task<ActionResponse<Bill>> GetBillByID(int id)
        {
            try
            {
                var bill = await _dbContext.Bills
                    .Where(x => x.ID == id)
                    .SingleAsync()
                    .ConfigureAwait(false);
                return new PassingAR<Bill>(bill);
            }
            catch
            {
                return new FailingAR<Bill>("Failed to retrieve bill from the database.");
            }
        }

        /// <summary>Gets all bills with matching description from the database.</summary>
        public async Task<ActionResponse<List<Bill>>> GetBillsByType(string description)
        {
            try
            {
                var bills = await _dbContext.Bills
                    .AsNoTracking()
                    .Where(x => x.Description == description)
                    .ToListAsync()
                    .ConfigureAwait(false);
                return new PassingAR<List<Bill>>(bills);
            }
            catch
            {
                return new FailingAR<List<Bill>>("Failed to retrieve bills from the database.");
            }
        }
        #endregion

        #region UPDATE

        #endregion

        #region DELETE
        /// <summary>Deletes bill records from the database.</summary>
        public async Task<ActionResponse> DeleteBillsFromDB(int[] billIDs)
        {
            try
            {
                var billsToDelete = await _dbContext.Bills
                    .Where(p => billIDs.Contains(p.ID))
                    .ToListAsync();

                if (billsToDelete == null || billsToDelete.Count == 0)
                {
                    return new FailingAR("No bill records found to delete.");
                }

                _dbContext.Bills.RemoveRange(billsToDelete);
                await _dbContext.SaveChangesAsync();
                return new PassingAR();
            }
            catch
            {
                return new FailingAR("Failure occured attempting to delete bill records from database.");
            }
        }
        #endregion
    }
}

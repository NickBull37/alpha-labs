using alpha_labs._01.Configuration.ActionResponse;
using alpha_labs._02.Models;
using alpha_labs._02.Models.BudgetApp.Paychecks;
using Microsoft.EntityFrameworkCore;

namespace alpha_labs._03.DataAccess.BudgetApp
{
    public interface IPaycheckRepository
    {
        #region CREATE
        /// <summary>Saves a new paycheck record to the database.</summary>
        Task<ActionResponse> SavePaycheckToDB(Paycheck paycheck);

        /// <summary>Saves a new paycheck template record to the database.</summary>
        Task<ActionResponse> SavePaycheckTemplateToDB(PaycheckTemplate template);
        #endregion

        #region READ
        /// <summary>Gets all paycheck for the current month from the database.</summary>
        Task<ActionResponse<List<Paycheck>>> GetPaychecks();

        /// <summary>Gets all paycheck template records from the database.</summary>
        Task<ActionResponse<List<PaycheckTemplate>>> GetPaycheckTemplates();

        /// <summary>Gets a paycheck template record from the database by ID.</summary>
        Task<ActionResponse<PaycheckTemplate>> GetPaycheckTemplateByID(int templateID);
        #endregion

        #region UPDATE
        #endregion

        #region DELETE
        #endregion
    }

    public class PaycheckRepository : IPaycheckRepository
    {
        private readonly AlphaLabsDbContext _dbContext;

        public PaycheckRepository(AlphaLabsDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        #region CREATE
        /// <summary>Saves a new paycheck template record to the database.</summary>
        public async Task<ActionResponse> SavePaycheckTemplateToDB(PaycheckTemplate template)
        {
            try
            {
                _dbContext.PaycheckTemplates.Add(template);
                await _dbContext.SaveChangesAsync();
                return new PassingAR();
            }
            catch
            {
                return new FailingAR("Failed to save paycheck template record to database.");
            }
        }

        /// <summary>Saves a new paycheck record to the database.</summary>
        public async Task<ActionResponse> SavePaycheckToDB(Paycheck paycheck)
        {
            try
            {
                _dbContext.Paychecks.Add(paycheck);
                await _dbContext.SaveChangesAsync();
                return new PassingAR();
            }
            catch
            {
                return new FailingAR("Failed to save paycheck record to database.");
            }
        }
        #endregion

        #region READ
        /// <summary>Gets all paycheck for the current month from the database.</summary>
        public async Task<ActionResponse<List<Paycheck>>> GetPaychecks()
        {
            var currentDate = DateTime.Today;
            var startOfMonth = new DateTime(currentDate.Year, currentDate.Month, 1);
            var startOfNextMonth = startOfMonth.AddMonths(1);

            try
            {
                var paychecks = await _dbContext.Paychecks
                    .AsNoTracking()
                    .Where(p => p.DepositDate >= startOfMonth && p.DepositDate < startOfNextMonth)
                    .ToListAsync()
                    .ConfigureAwait(false);
                return new PassingAR<List<Paycheck>>(paychecks);
            }
            catch
            {
                return new FailingAR<List<Paycheck>>("Failed to retrieve paychecks from the database.");
            }
        }

        /// <summary>Gets all paycheck template records from the database.</summary>
        public async Task<ActionResponse<List<PaycheckTemplate>>> GetPaycheckTemplates()
        {
            try
            {
                var templates = await _dbContext.PaycheckTemplates
                    .AsNoTracking()
                    .ToListAsync()
                    .ConfigureAwait(false);
                return new PassingAR<List<PaycheckTemplate>>(templates);
            }
            catch
            {
                return new FailingAR<List<PaycheckTemplate>>("Failed to retrieve paycheck templates from the database.");
            }
        }

        /// <summary>Gets a paycheck template record from the database by ID.</summary>
        public async Task<ActionResponse<PaycheckTemplate>> GetPaycheckTemplateByID(int templateID)
        {
            try
            {
                var template = await _dbContext.PaycheckTemplates
                    .AsNoTracking()
                    .Where(x => x.ID == templateID)
                    .SingleAsync()
                    .ConfigureAwait(false);
                return new PassingAR<PaycheckTemplate>(template);
            }
            catch
            {
                return new FailingAR<PaycheckTemplate>("Failed to retrieve paycheck template from the database.");
            }
        }
        #endregion

        #region UPDATE
        #endregion

        #region DELETE
        #endregion
    }
}

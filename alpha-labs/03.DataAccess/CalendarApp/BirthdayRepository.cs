using alpha_labs._01.Configuration.ActionResponse;
using alpha_labs._02.Models;
using alpha_labs._02.Models.CalendarApp.Birthdays;
using Microsoft.EntityFrameworkCore;

namespace alpha_labs._03.DataAccess.CalendarApp
{
    public interface IBirthdayRepository
    {
        /// <summary>Gets all birthday records for the current calendar year.</summary>
        Task<ActionResponse<List<BirthdayModel>>> GetBirthdays();

        /// <summary>Saves birthday models to the database.</summary>
        Task<ActionResponse> SaveBirthdayModelsToDB(List<BirthdayModel> models);
    }

    public class BirthdayRepository : IBirthdayRepository
    {
        private readonly AlphaLabsDbContext _dbContext;

        public BirthdayRepository(AlphaLabsDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        /// <summary>Gets all birthday records for the current calendar year.</summary>
        public async Task<ActionResponse<List<BirthdayModel>>> GetBirthdays()
        {
            var currentDate = DateTime.Today;

            var startOfYear = new DateTime(currentDate.Year, 1, 1);
            var endOfYear = new DateTime(currentDate.Year, 12, 31);

            try
            {
                var birthdays = await _dbContext.Birthdays
                    .AsNoTracking()
                    .Where(x => x.Date >= startOfYear && x.Date <= endOfYear)
                    .ToListAsync()
                    .ConfigureAwait(false);
                return new PassingAR<List<BirthdayModel>>(birthdays);
            }
            catch
            {
                return new FailingAR<List<BirthdayModel>>("Failed to retrieve birthdays from the database.");
            }
        }

        /// <summary>Saves birthday models to the database.</summary>
        public async Task<ActionResponse> SaveBirthdayModelsToDB(List<BirthdayModel> models)
        {
            try
            {
                foreach (var model in models)
                {
                    _dbContext.Birthdays.Add(model);
                }
                await _dbContext.SaveChangesAsync();
                return new PassingAR();
            }
            catch
            {
                return new FailingAR("Failed to save birthday records to database.");
            }
        }
    }
}

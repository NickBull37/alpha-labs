using alpha_labs._01.Configuration.ActionResponse;
using alpha_labs._02.Models;
using alpha_labs._02.Models.CalendarApp.Holidays;
using Microsoft.EntityFrameworkCore;

namespace alpha_labs._03.DataAccess.CalendarApp
{
    public interface IHolidayRepository
    {
        /// <summary>Gets all holiday records for the current calendar year.</summary>
        Task<ActionResponse<List<HolidayModel>>> GetHolidays();

        /// <summary>Gets all holiday records for the current month.</summary>
        Task<ActionResponse<List<HolidayModel>>> GetHolidaysByMonth(string month);

        /// <summary>Saves holiday models to the database.</summary>
        Task<ActionResponse> SaveHolidayModelsToDB(List<HolidayModel> models);

        /// <summary> </summary>
        Task<ActionResponse<bool>> CheckIfHolidayRecordsExist(string name);

        /// <summary> </summary>
        Task<ActionResponse<bool>> CheckIfHolidayIsActive(string name);

        /// <summary> </summary>
        Task<ActionResponse> UpdateHolidayActiveStatus(string name, bool isActive);
    }

    public class HolidayRepository : IHolidayRepository
    {
        private readonly AlphaLabsDbContext _dbContext;

        public HolidayRepository(AlphaLabsDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        /// <summary>Gets all holiday records for the current calendar year.</summary>
        public async Task<ActionResponse<List<HolidayModel>>> GetHolidays()
        {
            var currentDate = DateTime.Today;
            var startOfYear = new DateTime(currentDate.Year, 1, 1);
            var endOfYear = new DateTime(currentDate.Year, 12, 31);

            try
            {
                var holidays = await _dbContext.Holidays
                    .AsNoTracking()
                    .Where(x => x.Date >= startOfYear && x.Date <= endOfYear)
                    .ToListAsync()
                    .ConfigureAwait(false);
                return new PassingAR<List<HolidayModel>>(holidays);
            }
            catch
            {
                return new FailingAR<List<HolidayModel>>("Failed to retrieve holidays from the database.");
            }
        }

        /// <summary>Gets all holiday records for the current month.</summary>
        public async Task<ActionResponse<List<HolidayModel>>> GetHolidaysByMonth(string month)
        {
            var currentDate = DateTime.Today;
            var startOfYear = new DateTime(currentDate.Year, 1, 1);
            var endOfYear = new DateTime(currentDate.Year, 12, 31);

            try
            {
                var holidays = await _dbContext.Holidays
                    .AsNoTracking()
                    .Where(x => x.MonthName == month && x.Date >= startOfYear && x.Date <= endOfYear)
                    .ToListAsync()
                    .ConfigureAwait(false);
                return new PassingAR<List<HolidayModel>>(holidays);
            }
            catch
            {
                return new FailingAR<List<HolidayModel>>("Failed to retrieve holidays from the database.");
            }
        }

        /// <summary>Saves holiday models to the database.</summary>
        public async Task<ActionResponse> SaveHolidayModelsToDB(List<HolidayModel> models)
        {
            try
            {
                foreach (var model in models)
                {
                    _dbContext.Holidays.Add(model);
                }
                await _dbContext.SaveChangesAsync();
                return new PassingAR();
            }
            catch
            {
                return new FailingAR("Failed to save holiday records to database.");
            }
        }

        /// <summary> </summary>
        public async Task<ActionResponse<bool>> CheckIfHolidayRecordsExist(string name)
        {
            try
            {
                var holiday = await _dbContext.Holidays
                    .AsNoTracking()
                    .Where(x => x.Name == name)
                    .FirstOrDefaultAsync()
                    .ConfigureAwait(false);

                if (holiday is not null)
                {
                    return new PassingAR<bool>(true);
                }
                else
                {
                    return new PassingAR<bool>(false);
                }
            }
            catch
            {
                return new FailingAR<bool>("Failed to check if holiday records exist.");
            }
        }

        /// <summary> </summary>
        public async Task<ActionResponse<bool>> CheckIfHolidayIsActive(string name)
        {
            try
            {
                var holiday = await _dbContext.Holidays
                    .AsNoTracking()
                    .Where(x => x.Name == name)
                    .FirstOrDefaultAsync()
                    .ConfigureAwait(false);

                if (holiday is not null)
                {
                    if (!holiday.IsActive)
                    {
                        return new PassingAR<bool>(false);
                    }
                    return new PassingAR<bool>(true);
                }
                else
                {
                    return new PassingAR<bool>(false);
                }
            }
            catch
            {
                return new FailingAR<bool>("Failed to check if holiday record is active.");
            }
        }

        /// <summary> </summary>
        public async Task<ActionResponse> UpdateHolidayActiveStatus(string name, bool isActive)
        {
            try
            {
                var holidays = await _dbContext.Holidays
                    .Where(x => x.Name == name)
                    .ToListAsync()
                    .ConfigureAwait(false);

                foreach (var holiday in holidays)
                {
                    holiday.IsActive = isActive;
                    _dbContext.Holidays.Add(holiday);
                }

                await _dbContext.SaveChangesAsync();
                return new PassingAR();
            }
            catch
            {
                return new FailingAR("Failed to retrieve holidays from the database.");
            }
        }
    }
}

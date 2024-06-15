using alpha_labs._01.Configuration.ActionResponse;
using alpha_labs._02.Models.BudgetApp.Paychecks;
using alpha_labs._03.DataAccess.BudgetApp;
using alpha_labs._06.Controllers.BudgetApp.Paychecks;

namespace alpha_labs._04.Services.BudgetApp
{
    public interface IPaycheckService
    {
        /// <summary>Creates a new paycheck model entity.</summary>
        Paycheck CreatePaycheckEntity(PaycheckTemplate template);

        /// <summary>Creates a new paycheck template model entity.</summary>
        PaycheckTemplate CreatePaycheckTemplateEntity(CreatePaycheckTemplateRequest request);

        /// <summary>Filters out any paycheck templates that already have a paycheck created for the current month.</summary>
        Task<ActionResponse<List<PaycheckTemplate>>> FilterPaycheckTemplates(List<PaycheckTemplate> templates);
    }

    public class PaycheckService : IPaycheckService
    {
        private readonly IPaycheckRepository _paycheckRepository;

        public PaycheckService(IPaycheckRepository paycheckRepository)
        {
            _paycheckRepository = paycheckRepository;
        }

        /// <summary>Creates a new paycheck model entity.</summary>
        public Paycheck CreatePaycheckEntity(PaycheckTemplate template)
        {
            var currentDate = DateTime.Today;
            var currentMonth = currentDate.Month;
            var currentYear = currentDate.Year;
            var depositDate = new DateTime(currentYear, currentMonth, template.PayDay);

            return new Paycheck
            {
                Employer = template.Employer,
                PayDay = template.PayDay,
                DepositDate = depositDate,
                DepositDateFormatted = depositDate.ToString("M/d/yy"),
                Amount = template.Amount,
                Description = template.Description,
                CreatedDate = DateTime.Now,
                UpdatedDate = null,
            };
        }

        /// <summary>Creates a new paycheck template model entity.</summary>
        public PaycheckTemplate CreatePaycheckTemplateEntity(CreatePaycheckTemplateRequest request)
        {
            return new PaycheckTemplate
            {
                Employer = request.Employer,
                PayDay = request.PayDay,
                Amount = request.Amount,
                Description = request.Description,
                CreatedDate = DateTime.Now,
                UpdatedDate = null,
                IsActive = true,
            };
        }

        /// <summary>Filters out any paycheck templates that already have a paycheck created for the current month.</summary>
        public async Task<ActionResponse<List<PaycheckTemplate>>> FilterPaycheckTemplates(List<PaycheckTemplate> templates)
        {
            var paychecksResponse = await _paycheckRepository.GetPaychecks();
            if (!paychecksResponse.IsSuccess)
            {
                return new FailingAR<List<PaycheckTemplate>>(paychecksResponse.ErrorMessage!);
            }
            var paychecks = paychecksResponse.Content!;

            List<PaycheckTemplate> unmatchedTemplates = [];
            unmatchedTemplates = templates
                .Where(template => !paychecks
                    .Any(paycheck => paycheck.Amount == template.Amount
                        && paycheck.Employer == template.Employer
                        && paycheck.Description == template.Description)).ToList();

            return new PassingAR<List<PaycheckTemplate>>(unmatchedTemplates);
        }
    }
}

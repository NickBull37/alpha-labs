using alpha_labs._01.Configuration.ActionResponse;
using alpha_labs._02.Models.BudgetApp.Paychecks;
using alpha_labs._03.DataAccess.BudgetApp;
using alpha_labs._04.Services.BudgetApp;
using alpha_labs._06.Controllers.BudgetApp.Paychecks;

namespace alpha_labs._05.Workflows.BudgetApp
{
    public interface IPaycheckWorkflow
    {
        /// <summary>Workflow for the [paycheck/get-paychecks] endpoint.</summary>
        Task<ActionResponse<List<Paycheck>>> ExecGetPaychecks();

        /// <summary>Workflow for the [paycheck/templates] endpoint.</summary>
        Task<ActionResponse<List<PaycheckTemplate>>> ExecGetPaycheckTemplates();

        /// <summary>Workflow for the [paycheck/create-paycheck-template] endpoint.</summary>
        Task<ActionResponse> ExecCreatePaycheckTemplate(CreatePaycheckTemplateRequest request);

        /// <summary>Workflow for the [paycheck/log-paycheck/{TemplateID}] endpoint.</summary>
        Task<ActionResponse> ExecLogPaycheck(int templateID);
    }

    public class PaycheckWorkflow : IPaycheckWorkflow
    {
        private readonly IPaycheckRepository _paycheckRepository;
        private readonly IPaycheckService _paycheckService;

        public PaycheckWorkflow(IPaycheckRepository paycheckRepository, IPaycheckService paycheckService)
        {
            _paycheckRepository = paycheckRepository;
            _paycheckService = paycheckService;
        }

        /// <summary>Workflow for the [paycheck/get-paychecks] endpoint.</summary>
        public async Task<ActionResponse<List<Paycheck>>> ExecGetPaychecks()
        {
            return await _paycheckRepository.GetPaychecks();
        }

        /// <summary>Workflow for the [fund/templates] endpoint.</summary>
        public async Task<ActionResponse<List<PaycheckTemplate>>> ExecGetPaycheckTemplates()
        {
            // Step 1. Get paycheck templates
            var templatesResponse = await _paycheckRepository.GetPaycheckTemplates();
            if (!templatesResponse.IsSuccess)
            {
                return new FailingAR<List<PaycheckTemplate>>(templatesResponse.ErrorMessage!);
            }

            // Step 2. Filter out paychecks that do not have a record for current month
            var unmatchedTemplatesResponse = await _paycheckService.FilterPaycheckTemplates(templatesResponse.Content!);
            if (!unmatchedTemplatesResponse.IsSuccess)
            {
                return new FailingAR<List<PaycheckTemplate>>(unmatchedTemplatesResponse.ErrorMessage!);
            }
            return new PassingAR<List<PaycheckTemplate>>(unmatchedTemplatesResponse.Content!);
        }

        /// <summary>Workflow for the [paycheck/create-paycheck-template] endpoint.</summary>
        public async Task<ActionResponse> ExecCreatePaycheckTemplate(CreatePaycheckTemplateRequest request)
        {
            var paycheckTemplate = _paycheckService.CreatePaycheckTemplateEntity(request);
            return await _paycheckRepository.SavePaycheckTemplateToDB(paycheckTemplate);
        }

        /// <summary>Workflow for the [paycheck/log-paycheck/{TemplateID}] endpoint.</summary>
        public async Task<ActionResponse> ExecLogPaycheck(int templateID)
        {
            // Step 1. Get paycheck template from database
            var templateResponse = await _paycheckRepository.GetPaycheckTemplateByID(templateID);
            if (!templateResponse.IsSuccess)
            {
                return new FailingAR(templateResponse.ErrorMessage!);
            }
            // Step 2. Create paycheck model using paycheck template
            var paycheck = _paycheckService.CreatePaycheckEntity(templateResponse.Content!);
            // Step 3. Save paycheck model to database
            return await _paycheckRepository.SavePaycheckToDB(paycheck);
        }
    }
}

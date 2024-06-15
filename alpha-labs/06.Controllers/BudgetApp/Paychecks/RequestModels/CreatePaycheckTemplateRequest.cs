using System.ComponentModel.DataAnnotations;

namespace alpha_labs._06.Controllers.BudgetApp.Paychecks
{
    public class CreatePaycheckTemplateRequest
    {
        [Required]
        public string Employer { get; set; } = string.Empty;

        [Required]
        public int PayDay { get; set; }

        [Required]
        public decimal Amount { get; set; }

        [Required]
        public string Description { get; set; } = string.Empty;
    }
}

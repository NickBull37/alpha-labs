using System.ComponentModel.DataAnnotations;

namespace alpha_labs._06.Controllers.BudgetApp.Funds
{
    public class CreateFundRequest
    {
        [Required]
        public string Name { get; set; } = string.Empty;
    }
}

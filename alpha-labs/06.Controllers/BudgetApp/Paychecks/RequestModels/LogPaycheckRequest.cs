using System.ComponentModel.DataAnnotations;

namespace alpha_labs._06.Controllers.BudgetApp.Paychecks
{
    public class LogPaycheckRequest
    {
        [Required]
        public int PaycheckNumber { get; set; }
    }
}

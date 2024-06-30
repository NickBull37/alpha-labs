using System.ComponentModel.DataAnnotations;

namespace alpha_labs._06.Controllers.BudgetApp.Funds
{
    public class DepositFundsRequest
    {
        public IEnumerable<FundDeposit> FundDeposits { get; set; } = [];
    }

    public class FundDeposit
    {
        [Required]
        public int FundId { get; set; }

        [Required]
        public decimal Amount { get; set; }
    }
}

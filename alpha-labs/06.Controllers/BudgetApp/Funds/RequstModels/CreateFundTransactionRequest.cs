namespace alpha_labs._06.Controllers.BudgetApp.Funds
{
    /// <summary>The request object for creating a fund transaction entity.</summary>
    public class CreateFundTransactionRequest
    {
        public int FundID { get; set; }

        public decimal Amount { get; set; }
    }
}

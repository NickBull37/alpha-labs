using System.ComponentModel.DataAnnotations;

namespace alpha_labs._06.Controllers.BudgetApp.Bills
{
    public class DeleteBillsRequest
    {
        [Required]
        public int[] BillIDs { get; set; } = [];
    }
}

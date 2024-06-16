using alpha_labs._02.Models.BudgetApp.Bills;
using alpha_labs._02.Models.BudgetApp.Funds;
using alpha_labs._02.Models.BudgetApp.Paychecks;
using alpha_labs._02.Models.BudgetApp.Purchases;
using alpha_labs._02.Models.BudgetApp.Transactions;
using alpha_labs._02.Models.CalendarApp.Birthdays;
using Microsoft.EntityFrameworkCore;

namespace alpha_labs._02.Models
{
    public class AlphaLabsDbContext : DbContext
    {
        public AlphaLabsDbContext(DbContextOptions<AlphaLabsDbContext> options) : base(options)
        {
        }

        #region BudgetApp
        public DbSet<Bill> Bills { get; set; }
        public DbSet<BillTemplate> BillTemplates { get; set; }
        public DbSet<Fund> Funds { get; set; }
        public DbSet<FundTransaction> FundTransactions { get; set; }
        public DbSet<Purchase> Purchases { get; set; }
        public DbSet<Paycheck> Paychecks { get; set; }
        public DbSet<PaycheckTemplate> PaycheckTemplates { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        #endregion

        #region CalendarApp
        public DbSet<BirthdayModel> Birthdays { get; set; }
        #endregion

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //Configure domain classes using modelBuilder here..
            base.OnModelCreating(modelBuilder);

            // Iterate through all entity types
            foreach (var entityType in modelBuilder.Model.GetEntityTypes())
            {
                // Iterate through all foreign keys for each entity type
                foreach (var foreignKey in entityType.GetForeignKeys())
                {
                    // Set the DeleteBehavior to Restrict (no cascade on delete)
                    foreignKey.DeleteBehavior = DeleteBehavior.Restrict;
                }
            }
        }
    }
}

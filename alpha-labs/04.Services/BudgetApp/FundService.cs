﻿using alpha_labs._01.Configuration.ActionResponse;
using alpha_labs._02.Models.BudgetApp.Funds;
using alpha_labs._02.Models.BudgetApp.Paychecks;
using alpha_labs._02.Models.BudgetApp.Transactions;
using alpha_labs._03.DataAccess.BudgetApp;
using alpha_labs._06.Controllers.BudgetApp.Funds;

namespace alpha_labs._04.Services.BudgetApp
{
    public interface IFundService
    {
        /// <summary>Creates a new fund model entity.</summary>
        Fund CreateFundEntity(CreateFundRequest request);

        /// <summary>Creates a new fund transaction model entity.</summary>
        FundTransaction CreateFundTransactionEntity(CreateFundTransactionRequest request, Fund fund);

        /// <summary>Creates a new fund report model entity.</summary>
        Task<ActionResponse<FundReportResponse>> CreateFundReportEntity(
            List<Fund> funds,
            List<Paycheck> paychecks,
            List<FundTransaction> fundTransactions,
            List<Transaction> transactions);
    }

    public class FundService : IFundService
    {
        private readonly IBillRepository _billRepository;
        private readonly IPaycheckRepository _paycheckRepository;
        private readonly IPurchaseRepository _purchaseRepository;

        public FundService(IBillRepository billRepository, IPaycheckRepository paycheckRepository, IPurchaseRepository purchaseRepository)
        {
            _billRepository = billRepository;
            _paycheckRepository = paycheckRepository;
            _purchaseRepository = purchaseRepository;
        }

        /// <summary>Creates a new fund model entity.</summary>
        public Fund CreateFundEntity(CreateFundRequest request)
        {
            return new Fund
            {
                Name = request.Name,
                Balance = 0m,
                DepositCount = 0,
                CreatedDate = DateTime.Now,
                UpdatedDate = null,
                IsActive = true,
            };
        }

        /// <summary>Creates a new fund transaction model entity.</summary>
        public FundTransaction CreateFundTransactionEntity(CreateFundTransactionRequest request, Fund fund)
        {
            return new FundTransaction
            {
                Date = DateTime.Now,
                DateFormatted = DateTime.Now.ToString("M/d/yy"),
                Amount = request.Amount,
                NewBalance = fund.Balance + request.Amount,
                Type = "FundDeposit",
                FundName = fund.Name,
                Description = $"Depositing funds into {fund.Name}",
                CreatedDate = DateTime.Now,
                UpdatedDate = null
            };
        }

        /// <summary>Creates a new fund report model entity.</summary>
        public async Task<ActionResponse<FundReportResponse>> CreateFundReportEntity(
            List<Fund> funds,
            List<Paycheck> paychecks,
            List<FundTransaction> fundTransactions,
            List<Transaction> transactions)
        {
            var templatesResponse = await _paycheckRepository.GetPaycheckTemplates();
            if (!templatesResponse.IsSuccess)
            {
                return new FailingAR<FundReportResponse>(templatesResponse.ErrorMessage!);
            }
            var purchaseResponse = await _purchaseRepository.GetPurchases();
            if (!purchaseResponse.IsSuccess)
            {
                return new FailingAR<FundReportResponse>(purchaseResponse.ErrorMessage!);
            }
            var billResponse = await _billRepository.GetBills();
            if (!billResponse.IsSuccess)
            {
                return new FailingAR<FundReportResponse>(billResponse.ErrorMessage!);
            }

            var totalTransactionIncome = transactions.Select(x => x.Amount).Sum();
            var totalMonthlyIncome = templatesResponse.Content!.Select(x => x.Amount).Sum() + totalTransactionIncome;
            var totalSpending = purchaseResponse.Content!.Select(x => x.Amount).Sum() + billResponse.Content!.Select(x => x.Amount).Sum();

            List<SavingsTableRecord> records = [];
            foreach (var paycheck in paychecks)
            {
                var newRecord = ConvertPaycheckToFundTableRecord(paycheck);
                records.Add(newRecord);
            }
            foreach (var fundTransaction in fundTransactions)
            {
                var newRecord = ConvertFundTransactionToFundTableRecord(fundTransaction);
                records.Add(newRecord);
            }
            foreach (var transaction in transactions)
            {
                var newRecord = ConvertTransactionToFundTableRecord(transaction);
                records.Add(newRecord);
            }

            var reportResponse = new FundReportResponse
            {
                TotalMonthlyIncome = totalMonthlyIncome,
                CurrentMonthlySavings = totalMonthlyIncome - totalSpending,
                CombinedFundTotal = funds.Select(x => x.Balance).Sum(),
                PaycheckCount = paychecks.Count,
                PaycheckTemplateCount = templatesResponse.Content!.Count,
                FundList = funds,
                TableRecords = records.OrderBy(x => x.Date),
            };

            return new PassingAR<FundReportResponse>(reportResponse);
        }

        #region Private Methods
        private static SavingsTableRecord ConvertFundTransactionToFundTableRecord(FundTransaction transaction)
        {
            return new SavingsTableRecord
            {
                Date = transaction.DateFormatted,
                Type = "FundUpdate",
                Category = transaction.FundName,
                Description = transaction.Description,
                Amount = transaction.Amount,
                Balance = transaction.NewBalance,
                FundElementID = transaction.ID,
                FundElementType = "fundTransaction"
            };
        }

        private static SavingsTableRecord ConvertPaycheckToFundTableRecord(Paycheck paycheck)
        {
            return new SavingsTableRecord
            {
                Date = paycheck.DepositDateFormatted,
                Type = "Paycheck",
                Category = paycheck.Employer,
                Description = paycheck.Description,
                Amount = paycheck.Amount,
                Balance = null,
                FundElementID = paycheck.ID,
                FundElementType = "paycheck"
            };
        }

        private static SavingsTableRecord ConvertTransactionToFundTableRecord(Transaction transaction)
        {
            return new SavingsTableRecord
            {
                Date = transaction.TransactionDateFormatted,
                Type = "Transaction",
                Category = transaction.Type,
                Description = transaction.Description,
                Amount = transaction.Amount,
                Balance = null,
                FundElementID = transaction.ID,
                FundElementType = "transaction"
            };
        }
        #endregion
    }
}

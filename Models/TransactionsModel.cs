using System.ComponentModel.DataAnnotations;
using System.Transactions;

namespace PaydayCashTime.Models
{
    public class TransactionsModel
    {
        public Guid Id { get; set; }
        public DateTime? TransactionDate { get; set; }
        public string? Description { get; set; }
        public decimal? TransactionValue { get; set; }
        public PayMethod? PayMethod { get; set; }
        public TransactionType ExitJoin { get; set; }
        public bool HaveInstallments { get; set; }
        public int? TotalInstallments { get; set; }
        public string? WhoDid { get; set; }

    }

    public enum TransactionType
    {
        Income = 1,
        Expense = 2
    }

    public enum PayMethod
    {
        Cash = 1,
        Debit = 2,
        Credit = 3,
        Transfer = 4,
    }

    public class TransactionRequest
    {
        [Required]
        public DateTime? TransactionDate { get; set; }
        [Required]
        public string? Description { get; set; }
        [Required]
        public decimal? TransactionValue { get; set; }
        [Required]
        public PayMethod? PayMethod { get; set; }
        [Required]
        public TransactionType ExitJoin { get; set; }
        [Required]
        public bool HaveInstallments { get; set; }
        [Required]
        public int? TotalInstallments { get; set; }
        [Required]
        public string? WhoDid { get; set; }
    }

    public class UpdateTransactions
    {
        public DateTime? TransactionDate { get; set; }
        public string? Description { get; set; }
        public decimal? TransactionValue { get; set; }
        public PayMethod? PayMethod { get; set; }
        public TransactionType ExitJoin { get; set; }
        public bool HaveInstallments { get; set; }
        public int? TotalInstallments { get; set; }
        public string? WhoDid { get; set; }
    }
}

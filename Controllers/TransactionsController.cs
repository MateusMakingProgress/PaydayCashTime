using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PaydayCashTime.Data;
using PaydayCashTime.Models;
using System.Transactions;

namespace PaydayCashTime.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionsController : Controller
    {
        public readonly DataContext _context;
        public TransactionsController(DataContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<List<TransactionsModel>>> Add([FromBody] TransactionRequest transactionsRequest)
        {
            var newTransaction = new TransactionsModel
            {
                Id = Guid.NewGuid(),
                TransactionDate = transactionsRequest.TransactionDate,
                Description = transactionsRequest.Description,
                TransactionValue = transactionsRequest.TransactionValue,
                PayMethod = transactionsRequest.PayMethod,
                HaveInstallments = transactionsRequest.HaveInstallments,
                TotalInstallments = transactionsRequest.TotalInstallments,
                WhoDid = transactionsRequest.WhoDid,
            };
            _context.Transactions.Add(newTransaction);
            await _context.SaveChangesAsync();
            return Ok(await _context.Transactions.ToListAsync());
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<List<TransactionsModel>>> Update(Guid? id, [FromBody] UpdateTransactions updateTransactions)
        {
            TransactionsModel? transactions = await _context.Transactions.FindAsync(id);

            if (id == null)
                return NotFound();
            
            transactions.TransactionDate = updateTransactions.TransactionDate;
            transactions.Description = updateTransactions.Description;
            transactions.TransactionValue = updateTransactions.TransactionValue;
            transactions.PayMethod = updateTransactions.PayMethod;
            transactions.HaveInstallments = updateTransactions.HaveInstallments;
            transactions.TotalInstallments = updateTransactions.TotalInstallments;
            transactions.WhoDid = updateTransactions.WhoDid;
            
            await _context.SaveChangesAsync();
            return Ok(await _context.Transactions.ToListAsync());
        }

        [HttpGet]
        public async Task<ActionResult<List<TransactionsModel>>> GetAll()
        {
            return Ok(await _context.Transactions.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(Guid id)
        {
            var transaction = await _context.Transactions.FindAsync(id);

            if (transaction == null)
                return NotFound();

            _context.Transactions.Remove(transaction);

            await _context.SaveChangesAsync();

            return Ok(await _context.Transactions.ToListAsync());
        }
    }
}

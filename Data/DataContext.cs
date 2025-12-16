using Microsoft.EntityFrameworkCore;
using PaydayCashTime.Models;

namespace PaydayCashTime.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {   }

        public DbSet<UsersModel> Users { get; set; }
        public DbSet<TransactionsModel> Transactions { get; set; }
    }
}

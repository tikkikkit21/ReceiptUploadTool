using Microsoft.EntityFrameworkCore;

namespace ReceiptAPI.Models;

public class Context : DbContext
{
    public Context(DbContextOptions<Context> options)
        : base(options)
    {
    }

    public DbSet<Receipt> Receipts { get; set; } = null!;
}

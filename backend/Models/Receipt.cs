namespace ReceiptAPI.Models;

public class Receipt
{
    public long Id { get; set; }
    public DateTime Date { get; set; }
    public double Amount { get; set; } = 0.0;
    public string Description { get; set; } = "";
    public IFormFile Photo { get; set; }
}

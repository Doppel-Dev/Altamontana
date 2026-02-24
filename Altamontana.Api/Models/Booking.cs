namespace Altamontana.Api.Models;

public class Booking
{
    public int Id { get; set; }
    public int ExperienceId { get; set; }
    public Experience? Experience { get; set; }
    public string CustomerName { get; set; } = string.Empty;
    public string CustomerEmail { get; set; } = string.Empty;
    public DateTime BookingDate { get; set; }
    public int Participants { get; set; }
    public decimal TotalPrice { get; set; }
    public string Status { get; set; } = "Pending"; // Pending, Confirmed, Cancelled
}

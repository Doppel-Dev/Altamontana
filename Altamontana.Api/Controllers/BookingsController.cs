using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Altamontana.Api.Data;
using Altamontana.Api.Models;
using Microsoft.AspNetCore.Authorization;

namespace Altamontana.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BookingsController : ControllerBase
{
    private readonly AppDbContext _context;

    public BookingsController(AppDbContext context)
    {
        _context = context;
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Booking>>> GetBookings()
    {
        return await _context.Bookings.ToListAsync();
    }

    [HttpPost]
    public async Task<ActionResult<Booking>> PostBooking(Booking booking)
    {
        booking.BookingDate = DateTime.UtcNow;
        _context.Bookings.Add(booking);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(PostBooking), new { id = booking.Id }, booking);
    }
}

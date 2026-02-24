using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Altamontana.Api.Data;
using Altamontana.Api.Models;
using Microsoft.AspNetCore.Authorization;

namespace Altamontana.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SiteContentController : ControllerBase
{
    private readonly AppDbContext _context;

    public SiteContentController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<SiteContent>>> GetContent()
    {
        return await _context.SiteContents.ToListAsync();
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<SiteContent>> PostContent(SiteContent content)
    {
        _context.SiteContents.Add(content);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetContent), new { id = content.Id }, content);
    }

    [Authorize]
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateContent(int id, SiteContent content)
    {
        if (id != content.Id) return BadRequest();
        _context.Entry(content).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return NoContent();
    }
}

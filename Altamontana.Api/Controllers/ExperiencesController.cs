using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Altamontana.Api.Data;
using Altamontana.Api.Models;
using Microsoft.AspNetCore.Authorization;

namespace Altamontana.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ExperiencesController : ControllerBase
{
    private readonly AppDbContext _context;

    public ExperiencesController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Experience>>> GetExperiences()
    {
        return await _context.Experiences.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Experience>> GetExperience(int id)
    {
        var experience = await _context.Experiences.FindAsync(id);

        if (experience == null)
        {
            return NotFound();
        }

        return experience;
    }

    [Authorize]
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateExperience(int id, Experience experience)
    {
        if (id != experience.Id)
        {
            return BadRequest();
        }

        _context.Entry(experience).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!ExperienceExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    [Authorize]
    [HttpPost("upload")]
    public async Task<IActionResult> UploadImage(IFormFile file)
    {
        if (file == null || file.Length == 0)
            return BadRequest("No se seleccionó ningún archivo.");

        var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
        
        // Creamos la ruta física absoluta a wwwroot/uploads
        var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
        if (!Directory.Exists(uploadsFolder))
        {
            Directory.CreateDirectory(uploadsFolder);
        }

        var path = Path.Combine(uploadsFolder, fileName);

        using (var stream = new FileStream(path, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }

        // Devolvemos la URL relativa que se servirá por app.UseStaticFiles()
        // El frontend la recibirá como /uploads/xxxx.jpg
        return Ok(new { url = $"/uploads/{fileName}" });
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<Experience>> CreateExperience(Experience experience)
    {
        _context.Experiences.Add(experience);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetExperience), new { id = experience.Id }, experience);
    }

    [Authorize]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteExperience(int id)
    {
        var experience = await _context.Experiences.FindAsync(id);
        if (experience == null)
        {
            return NotFound();
        }

        _context.Experiences.Remove(experience);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool ExperienceExists(int id)
    {
        return _context.Experiences.Any(e => e.Id == id);
    }
}

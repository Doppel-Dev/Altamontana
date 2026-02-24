using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Altamontana.Api.Data;
using Altamontana.Api.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Altamontana.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _configuration;

    public AuthController(AppDbContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    [Authorize]
    [HttpGet("profile")]
    public IActionResult GetProfile()
    {
        var username = User.Identity?.Name;
        var user = _context.Users.FirstOrDefault(u => u.Username == username);
        if (user == null) return NotFound();

        return Ok(new { user.Username, user.RecoveryEmail });
    }

    [Authorize]
    [HttpPut("update-profile")]
    public IActionResult UpdateProfile([FromBody] UpdateProfileDto dto)
    {
        var currentUsername = User.Identity?.Name;
        var user = _context.Users.FirstOrDefault(u => u.Username == currentUsername);
        if (user == null) return NotFound();

        // Validar si el nuevo username ya existe (y no es el del propio usuario)
        if (user.Username != dto.NewUsername && _context.Users.Any(u => u.Username == dto.NewUsername))
        {
            return BadRequest("El nombre de usuario ya está en uso");
        }

        user.Username = dto.NewUsername;
        user.RecoveryEmail = dto.NewEmail;

        if (!string.IsNullOrEmpty(dto.NewPassword))
        {
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);
        }

        _context.SaveChanges();

        // Generar un nuevo token por si cambió el username
        var token = GenerateJwtToken(user);
        return Ok(new { token, message = "Perfil actualizado correctamente" });
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginDto loginDto)
    {
        var user = _context.Users.FirstOrDefault(u => u.Username == loginDto.Username);

        if (user == null || !BCrypt.Net.BCrypt.Verify(loginDto.Password, user.PasswordHash))
        {
            return Unauthorized("Usuario o contraseña incorrectos");
        }

        var token = GenerateJwtToken(user);
        return Ok(new { token });
    }

    private string GenerateJwtToken(User user)
    {
        var jwtSettings = _configuration.GetSection("JwtSettings");
        var key = Encoding.ASCII.GetBytes(jwtSettings["Key"] ?? "super_secret_key_that_is_long_enough_for_sha256_12345");

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, user.Role),
                new Claim("id", user.Id.ToString())
            }),
            Expires = DateTime.UtcNow.AddDays(7),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
            Issuer = jwtSettings["Issuer"],
            Audience = jwtSettings["Audience"]
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
}

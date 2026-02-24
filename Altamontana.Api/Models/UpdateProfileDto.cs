namespace Altamontana.Api.Models;

public class UpdateProfileDto
{
    public string NewUsername { get; set; } = string.Empty;
    public string NewEmail { get; set; } = string.Empty;
    public string? NewPassword { get; set; } // Opcional
}

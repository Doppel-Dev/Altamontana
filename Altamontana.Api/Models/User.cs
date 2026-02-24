namespace Altamontana.Api.Models;

public class User
{
    public int Id { get; set; }
    public string Username { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public string RecoveryEmail { get; set; } = string.Empty;
    public string Role { get; set; } = "Admin";
}

namespace Septos.Api.Models;

public class Experience
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string ImageUrl { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public string Duration { get; set; } = string.Empty;
}

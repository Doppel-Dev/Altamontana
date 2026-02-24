using Microsoft.AspNetCore.Mvc;
using System.Text;
using System.Text.Json;
using System.Net;
using System.Net.Http.Headers;
using Altamontana.Api.Models;

namespace Altamontana.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WebpayController : ControllerBase
{
    private static readonly HttpClient _httpClient = new HttpClient();
    
    private const string CommerceCode = "597055555532";
    private const string ApiKey = "579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C";
    private const string BaseUrl = "https://webpay3gint.transbank.cl/rswebpaytransaction/api/webpay/v1.2/transactions";

    [HttpPost("create")]
    public async Task<IActionResult> Create([FromBody] BookingRequest request)
    {
        if (request == null || request.Amount <= 0) 
            return BadRequest(new { message = "Monto inválido" });

        var payload = new
        {
            buy_order = "ORD" + new Random().Next(100000, 999999),
            session_id = "SES" + new Random().Next(100000, 999999),
            amount = (int)Math.Round(request.Amount),
            return_url = "https://altamontana-production.up.railway.app/api/webpay/return"
        };

        string jsonPayload = JsonSerializer.Serialize(payload);

        // CONFIGURACIÓN DE LA PETICIÓN
        using var requestMessage = new HttpRequestMessage(HttpMethod.Post, BaseUrl);
        
        // FORZAR HTTP/1.1 (Crítico para Transbank en .NET moderno)
        requestMessage.Version = HttpVersion.Version11;
        requestMessage.VersionPolicy = HttpVersionPolicy.RequestVersionExact;

        // ENCABEZADOS
        requestMessage.Headers.Clear();
        requestMessage.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        requestMessage.Headers.Add("User-Agent", "AltamontanaApi/1.0");
        requestMessage.Headers.TryAddWithoutValidation("Tbk-Api-Key-Id", CommerceCode);
        requestMessage.Headers.TryAddWithoutValidation("Tbk-Api-Key-Secret", ApiKey);
        
        // CONTENIDO (Sin charset para evitar conflictos)
        var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");
        content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
        requestMessage.Content = content;

        try
        {
            var response = await _httpClient.SendAsync(requestMessage);
            var jsonString = await response.Content.ReadAsStringAsync();
            
            if (response.IsSuccessStatusCode)
            {
                using var doc = JsonDocument.Parse(jsonString);
                return Ok(new { 
                    token = doc.RootElement.GetProperty("token").GetString(), 
                    url = doc.RootElement.GetProperty("url").GetString() 
                });
            }

            return BadRequest(new { 
                error = "Transbank Rejected", 
                status = (int)response.StatusCode,
                detail = jsonString 
            });
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = "Connection Error", message = ex.Message });
        }
    }

    [HttpPost("return")]
    public IActionResult ReturnForm([FromForm] string? token_ws, [FromForm] string? TBK_TOKEN)
    {
        var token = token_ws ?? TBK_TOKEN;
        return Redirect($"https://xn--altamontaachile-7qb.com/payment-status?token_ws={token}");
    }

    [HttpGet("return")]
    public IActionResult ReturnGet([FromQuery] string? token_ws, [FromQuery] string? TBK_TOKEN)
    {
        var token = token_ws ?? TBK_TOKEN;
        return Redirect($"https://xn--altamontaachile-7qb.com/payment-status?token_ws={token}");
    }

    [HttpGet("commit")]
    public async Task<IActionResult> Commit([FromQuery] string token_ws)
    {
        if (string.IsNullOrEmpty(token_ws)) return BadRequest("Token requerido");

        using var requestMessage = new HttpRequestMessage(HttpMethod.Put, $"{BaseUrl}/{token_ws}");
        requestMessage.Version = HttpVersion.Version11;
        requestMessage.VersionPolicy = HttpVersionPolicy.RequestVersionExact;

        requestMessage.Headers.Clear();
        requestMessage.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        requestMessage.Headers.Add("User-Agent", "AltamontanaApi/1.0");
        requestMessage.Headers.TryAddWithoutValidation("Tbk-Api-Key-Id", CommerceCode);
        requestMessage.Headers.TryAddWithoutValidation("Tbk-Api-Key-Secret", ApiKey);
        
        var content = new StringContent("", Encoding.UTF8, "application/json");
        content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
        requestMessage.Content = content;

        try
        {
            var response = await _httpClient.SendAsync(requestMessage);
            var jsonString = await response.Content.ReadAsStringAsync();
            
            if (response.IsSuccessStatusCode)
            {
                return Ok(JsonSerializer.Deserialize<JsonElement>(jsonString));
            }

            return BadRequest(new { error = "Commit Failed", detail = jsonString });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    public class BookingRequest 
    { 
        public int ExperienceId { get; set; }
        public decimal Amount { get; set; } 
    }
}


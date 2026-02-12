using Microsoft.EntityFrameworkCore;
using Septos.Api.Models;

namespace Septos.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Experience> Experiences { get; set; }
    public DbSet<Booking> Bookings { get; set; }
    public DbSet<SiteContent> SiteContents { get; set; }
    public DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Seed Admin User
        modelBuilder.Entity<User>().HasData(
            new User 
            { 
                Id = 1, 
                Username = "admin", 
                // Password: admin123
                PasswordHash = "$2a$11$TWDy2qtT4iQfbrzV5nBe8egaklANcAA86fLp/dH2ccDEsQ9U5Rr5m",
                RecoveryEmail = "admin@septos.cl"
            }
        );
        
        modelBuilder.Entity<SiteContent>().HasData(
            // Home Page
            new SiteContent { Id = 1, Key = "home_hero_title_light", Value = "Santiago desde el Aire" },
            new SiteContent { Id = 2, Key = "home_hero_title_dark", Value = "Misiones de Alta Montaña" },
            new SiteContent { Id = 3, Key = "home_hero_sub", Value = "Líderes en transporte aéreo privado y tours escénicos en helicóptero por Chile." },
            new SiteContent { Id = 4, Key = "home_hero_img_light", Value = "/img/oliver-bornhauser-KnS5l6TZjAs-unsplash.jpg" },
            new SiteContent { Id = 5, Key = "home_hero_img_dark", Value = "/img/richard-felix-Y79GKs-dwz4-unsplash.jpg" },
            
            // Home Features
            new SiteContent { Id = 25, Key = "home_feat1_title", Value = "{\"es\":\"Flota Moderna\",\"en\":\"Modern Fleet\",\"pt\":\"Frota Moderna\"}" },
            new SiteContent { Id = 26, Key = "home_feat1_desc", Value = "{\"es\":\"Aeronaves Airbus y Bell mantenidas bajo estándares de excelencia.\",\"en\":\"Airbus and Bell aircraft maintained under excellence standards.\",\"pt\":\"Aeronaves Airbus e Bell mantidas sob padrões de excelência.\"}" },
            new SiteContent { Id = 27, Key = "home_feat2_title", Value = "{\"es\":\"Pilotos Expertos\",\"en\":\"Expert Pilots\",\"pt\":\"Pilotos Especialistas\"}" },
            new SiteContent { Id = 28, Key = "home_feat2_desc", Value = "{\"es\":\"Comandantes con miles de horas de vuelo en montaña y ciudad.\",\"en\":\"Commanders with thousands of flight hours in mountains and cities.\",\"pt\":\"Comandantes com milhares de horas de voo em montanhas e cidades.\"}" },
            new SiteContent { Id = 29, Key = "home_feat3_title", Value = "{\"es\":\"Lujo Exclusivo\",\"en\":\"Exclusive Luxury\",\"pt\":\"Luxo Exclusivo\"}" },
            new SiteContent { Id = 30, Key = "home_feat3_desc", Value = "{\"es\":\"Experiencias personalizadas con catering y servicio premium.\",\"en\":\"Personalized experiences with catering and premium service.\",\"pt\":\"Experiências personalizadas com catering e serviço premium.\"}" },
            
            // FAQ Page
            new SiteContent { Id = 6, Key = "faq_title", Value = "Seguridad & FAQ" },
            new SiteContent { Id = 7, Key = "faq_sub", Value = "Respuestas para su tranquilidad." },
            
            new SiteContent { Id = 10, Key = "faq_q1", Value = "¿Es seguro reservar con Septos?" },
            new SiteContent { Id = 11, Key = "faq_a1", Value = "Sí, utilizamos protocolos de seguridad de estándar bancario y todos nuestros guías están certificados internacionalmente." },
            new SiteContent { Id = 12, Key = "faq_q2", Value = "¿Cómo recibo mi voucher?" },
            new SiteContent { Id = 13, Key = "faq_a2", Value = "El voucher digital se envía automáticamente a su correo tras confirmar el pago." },
            new SiteContent { Id = 14, Key = "faq_q3", Value = "¿Qué incluye el seguro?" },
            new SiteContent { Id = 15, Key = "faq_a3", Value = "Nuestras experiencias incluyen seguro de accidentes personales básico durante toda la actividad." },
            new SiteContent { Id = 16, Key = "faq_q4", Value = "¿Política de cancelación?" },
            new SiteContent { Id = 17, Key = "faq_a4", Value = "Cancelación 100% gratuita con más de 72 horas de anticipación." },
            
            // Contact Page
            new SiteContent { Id = 8, Key = "contact_title", Value = "Contacte a Concierge" },
            new SiteContent { Id = 9, Key = "contact_sub", Value = "Estamos disponibles 24/7 para diseñar su itinerario perfecto en la Cordillera." },
            new SiteContent { Id = 18, Key = "contact_email", Value = "concierge@septos.com" },
            new SiteContent { Id = 19, Key = "contact_phone", Value = "+54 11 1234 5678" },
            new SiteContent { Id = 20, Key = "contact_address", Value = "Sector Alpha, Vitacura" },
            
            // Footer
            new SiteContent { Id = 21, Key = "footer_desc", Value = "{\"es\":\"Líderes en aviación privada...\",\"en\":\"Leaders...\",\"pt\":\"Líderes...\"}" },
            new SiteContent { Id = 22, Key = "footer_rights", Value = "{\"es\":\"© 2026...\",\"en\":\"© 2026...\",\"pt\":\"© 2026...\"}" },
            new SiteContent { Id = 31, Key = "footer_srv1", Value = "{\"es\":\"Vuelo Panorámico\",\"en\":\"Panoramic Flight\",\"pt\":\"Voo Panorâmico\"}" },
            new SiteContent { Id = 32, Key = "footer_srv2", Value = "{\"es\":\"Transporte Helicóptero\",\"en\":\"Helicopter Transport\",\"pt\":\"Transporte de Helicóptero\"}" },
            new SiteContent { Id = 33, Key = "footer_srv3", Value = "{\"es\":\"Heliski Experience\",\"en\":\"Heliski Experience\",\"pt\":\"Experiência Heliski\"}" },
            new SiteContent { Id = 34, Key = "footer_srv4", Value = "{\"es\":\"Private Charter\",\"en\":\"Private Charter\",\"pt\":\"Charter Privado\"}" },

            // Catalog
            new SiteContent { Id = 23, Key = "catalog_title", Value = "{\"es\":\"Nuestras Experiencias\",\"en\":\"Our Experiences\",\"pt\":\"Nossas Experiências\"}" },
            new SiteContent { Id = 24, Key = "catalog_sub", Value = "{\"es\":\"Catálogo de Expediciones\",\"en\":\"Expedition Catalog\",\"pt\":\"Catálogo de Expedições\"}" }
        );

        modelBuilder.Entity<Experience>().HasData(
            new Experience { 
                Id = 1, 
                Title = "Vuelo panorámico", 
                Description = "Disfruta de una vista inigualable de Santiago y la Cordillera de los Andes desde las alturas.", 
                Price = 250.00m, 
                ImageUrl = "/img/niklas-bischop-UC0uUfwaWiQ-unsplash.jpg", 
                Location = "Aeródromo Vitacura", 
                Duration = "20 Minutos" 
            },
            new Experience { 
                Id = 2, 
                Title = "Transporte helicóptero Santiago Centro de ski el colorado", 
                Description = "Evita el tráfico y llega en minutos a las pistas de ski más exclusivas de la región.", 
                Price = 650.00m, 
                ImageUrl = "/img/tobias-seward-Hg0d6WzH6RU-unsplash.jpg", 
                Location = "Santiago / El Colorado", 
                Duration = "15 Minutos" 
            },
            new Experience { 
                Id = 3, 
                Title = "Experiencia Heliski", 
                Description = "La aventura definitiva: accede a terrenos vírgenes y nieve polvo inexplorada con nuestros expertos.", 
                Price = 1500.00m, 
                ImageUrl = "/img/niklas-bischop-3K6OiVH6cyw-unsplash.jpg", 
                Location = "Alta Montaña", 
                Duration = "Jornada Completa" 
            }
        );
    }
}
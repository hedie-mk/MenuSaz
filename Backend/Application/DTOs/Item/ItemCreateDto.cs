using Microsoft.AspNetCore.Http;

namespace Application.DTOs.Item
{
    public class ItemCreateDto
    {
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public decimal? DiscountedPrice { get; set; }
        public Guid? CategoryId { get; set; }
        public IFormFile? Photo { get; set; }

    }
}

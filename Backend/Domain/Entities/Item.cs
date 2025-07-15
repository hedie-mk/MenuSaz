using Domain.Base;
using Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Item : BaseEntity
    {
        public required string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public required decimal Price { get; set; }
        public decimal? DiscountedPrice { get; set; }
        public string? Photo { get; set; }
        public required State State { get; set; } = State.active;
        public required Category Category { get; set; }
        public required Guid CategoryId { get; set; }

    }
}

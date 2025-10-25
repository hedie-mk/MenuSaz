using Domain.Base;
using Domain.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Item : BaseEntity
    {
        public required string Name { get; set; } 
        public string? Description { get; set; }
        public required decimal Price { get; set; }
        public decimal? DiscountedPrice { get; set; }
        public string? Photo { get; set; }
        public required State State { get; set; } = State.active;
        public DateTime? DiactiveDateTime { get; set; }

        [ForeignKey(nameof(CategoryId))]
        public Category? Category { get; set; }
        public Guid? CategoryId { get; set; }
       

    }
}

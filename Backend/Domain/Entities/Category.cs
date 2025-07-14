using Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Category
    {
        public required string Name { get; set; }
        public required State State { get; set; } = State.active;
        public required MainCategory ParentCategory { get; set; }
        public required Guid ParentCategoryId { get; set; }
        public ICollection<Item>? Items { get; set; } = new List<Item>();
    }
}

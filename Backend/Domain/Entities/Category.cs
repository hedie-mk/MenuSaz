using Domain.Base;
using Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Category : BaseEntity
    {
        public required string Name { get; set; }
        public State State { get; set; }
        public MainCategory ParentCategory { get; set; }
        public required Guid ParentCategoryId { get; set; }
        public ICollection<Item>? Items { get; set; } = new List<Item>();
        public Category()
        {
            State = State.active;

        }
    }
}

using Domain.Base;
using Domain.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Category : BaseEntity
    {
        [Required]
        [MaxLength(100)]
        public string Name { get; set; }
        public int? Priority { get; set; }

        [Required]
        public State State { get; set; } = State.active;
        public DateTime? DiactiveDateTime { get; set; }

        [ForeignKey(nameof(ParentCategoryId))]
        public MainCategory ParentCategory { get; set; } = default!;

        [Required]
        public Guid ParentCategoryId { get; set; }
        public ICollection<Item> Items { get; set; } = new List<Item>();
        
    }
}

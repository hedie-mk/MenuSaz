using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Category
{
    public class CategoryUpdateDto
    {
        public required Guid Id { get; set; }
        public required string Name { get; set; } 
        public required Guid ParentCategoryId { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Category
{
    public class CategoryCreateDto
    {
        public required string Name { get; set; } = string.Empty;
        public required Guid ParentCategoryId { get; set; }
    }
}

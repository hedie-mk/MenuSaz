using Domain.Entities;
using Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Category
{
    public class CategoryDto
    {
        public string Name { get; set; } = string.Empty;
        public string State { get; set; } = string.Empty;
        public Guid ParentCategoryId { get; set; }
        public List<string>? Items { get; set; } = new List<string>();
        public int ItemsLength { get; set; }
    }
}

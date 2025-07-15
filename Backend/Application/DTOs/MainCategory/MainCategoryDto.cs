using Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.MainCategory
{
    public class MainCategoryDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string State { get; set; }
        public List<string>? Categories { get; set; } = new List<string>();
        public int CategoriesLength { get; set; }
    }
}

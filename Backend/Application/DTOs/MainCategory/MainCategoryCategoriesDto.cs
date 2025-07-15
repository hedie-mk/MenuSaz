using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.MainCategory
{
    public class MainCategoryCategoriesDto
    {
        public string Name { get; set; }
        public List<string>? Categories { get; set; } = new List<string>();
    }
}

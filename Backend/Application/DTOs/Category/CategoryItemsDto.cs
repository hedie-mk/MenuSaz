using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Category
{
    public class CategoryItemsDto
    {
        public string Name { get; set; } = string.Empty;
        public List<string> ItemsName { get; set; } = new List<string>();
    }
}

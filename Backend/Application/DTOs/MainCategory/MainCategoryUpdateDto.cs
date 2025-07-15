using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.MainCategory
{
    public class MainCategoryUpdateDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string State { get; set; }
    }
}

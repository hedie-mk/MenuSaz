using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.MenuInfo
{
    public class MenuInfoCreateDto
    {
        public string Name { get; set; } = string.Empty;
        public string? Address { get; set; }
        public string? WorkHour { get; set; }
        public string? PhoneNumber { get; set; }
        public string? SiteDescription { get; set; }
        public string? SocialMedia { get; set; }
        public string Logo { get; set; } = string.Empty;
    }
}

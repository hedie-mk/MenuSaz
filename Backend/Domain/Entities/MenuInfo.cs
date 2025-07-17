using Domain.Base;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class MenuInfo : BaseEntity
    {
        public required string Name { get; set; }
        public string? Address { get; set; }
        public string? WorkHour { get; set; }
        public string? PhoneNumber { get; set; }
        public string? SiteDescription { get; set; }
        public string? SocialMedia { get; set; }
        public string? Logo { get; set; }

    }
}

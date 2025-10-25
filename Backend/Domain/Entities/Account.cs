using Domain.Base;
using Domain.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Account : BaseEntity
    {
        [Required]
        public string UserName { get; set; } = string.Empty;

        [EmailAddress]
        [MaxLength(120)]
        public string? Email { get; set; }

        [Phone]
        [MaxLength(20)]
        public string? Phone { get; set; }

        [MaxLength(256)]
        public required string Password { get; set; }

        public UserRole Role { get; set; }

    }
}

using Domain.Base;
using Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Account : BaseEntity
    {
        public required string UserName { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; } 
        public required string Password { get; set; }
        public UserRole Role { get; set; }
        public Account()
        {

        }
    }
}

using Domain.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Account : BaseEntity
    {
        public string UserName { get; set; } = string.Empty;
        public required string Email { get; set; }
        public string Phone { get; set; } = string.Empty ;
        public required string Password { get; set; }
    }
}

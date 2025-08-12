using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Account
{
    public class AccountUpdateDto
    {
        public string? Id { get; set; }
        public required string UserName { get; set; } 
        public string? Email { get; set; }
        public string? Phone { get; set; }

    }
}

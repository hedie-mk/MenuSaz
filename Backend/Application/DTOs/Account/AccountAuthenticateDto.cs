using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Account
{
    public class AccountAuthenticateDto
    {
        public required string UserName { get; set; }
        public required string Password { get; set; }
    }
}

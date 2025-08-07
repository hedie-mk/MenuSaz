using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Account
{
    public class ChangePasswordDto
    {
        public Guid? Id { get; set; }
        public required string Password { get; set; }
    }
}

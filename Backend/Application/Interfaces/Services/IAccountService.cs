using Application.DTOs.Account;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces.Services
{
    public interface IAccountService
    {
        Task<AccountDto> GetAllAysnc();
        Task<AccountDto?> AuthenticateAsync(string username, string password);
        Task<Guid> CreateAccountAysnc(AccountCreateDto dto);
        Task<bool> UpdateAccountAysnc(AccountUpdateDto dto);
        Task<bool> DeleteAccountAysnc(Guid id);

    }
}

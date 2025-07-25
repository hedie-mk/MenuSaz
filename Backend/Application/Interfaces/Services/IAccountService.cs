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
        Task<List<AccountDto>> GetAllAysnc();
        Task<AccountDto> GetAccountAsync(Guid id);
        Task<string?> AuthenticateAsync(AccountAuthenticateDto dto);
        Task<bool> ChangePassword(ChangePasswordDto dto);
        Task<Guid> CreateAccountAysnc(AccountCreateDto dto);
        Task<bool> UpdateAccountAysnc(AccountUpdateDto dto);
        Task<bool> DeleteAccountAysnc(Guid id);

    }
}

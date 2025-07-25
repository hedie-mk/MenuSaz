using Application.DTOs.Account;
using Application.Interfaces.Helpers;
using Application.Interfaces.Services;
using Domain.Entities;
using Domain.Enums;
using Infrastructure.Context;
using Infrastructure.Helpers;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
    public class AccountService : IAccountService
    {
        private readonly AppDbContext _context;
        private readonly ITokenService _tokenService;
        public AccountService(AppDbContext context , ITokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        public async Task<List<AccountDto>> GetAllAysnc()
        {
            return await _context.Accounts
                .Select(a => new AccountDto
                {
                    Id = a.Id,
                    UserName = a.UserName,
                    Email = a.Email,
                    Phone = a.Phone,
                    Role = a.Role.ToString(),
                    CreatedAt = a.CreatedAt,
                }).ToListAsync();
        }

        public async Task<AccountDto> GetAccountAsync(Guid id)
        {
            var account = await _context.Accounts.FindAsync(id);
            return new AccountDto
            {
                Id = account!.Id,
                UserName = account.UserName,
                Email = account.Email,
                Phone = account.Phone,
                Role = account.Role.ToString(),
                CreatedAt = account.CreatedAt,
            };
        }

        public async Task<string?> AuthenticateAsync(AccountAuthenticateDto dto)
        {
            var hashed = PasswordHasher.Hash(dto.Password);

            var account = await _context.Accounts
                .FirstOrDefaultAsync(a => a.UserName == dto.UserName && a.Password == hashed);
            if (account == null) return null;
            return _tokenService.GenerateJwtToken(account);
        }

        public async Task<Guid> CreateAccountAysnc(AccountCreateDto dto)
        {
            var exists = await _context.Accounts.AnyAsync(a => a.UserName == dto.UserName);
            if (exists) throw new Exception("User already exists");

            var account = new Account
            {
                UserName = dto.UserName,
                Password = PasswordHasher.Hash(dto.Password),
                Role = UserRole.Staff,
            };

            _context.Accounts.Add(account);
            await _context.SaveChangesAsync();

            return account.Id;
        }

        public async Task<bool> DeleteAccountAysnc(Guid id)
        {
            var account = await _context.Accounts.FindAsync(id);

            if (account == null) return false;

            if(account.Role == UserRole.Manager) return false;

            _context.Accounts.Remove(account);
            await _context.SaveChangesAsync();

            return true;
        }

        
        public async Task<bool> UpdateAccountAysnc(AccountUpdateDto dto)
        {
            var account = await _context.Accounts.FindAsync(dto.Id);
            if (account == null) return false;

            account.UserName = dto.UserName;
            if (!string.IsNullOrWhiteSpace(dto.Email)) account.Email = dto.Email;
            if (!string.IsNullOrWhiteSpace(dto.Phone)) account.Phone = dto.Phone;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> ChangePassword(ChangePasswordDto dto)
        {
            var account = await _context.Accounts.FindAsync(dto.Id);
            if (account == null) return false;

            account.Password = PasswordHasher.Hash(dto.Password);
            await _context.SaveChangesAsync();
            return true;
        }

    }
}

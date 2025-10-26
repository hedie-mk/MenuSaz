using Application.DTOs.Account;
using Application.Interfaces.Helpers;
using Application.Interfaces.Services;
using Domain.Entities;
using Domain.Enums;
using Infrastructure.Context;
using Infrastructure.Helpers;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Services
{
    public class AccountService : IAccountService
    {
        private readonly AppDbContext _context;
        private readonly ITokenService _tokenService;
        private readonly ILogger<AccountService> _logger;

        public AccountService(AppDbContext context, ITokenService tokenService, ILogger<AccountService> logger)
        {
            _context = context;
            _tokenService = tokenService;
            _logger = logger;
        }

        public async Task<List<AccountDto>> GetAllAysnc()
        {
            try
            {
                var accounts = await _context.Accounts
                    .AsNoTracking()
                    .OrderByDescending(i => i.CreatedAt)
                    .Select(a => new AccountDto
                    {
                        Id = a.Id,
                        UserName = a.UserName,
                        Email = a.Email,
                        Phone = a.Phone,
                        Role = a.Role.ToString(),
                        CreatedAt = a.CreatedAt,
                    }).ToListAsync();

                _logger.LogInformation("Retrieved {Count} accounts.", accounts.Count);
                return accounts;

            }catch (Exception ex)
            {
                _logger.LogError(ex, "Error happend during fetching accounts from database");
                throw;

            }
            
        }

        public async Task<AccountDto?> GetAccountAsync(Guid id)
        {
            try
            {
                var account = await _context.Accounts.FindAsync(id);
                if (account == null)
                {
                    _logger.LogWarning("Account with ID {AccountId} not found.", id);
                    return null;
                }

                _logger.LogInformation("Account {UserName} found successfully.", account.UserName);
                return new AccountDto
                {
                    Id = account.Id,
                    UserName = account.UserName,
                    Email = account.Email,
                    Phone = account.Phone,
                    Role = account.Role.ToString(),
                    CreatedAt = account.CreatedAt,
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error happend during fetching account {id}" , id);
                throw;
            }
        }

        public async Task<string?> AuthenticateAsync(AccountAuthenticateDto dto)
        {
            try
            {
                var hashed = PasswordHasher.Hash(dto.Password);
                var account = await _context.Accounts
                    .FirstOrDefaultAsync(a => a.UserName == dto.UserName && a.Password == hashed);

                if (account == null)
                {
                    _logger.LogWarning("Failed login attempt for user {UserName}", dto.UserName);
                    return null;
                }

                _logger.LogInformation("User {UserName} authenticated successfully.", dto.UserName);
                return _tokenService.GenerateJwtToken(account);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error happend during authentication for user {userName}", dto.UserName);
                throw;
            }
        }

        public async Task<Guid> CreateAccountAysnc(AccountCreateDto dto)
        {
            try
            {
                var exists = await _context.Accounts.AnyAsync(a => a.UserName == dto.UserName);
                if (exists)
                {
                    _logger.LogWarning("Account creation failed. User {UserName} already exists.", dto.UserName);
                    throw new Exception("User already exists");
                }

                var account = new Account
                {
                    UserName = dto.UserName,
                    Password = PasswordHasher.Hash(dto.Password),
                    Role = UserRole.Staff,
                };

                _context.Accounts.Add(account);
                await _context.SaveChangesAsync();

                _logger.LogInformation("Account {UserName} created successfully with ID {AccountId}.", account.UserName, account.Id);
                return account.Id;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error happend during creating an account");
                throw;
            }
        }

        public async Task<bool> DeleteAccountAysnc(Guid id)
        {
            try
            {
                var account = await _context.Accounts.FindAsync(id);
                if (account == null)
                {
                    _logger.LogWarning("Delete failed. Account with ID {AccountId} not found.", id);
                    return false;
                }

                if (account.Role == UserRole.Manager)
                {
                    _logger.LogWarning("Attempt to delete Manager account (ID: {AccountId}) blocked.", id);
                    return false;
                }

                _context.Accounts.Remove(account);
                await _context.SaveChangesAsync();

                _logger.LogInformation("Account {AccountId} deleted successfully.", id);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error happend during deleting account {id}" , id);
                throw;
            }
        }

        
        public async Task<bool> UpdateAccountAysnc(AccountUpdateDto dto)
        {
            try
            {
                var account = await _context.Accounts.FindAsync(Guid.Parse(dto.Id!));
                if (account == null)
                {
                    _logger.LogWarning("Update failed. Account with ID {AccountId} not found.", dto.Id);
                    return false;
                }

                account.UserName = dto.UserName;
                if (!string.IsNullOrWhiteSpace(dto.Email)) account.Email = dto.Email;
                if (!string.IsNullOrWhiteSpace(dto.Phone)) account.Phone = dto.Phone;

                await _context.SaveChangesAsync();
                _logger.LogInformation("Account {AccountId} updated successfully.", dto.Id);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error happend during updating account {id}", dto.Id);
                throw;
            }
        }

        public async Task<bool> ChangePassword(ChangePasswordDto dto)
        {
            try
            {
                var account = await _context.Accounts.FindAsync(dto.Id);
                if (account == null)
                {
                    _logger.LogWarning("Password change failed. Account not found.");
                    return false;
                }

                if (account.Password != PasswordHasher.Hash(dto.CurrentPassword))
                {
                    _logger.LogWarning("Incorrect current password for account {AccountId}.", dto.Id);
                    return false;
                }

                account.Password = PasswordHasher.Hash(dto.Password);
                await _context.SaveChangesAsync();

                _logger.LogInformation("Password changed successfully for account {AccountId}.", dto.Id);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error happend during changing password for account {id}", dto.Id);
                throw;
            }
        }

    }
}

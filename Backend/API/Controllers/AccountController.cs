using Microsoft.AspNetCore.Mvc;
using Application.Interfaces;
using Application.DTOs.Account;
using Domain.Enums;
using Application.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
namespace API.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class AccountController : Controller
    {
        private readonly IAccountService _accountService;
        private readonly ILogger<AccountController> _logger;

        public AccountController(IAccountService accountService, ILogger<AccountController> logger)
        {
            _accountService = accountService;
            _logger = logger;
        }


        [HttpGet()]
        [Authorize]
        public async Task<IActionResult> Get()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            _logger.LogInformation("Fetching account info for user ID: {UserId}", userId);
            var result = await _accountService.GetAccountAsync(Guid.Parse(userId!));

            return result != null ? Ok(result) : NotFound();

        }


        [HttpGet("all")]
        [Authorize(Roles = "Manager")]
        public async Task<IActionResult> GetAll()
        {
            _logger.LogInformation("Manager requested all accounts list.");
            var result = await _accountService.GetAllAysnc();

            return Ok(result);
        }

        [HttpPost("createAccount")]
        [Authorize(Roles = "Manager")]
        public async Task<IActionResult> Create([FromBody] AccountCreateDto dto)
        {
            _logger.LogInformation("Creating account for user: {UserName}", dto.UserName);
            var id = await _accountService.CreateAccountAysnc(dto);

            return Created("" , new { id });
        }

        
        [HttpPut("updateAccount")]
        [Authorize(Roles = "Manager,Staff")]
        public async Task<IActionResult> Update([FromBody] AccountUpdateDto dto)
        {
            var userIdFromToken = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            dto.Id = userIdFromToken!;

            _logger.LogInformation("Updating account info for user ID: {UserId}", userIdFromToken);
            var result = await _accountService.UpdateAccountAysnc(dto);

            return result ? Ok() : NotFound();
        }

        [HttpDelete("DeleteAccount/{id}")]
        [Authorize(Roles = "Manager")]
        public async Task<IActionResult> Delete(string id)
        {
            _logger.LogInformation("Request to delete account with ID: {AccountId}", id);
            var result = await _accountService.DeleteAccountAysnc(Guid.Parse(id!));

            return result ? Ok() : NotFound();
        }

        [HttpPut("changePassword")]
        [Authorize(Roles = "Manager,Staff")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto dto)
        {
            var userIdFromToken = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            dto.Id = Guid.Parse(userIdFromToken!);

            _logger.LogInformation("Request to change password for user ID: {UserId}", dto.Id);
            var result = await _accountService.ChangePassword(dto);

            return result ? Ok() : NotFound();
        }

    }
}

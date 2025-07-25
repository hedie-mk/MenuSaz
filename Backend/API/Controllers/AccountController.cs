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
    [Route("api/dashboard")]
    public class AccountController : Controller
    {
        private readonly IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }


        [HttpGet("/")]
        [Authorize]
        public async Task<IActionResult> Get()
        {
            var id = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var result = await _accountService.GetAccountAsync(Guid.Parse(id!));
            return Ok(result);
        }


        [HttpGet("accounts")]
        [Authorize(Roles = "Manager")]
        public async Task<IActionResult> GetAll()
        {
            var result = await _accountService.GetAllAysnc();
            return Ok(result);
        }

        [HttpPost("createAccount")]
        [Authorize(Roles = "Manager")]
        public async Task<IActionResult> Create([FromBody] AccountCreateDto dto)
        {
            var id = await _accountService.CreateAccountAysnc(dto);
            return Created("" , new { id });
        }


        [HttpPut("updateAccount")]
        [Authorize]
        public async Task<IActionResult> Update([FromBody] AccountUpdateDto dto)
        {
            var userIdFromToken = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userIdFromToken == null || userIdFromToken != dto.Id.ToString())
                return Forbid("You can only update your own account.");

            var result = await _accountService.UpdateAccountAysnc(dto);

            return result ? Ok() : NotFound();
        }

        [HttpDelete("DeleteAccount/{id}")]
        [Authorize(Roles = "Manager")]
        public async Task<IActionResult> Delete(string id)
        {
            var result = await _accountService.DeleteAccountAysnc(Guid.Parse(id!));
            return result ? Ok() : NotFound();
        }

        [HttpPut("account/changePassword")]
        [Authorize]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto dto)
        {
            var userIdFromToken = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userIdFromToken == null || userIdFromToken != dto.Id.ToString())
                return Forbid("You can only update your own account.");

            var result = await _accountService.ChangePassword(dto);
            return result ? Ok() : NotFound();
        }

    }
}

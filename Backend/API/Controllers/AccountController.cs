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

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }


        [HttpGet()]
        [Authorize]
        public async Task<IActionResult> Get()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var result = await _accountService.GetAccountAsync(Guid.Parse(userId!));

            return result != null ? Ok(result) : NotFound();

        }


        [HttpGet("all")]
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
        [Authorize(Roles ="Manager")]
        [Authorize(Roles = "Staff")]
        public async Task<IActionResult> Update([FromBody] AccountUpdateDto dto)
        {
            var userIdFromToken = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            dto.Id = userIdFromToken!;

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

        [HttpPut("changePassword")]
        [Authorize(Roles = "Manager")]
        [Authorize(Roles = "Staff")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto dto)
        {
            var userIdFromToken = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            dto.Id = Guid.Parse(userIdFromToken!);

            var result = await _accountService.ChangePassword(dto);

            return result ? Ok() : NotFound();
        }

    }
}

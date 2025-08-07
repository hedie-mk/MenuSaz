using Application.DTOs.Account;
using Application.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private readonly IAccountService _accountService;

        public AuthController(IAccountService accountService)
        {
            _accountService = accountService;
        }
        
        [AllowAnonymous]
        [HttpPost("Login")]
        public async Task<IActionResult> Authenticate([FromBody] AccountAuthenticateDto dto)
        {
            var token = await _accountService.AuthenticateAsync(dto);
            if (token == null)
                return Unauthorized("Invalid username or password.");

            return Ok(new { token });
        }
    }
}

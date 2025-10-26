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
        private readonly ILogger<AuthController> _logger;

        public AuthController(IAccountService accountService , ILogger<AuthController> logger)
        {
            _accountService = accountService;
            _logger = logger;
        }
        
        [AllowAnonymous]
        [HttpPost("Login")]
        public async Task<IActionResult> Authenticate([FromBody] AccountAuthenticateDto dto)
        {
            _logger.LogInformation("Authenticating account : {userName}", dto.UserName);
            var token = await _accountService.AuthenticateAsync(dto);
            if (token == null)
            {
                _logger.LogInformation("Invalid userName or password entred");
                return Unauthorized("Invalid username or password.");
            }

            return Ok(new { token });
        }
    }
}

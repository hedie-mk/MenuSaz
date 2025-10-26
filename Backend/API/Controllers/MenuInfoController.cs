using Application.DTOs.MenuInfo;
using Application.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    [Authorize]
    public class MenuInfoController : Controller
    {
        private readonly IMenuInfoService _menuInfoService;
        private readonly ILogger<MenuInfoController> _logger;
        public MenuInfoController(IMenuInfoService menuInfoService,ILogger<MenuInfoController> logger)
        {
            _menuInfoService = menuInfoService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetMenuInfo()
        {
            _logger.LogInformation("Fetching menu info");
            var info = await _menuInfoService.GetMenuInfoAsync();
            return Ok(info);
        }
        [HttpPost]
        [Authorize(Roles = "Manager,Staff")]
        public async Task<IActionResult> Create([FromForm] MenuInfoCreateDto dto)
        {
            _logger.LogInformation("Start creating menu info");
            var id = await _menuInfoService.CreateMenuInfoAsync(dto);
            return Ok(id);
        }
        [HttpPut]
        [Authorize(Roles = "Manager,Staff")]
        public async Task<IActionResult> Update([FromForm] MenuInfoUpdateDto dto)
        {
            _logger.LogInformation("Updating menu info with id : {id}",dto.Id);
            var result = await _menuInfoService.UpdateMenuInfoAsync(dto);
            return result ? Ok() : BadRequest();
        }


    }
}

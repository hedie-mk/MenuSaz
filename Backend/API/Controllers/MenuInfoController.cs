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
        public MenuInfoController(IMenuInfoService menuInfoService)
        {
            _menuInfoService = menuInfoService;
        }

        [HttpGet]
        public async Task<IActionResult> GetMenuInfo()
        {
            var info = await _menuInfoService.GetMenuInfoAsync();
            return Ok(info);
        }
        [HttpPost]
        [Authorize(Roles = "Manager,Staff")]
        public async Task<IActionResult> Create([FromForm] MenuInfoCreateDto dto)
        {
            var id = await _menuInfoService.CreateMenuInfoAsync(dto);
            return Ok(id);
        }
        [HttpPut]
        [Authorize(Roles = "Manager,Staff")]
        public async Task<IActionResult> Update([FromForm] MenuInfoUpdateDto dto)
        {
            var result = await _menuInfoService.UpdateMenuInfoAsync(dto);
            return result ? Ok() : BadRequest();
        }


    }
}

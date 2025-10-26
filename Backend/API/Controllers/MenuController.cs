using Application.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]

    public class MenuController : Controller
    {
        private readonly ICategoryService _categoryService;
        private readonly IMainCategoryService _mainCategoryService;
        private readonly IItemService _itemService;
        private readonly IMenuInfoService _menuInfoService;
        private readonly ILogger<MenuController> _logger;
        public MenuController(ICategoryService categoryService , IMainCategoryService mainCategoryService , IItemService itemService, IMenuInfoService menuInfoService, ILogger<MenuController> logger)
        {
            _categoryService = categoryService;
            _mainCategoryService = mainCategoryService;
            _itemService = itemService;
            _menuInfoService = menuInfoService;
            _logger = logger;
        }
        [HttpGet("mainCategories")]
        public async Task<IActionResult> GetMainCategoriesAsync()
        {
            _logger.LogInformation("Fetching main categories for menu");
            var result = await _mainCategoryService.GetAllAysnc();
            return Ok(result);
        }
        [HttpGet("categories")]
        public async Task<IActionResult> GetCategoriesAysnc()
        {
            _logger.LogInformation("Fetching categories for menu");
            var result = await _categoryService.GetAllAysnc();
            return Ok(result);
        }
        [HttpGet("products")]
        public async Task<IActionResult> GetItemsAsync()
        {
            _logger.LogInformation("Fetching all items for menu");
            var items = await _itemService.GetAllAsync();
            return Ok(items);
        }
        [HttpGet("MenuInfo")]
        public async Task<IActionResult> GetMenuInfoAsync()
        {
            _logger.LogInformation("Fetching menu information");
            var info = await _menuInfoService.GetMenuInfoAsync();
            return Ok(info);
        }
    }
}

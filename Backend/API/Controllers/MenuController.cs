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

        public MenuController(ICategoryService categoryService , IMainCategoryService mainCategoryService , IItemService itemService, IMenuInfoService menuInfoService)
        {
            _categoryService = categoryService;
            _mainCategoryService = mainCategoryService;
            _itemService = itemService;
            _menuInfoService = menuInfoService;
        }
        [HttpGet("mainCategories")]
        public async Task<IActionResult> GetMainCategoriesAsync()
        {
            var result = await _mainCategoryService.GetAllAysnc();
            return Ok(result);
        }
        [HttpGet("categories")]
        public async Task<IActionResult> GetCategoriesAysnc()
        {
            var result = await _categoryService.GetAllAysnc();
            return Ok(result);
        }
        [HttpGet("products")]
        public async Task<IActionResult> GetItemsAsync()
        {
            var items = await _itemService.GetAllAsync();
            return Ok(items);
        }
        [HttpGet("MenuInfo")]
        public async Task<IActionResult> GetMenuInfoAsync()
        {
            var info = await _menuInfoService.GetMenuInfoAsync();
            return Ok(info);
        }
    }
}

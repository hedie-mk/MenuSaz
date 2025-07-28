using Application.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    [Authorize]
    public class DashboardController : Controller
    {
        private readonly ICategoryService _categoryService;
        private readonly IItemService _itemService;
        private readonly IMenuInfoService _menuInfoService;

        public DashboardController(ICategoryService categoryService, IItemService itemService, IMenuInfoService menuInfoService)
        {
            _categoryService = categoryService;
            _itemService = itemService;
            _menuInfoService = menuInfoService;
        }

        [HttpGet("Menu")]
        public async Task<IActionResult> GetMenu()
        {
            var categories = await _categoryService.GetAllAysnc();

            var result = categories!.Select(c => new
            {
                name = c.Name,
                itemsLength = c.ItemsLength,
            }).ToList();

            return Ok(result);
        }

        [HttpGet("DeactiveItems")]
        public async Task<IActionResult> GetDeactiveItems()
        {
            var items = await _itemService.GetDiactiveItemsAsync();
            return Ok(items);
        }

        [HttpGet("DiactiveCategories")]
        public async Task<IActionResult> GetDiactiveCategories()
        {
            var items = await _categoryService.GetDiactiveCategoryAsync();
            return Ok(items);
        }

        [HttpGet("latestItems/{index:int}")]
        public async Task<IActionResult> GetLatestAddedItems(int index)
        {
            var items = await _itemService.GetLatestAddedItemsAsync(index);
            return Ok(items);
        }

        [HttpGet("MenuInfo")]
        public async Task<IActionResult> GetMenuInfo()
        {
            var info = await _menuInfoService.GetMenuInfoAsync();
            return Ok(info);
        }
    }
}

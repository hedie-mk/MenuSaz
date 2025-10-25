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
        private readonly ILogger<DashboardController> _logger;

        public DashboardController(ICategoryService categoryService, IItemService itemService, IMenuInfoService menuInfoService, ILogger<DashboardController> logger)
        {
            _categoryService = categoryService;
            _itemService = itemService;
            _menuInfoService = menuInfoService;
            _logger = logger;
        }

        [HttpGet("Menu")]
        public async Task<IActionResult> GetMenu()
        {
            _logger.LogInformation("Fetching all categories with their items count");
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
            _logger.LogInformation("Fetching all diactive items");
            var items = await _itemService.GetDiactiveItemsAsync();
            return Ok(items);
        }

        [HttpGet("DiactiveCategories")]
        public async Task<IActionResult> GetDiactiveCategories()
        {
            _logger.LogInformation("Fetching all diactive categories");
            var items = await _categoryService.GetDiactiveCategoryAsync();
            return Ok(items);
        }

        [HttpGet("latestItems/{index:int}")]
        public async Task<IActionResult> GetLatestAddedItems(int index)
        {
            _logger.LogInformation("Fetching latest added items");
            var items = await _itemService.GetLatestAddedItemsAsync(index);
            return Ok(items);
        }

        [HttpGet("MenuInfo")]
        public async Task<IActionResult> GetMenuInfo()
        {
            _logger.LogInformation("Fetching cafe menu information");
            var info = await _menuInfoService.GetMenuInfoAsync();
            return Ok(info);
        }
    }
}


using Application.DTOs.MainCategory;
using Application.Interfaces.Services;
using Domain.Entities;
using Infrastructure.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    [Authorize]
    public class MainCategoryController : Controller
    {
        private readonly IMainCategoryService _mainCategoryService;
        private readonly ILogger<MainCategoryController> _logger;
        public MainCategoryController(IMainCategoryService mainCategoryService , ILogger<MainCategoryController> logger)
        {
            _mainCategoryService = mainCategoryService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            _logger.LogInformation("Fetching all main categories");
            var result = await _mainCategoryService.GetAllAysnc();
            return Ok(result);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            _logger.LogInformation("Fetching main category with id : {id}" , id);
            var result = await _mainCategoryService.GetByIdAsync(Guid.Parse(id));
            return result != null ? Ok(result) : NotFound();
        }

        [HttpPost]
        [Authorize(Roles = "Manager,Staff")]
        public async Task<IActionResult> Create([FromBody] MainCategoryCreateDto dto)
        {
            _logger.LogInformation("Start creating main category");
            var id = await _mainCategoryService.CreateAsync(dto);
            return Created($"api/MainCategory/{id}", new { id });
        }

        [HttpPut]
        [Authorize(Roles = "Manager,Staff")]
        public async Task<IActionResult> Update([FromBody] MainCategoryUpdateDto dto)
        {
            _logger.LogInformation("Updating main category with id : {id}" , dto.Id);
            var result = await _mainCategoryService.UpdateAsync(dto);
            return result ? Ok() : NotFound();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Manager,Staff")]
        public async Task<IActionResult> Delete(string id)
        {
            _logger.LogInformation("Deleting main category with id : {id}", id);
            var result = await _mainCategoryService.DeleteAsync(Guid.Parse(id));
            return result ? Ok() : NotFound();
        }

        [HttpPatch("ChangeStatus/{id}")]
        [Authorize(Roles = "Manager,Staff")]
        public async Task<IActionResult> ChangeStatus(string id)
        {
            _logger.LogInformation("Changing main category status with id : {id}",id);
            var result = await _mainCategoryService.ChangeStatusAsync(Guid.Parse(id));
            return result ? Ok() : NotFound();
        }

        [HttpGet("getCategoryCategories/{id}")]
        public async Task<IActionResult> GetCateroryCategories(string id)
        {
            _logger.LogInformation("Fetching all categories in main category with id : {id} ", id);
            var categories = await _mainCategoryService.GetCateroryCategoriesAysnc(Guid.Parse(id));
            return categories != null ? Ok(categories) : NotFound();
        }

        [HttpGet("GetDiactiveMainCategories")]
        public async Task<IActionResult> GetDiactiveCategory()
        {
            _logger.LogInformation("Fetching all diactive main categories");
            var items = await _mainCategoryService.GetDiactiveCategoryAsync();
            return Ok(items);
        }
    }
}

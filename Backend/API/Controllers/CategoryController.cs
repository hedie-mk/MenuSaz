using Application.DTOs.Category;
using Application.Interfaces.Services;
using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    
    public class CategoryController : Controller
    {
        private readonly ICategoryService _categoryService;
        private readonly ILogger<CategoryController> _logger;   
        public CategoryController(ICategoryService categoryService , ILogger<CategoryController> logger)
        {
            _categoryService = categoryService;
            _logger = logger;
        }

        [HttpGet("All")]
        [Authorize]
        public async Task<IActionResult> GetAll()
        {
            _logger.LogInformation("Requested fetching all categories");
            var result = await _categoryService.GetAllAysnc();
            return Ok(result);
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetById(string id)
        {
            _logger.LogInformation("Fetching category : {id}" , id);
            var result = await _categoryService.GetByIdAsync(Guid.Parse(id));
            return result != null ? Ok(result) : NotFound();
        }

        [HttpPost]
        [Authorize(Roles = "Manager,Staff")]
        public async Task<IActionResult> Create([FromBody] CategoryCreateDto dto)
        {
            _logger.LogInformation("Start creating an account");
            var id = await _categoryService.CreateAsync(dto);
            return Created($"api/category/{id}", new { id });
        }

        [HttpPut]
        [Authorize(Roles = "Manager,Staff")]
        public async Task<IActionResult> Update([FromBody] CategoryUpdateDto dto)
        {
            _logger.LogInformation("Updating category with id : {id}", dto.Id);
            var result = await _categoryService.UpdateAsync(dto);
            return result ? Ok() : NotFound();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Manager,Staff")]
        public async Task<IActionResult> Delete(string id)
        {
            _logger.LogInformation("Deleting category with id : {id}", id);
            var result = await _categoryService.DeleteAsync(Guid.Parse(id));
            return result ? Ok() : NotFound();
        }

        [HttpPatch("ChangeStatus/{id}")]
        [Authorize(Roles = "Manager,Staff")]
        public async Task<IActionResult> ChangeStatus(string id)
        {
            _logger.LogInformation("Changing category status with id : {id}", id);
            var result = await _categoryService.ChangeStatusAsync(Guid.Parse(id));
            return result ? Ok() : NotFound();
        }

        [HttpGet("GetCategoryItems/{id}")]
        [Authorize]
        public async Task<IActionResult> GetCategoryItems(string id)
        {
            _logger.LogInformation("Request fetching category {id} items" , id);
            var items = await _categoryService.GetCateroryItemsAysnc(Guid.Parse(id));
            return items != null ? Ok(items) : NotFound();
        }

        [HttpGet("GetDiactiveCategories")]
        [Authorize]
        public async Task<IActionResult> GetDiactiveCategories()
        {
            _logger.LogInformation("Fetching all diactive categories");
            var items = await _categoryService.GetDiactiveCategoryAsync();
            return Ok(items);
        }

        [HttpPatch("ChangePriority/{id}/{number}")]
        [Authorize(Roles = "Manager,Staff")]
        public async Task<IActionResult> ChangePriority(string id , int number)
        {
            _logger.LogInformation("Changing category {id} priority to {number}",id, number);
            var result = await _categoryService.ChangePriority(Guid.Parse(id) , number);
            return result ? Ok() : NotFound();
        }


    }
}

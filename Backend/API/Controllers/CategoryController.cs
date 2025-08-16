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
        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpGet("All")]
        [Authorize]
        public async Task<IActionResult> GetAll()
        {
            var result = await _categoryService.GetAllAysnc();
            return Ok(result);
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetById(string id)
        {
            var result = await _categoryService.GetByIdAsync(Guid.Parse(id));
            return result != null ? Ok(result) : NotFound();
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create([FromBody] CategoryCreateDto dto)
        {
            var id = await _categoryService.CreateAsync(dto);
            return Created($"api/category/{id}", new { id });
        }

        [HttpPut]
        [Authorize]
        public async Task<IActionResult> Update([FromBody] CategoryUpdateDto dto)
        {
            var result = await _categoryService.UpdateAsync(dto);
            return result ? Ok() : NotFound();
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> Delete(string id)
        {
            var result = await _categoryService.DeleteAsync(Guid.Parse(id));
            return result ? Ok() : NotFound();
        }

        [HttpPatch("ChangeStatus/{id}")]
        [Authorize]
        public async Task<IActionResult> ChangeStatus(string id)
        {
            var result = await _categoryService.ChangeStatusAsync(Guid.Parse(id));
            return result ? Ok() : NotFound();
        }

        [HttpGet("GetCategoryItems/{id}")]
        [Authorize]
        public async Task<IActionResult> GetCategoryItems(string id)
        {
            var items = await _categoryService.GetCateroryItemsAysnc(Guid.Parse(id));
            return items != null ? Ok(items) : NotFound();
        }

        [HttpGet("GetDiactiveCategories")]
        [Authorize]
        public async Task<IActionResult> GetDiactiveCategories()
        {
            var items = await _categoryService.GetDiactiveCategoryAsync();
            return Ok(items);
        }


    }
}

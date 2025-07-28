using Application.DTOs.Category;
using Application.Interfaces.Services;
using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    [Authorize]
    public class CategoryController : Controller
    {
        private readonly ICategoryService _categoryService;
        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _categoryService.GetAllAysnc();
            return Ok(result);
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var result = await _categoryService.GetByIdAsync(id);
            return result != null ? Ok(result) : NotFound();
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CategoryCreateDto dto)
        {
            var id = await _categoryService.CreateAsync(dto);
            return Created($"api/category/{id}", new { id });
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] CategoryUpdateDto dto)
        {
            var result = await _categoryService.UpdateAsync(dto);
            return result ? Ok() : NotFound();
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var result = await _categoryService.DeleteAsync(id);
            return result ? Ok() : NotFound();
        }

        [HttpPatch("ChangeStatus/{id:guid}")]
        public async Task<IActionResult> ChangeStatus(Guid id)
        {
            var result = await _categoryService.ChangeStatusAsync(id);
            return result ? Ok() : NotFound();
        }

        [HttpGet("GetCategoryItems/{id:guid}")]
        public async Task<IActionResult> GetCategoryItems(Guid id)
        {
            var items = await _categoryService.GetCateroryItemsAysnc(id);
            return items != null ? Ok(items) : NotFound();
        }

        [HttpGet("GetDiactiveCategories")]
        public async Task<IActionResult> GetDiactiveCategories()
        {
            var items = await _categoryService.GetDiactiveCategoryAsync();
            return Ok(items);
        }


    }
}

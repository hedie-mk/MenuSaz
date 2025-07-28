
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
        public MainCategoryController(IMainCategoryService mainCategoryService)
        {
            _mainCategoryService = mainCategoryService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _mainCategoryService.GetAllAysnc();
            return Ok(result);
        }
        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var result = await _mainCategoryService.GetByIdAsync(id);
            return result != null ? Ok(result) : NotFound();
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] MainCategoryCreateDto dto)
        {
            var id = await _mainCategoryService.CreateAsync(dto);
            return Created($"api/MainCategory/{id}", new { id });
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] MainCategoryUpdateDto dto)
        {
            var result = await _mainCategoryService.UpdateAsync(dto);
            return result ? Ok() : NotFound();
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var result = await _mainCategoryService.DeleteAsync(id);
            return result ? Ok() : NotFound();
        }

        [HttpPatch("ChangeStatus/{id:guid}")]
        public async Task<IActionResult> ChangeStatus(Guid id)
        {
            var result = await _mainCategoryService.ChangeStatusAsync(id);
            return result ? Ok() : NotFound();
        }

        [HttpGet("getCategoryCategories/{id:guid}")]
        public async Task<IActionResult> GetCateroryCategories(Guid id)
        {
            var categories = await _mainCategoryService.GetCateroryCategoriesAysnc(id);
            return categories != null ? Ok(categories) : NotFound();
        }

        [HttpGet("GetDiactiveMainCategories")]
        public async Task<IActionResult> GetDiactiveCategory()
        {
            var items = await _mainCategoryService.GetDiactiveCategoryAsync();
            return Ok(items);
        }
    }
}

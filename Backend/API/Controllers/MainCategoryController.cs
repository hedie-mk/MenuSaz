
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
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            var result = await _mainCategoryService.GetByIdAsync(Guid.Parse(id));
            return result != null ? Ok(result) : NotFound();
        }

        [HttpPost]
        [Authorize(Roles = "Manager")]
        [Authorize(Roles = "Staff")]
        public async Task<IActionResult> Create([FromBody] MainCategoryCreateDto dto)
        {
            var id = await _mainCategoryService.CreateAsync(dto);
            return Created($"api/MainCategory/{id}", new { id });
        }

        [HttpPut]
        [Authorize(Roles = "Manager")]
        [Authorize(Roles = "Staff")]
        public async Task<IActionResult> Update([FromBody] MainCategoryUpdateDto dto)
        {
            var result = await _mainCategoryService.UpdateAsync(dto);
            return result ? Ok() : NotFound();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Manager")]
        [Authorize(Roles = "Staff")]
        public async Task<IActionResult> Delete(string id)
        {
            var result = await _mainCategoryService.DeleteAsync(Guid.Parse(id));
            return result ? Ok() : NotFound();
        }

        [HttpPatch("ChangeStatus/{id}")]
        [Authorize(Roles = "Manager")]
        [Authorize(Roles = "Staff")]
        public async Task<IActionResult> ChangeStatus(string id)
        {
            var result = await _mainCategoryService.ChangeStatusAsync(Guid.Parse(id));
            return result ? Ok() : NotFound();
        }

        [HttpGet("getCategoryCategories/{id}")]
        public async Task<IActionResult> GetCateroryCategories(string id)
        {
            var categories = await _mainCategoryService.GetCateroryCategoriesAysnc(Guid.Parse(id));
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

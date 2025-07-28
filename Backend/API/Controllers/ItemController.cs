using Application.DTOs.Item;
using Application.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    [Authorize]
    public class ItemController : Controller
    {
        private readonly IItemService _itemService;
        public ItemController(IItemService itemService)
        {
            _itemService = itemService;
        }

        // GET: api/item
        [HttpGet("All")]
        public async Task<IActionResult> GetAll()
        {
            var items = await _itemService.GetAllAsync();

            return Ok(items);
        }

        // GET: api/item/byIndex/2
        [HttpGet("{index:int}")]
        public async Task<IActionResult> GetByIndex(int index)
        {
            var items = await _itemService.GetByIndexAsync(index);
            return Ok(items);
        }

        // GET: api/item/{id}
        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var item = await _itemService.GetByIdAsync(id);
            return item != null ? Ok(item) : NotFound();
        }

        // POST: api/item
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ItemCreateDto dto)
        {
            var id = await _itemService.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id }, null);
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] ItemUpdateDto dto)
        {
            var result = await _itemService.UpdateAsync(dto);
            return result ? Ok() : NotFound();
        }

        // DELETE: api/item/{id}
        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var result = await _itemService.DeleteAsync(id);
            return result ? Ok() : NotFound();
        }

        // PATCH: api/item/changeStatus/{id}
        [HttpPatch("changeStatus/{id:guid}")]
        public async Task<IActionResult> ChangeStatus(Guid id)
        {
            var result = await _itemService.ChangeStatusAsync(id);
            return result ? Ok() : NotFound();
        }

        // PATCH: api/item/addCategory?id={itemId}&categoryId={categoryId}
        [HttpPatch("addCategory")]
        public async Task<IActionResult> AddCategory([FromQuery] Guid id, [FromQuery] Guid categoryId)
        {
            var result = await _itemService.AddCategoryAsync(id, categoryId);
            return result ? Ok() : NotFound();
        }


    }
}

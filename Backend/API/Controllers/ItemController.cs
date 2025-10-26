using Application.DTOs.Item;
using Application.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    
    public class ItemController : Controller
    {
        private readonly IItemService _itemService;
        private readonly ILogger<ItemController> _logger;
        public ItemController(IItemService itemService , ILogger<ItemController> logger)
        {
            _itemService = itemService;
            _logger = logger;
        }

        
        [HttpGet("All")]
        [Authorize]
        public async Task<IActionResult> GetAll()
        {
            _logger.LogInformation("Fetching all items");
            try
            {
                var items = await _itemService.GetAllAsync();
                return Ok(items);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while fetching all items");
                return StatusCode(500, "An error occurred while retrieving items.");
            }

        }

        
        [HttpGet("{index:int}")]
        [Authorize]
        public async Task<IActionResult> GetByIndex(int index)
        {
            _logger.LogInformation("Fetching item for page {Index}", index);

            try
            {
                var items = await _itemService.GetByIndexAsync(index);

                if (items == null || !items.Any())
                {
                    _logger.LogWarning("No items found for page {Index}", index);
                    return NotFound();
                }

                _logger.LogInformation("Fetched {Count} items for page {Index}", items.Count(), index);
                return Ok(items);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while fetching items for page {Index}", index);
                return StatusCode(500, "An error occurred while retrieving items.");
            }
        }

        
        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetById(string id)
        {
             _logger.LogInformation("Fetching item with ID {ItemId}", id);

            try
            {
                var item = await _itemService.GetByIdAsync(Guid.Parse(id));
                if (item == null)
                {
                    return NotFound();
                }
                return Ok(item);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching item with ID {ItemId}", id);
                return StatusCode(500, "Error retrieving item.");
            }
        }

       
        [HttpPost]
        [Authorize(Roles = "Manager,Staff")]
        public async Task<IActionResult> Create([FromForm] ItemCreateDto dto)
        {
            _logger.LogInformation("Creating new item with name {ItemName}", dto.Name);

            try
            {
                var id = await _itemService.CreateAsync(dto);
                return CreatedAtAction(nameof(GetById), new { id }, null);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating item {ItemName}", dto.Name);
                return StatusCode(500, "Error creating item.");
            }
        }

        [HttpPut]
        [Authorize(Roles = "Manager,Staff")]
        public async Task<IActionResult> Update([FromForm] ItemUpdateDto dto)
        {
            _logger.LogInformation("Updating item {ItemId}", dto.Id);

            try
            {
                var result = await _itemService.UpdateAsync(dto);
                if (!result)
                {
                    return NotFound();
                }
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating item {ItemId}", dto.Id);
                return StatusCode(500, "Error updating item.");
            }
        }

        
        [HttpDelete("{id}")]
        [Authorize(Roles = "Manager,Staff")]
        public async Task<IActionResult> Delete(string id)
        {
            _logger.LogInformation("Deleting item {ItemId}", id);

            try
            {
                var result = await _itemService.DeleteAsync(Guid.Parse(id));
                if (!result)
                {
                    return NotFound();
                }
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting item {ItemId}", id);
                return StatusCode(500, "Error deleting item.");
            }
        }

        
        [HttpPatch("changeStatus/{id}")]
        [Authorize(Roles = "Manager,Staff")]
        public async Task<IActionResult> ChangeStatus(string id)
        {
            _logger.LogInformation("Changing status for item {id}", id);

            try
            {
                var result = await _itemService.ChangeStatusAsync(Guid.Parse(id));
                if (!result)
                {
                    return NotFound();
                }
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error changing status for item {ItemId}", id);
                return StatusCode(500, "Error changing status.");
            }
        }

        // PATCH: api/item/addCategory?id={itemId}&categoryId={categoryId}
        [HttpPatch("addCategory")]
        [Authorize(Roles = "Manager,Staff")]
        public async Task<IActionResult> AddCategory([FromQuery] string id, [FromQuery] string categoryId)
        {
            _logger.LogInformation("Adding category {CategoryId} to item {ItemId}", categoryId, id);

            try
            {
                var result = await _itemService.AddCategoryAsync(Guid.Parse(id), Guid.Parse(categoryId));
                if (!result)
                {
                    return NotFound();
                }
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error adding category {CategoryId} to item {ItemId}", categoryId, id);
                return StatusCode(500, "Error adding category to item.");
            }
        }


    }
}

using Application.Common.Options;
using Application.DTOs.Item;
using Application.Interfaces.Helpers;
using Application.Interfaces.Services;
using Domain.Entities;
using Domain.Enums;
using Infrastructure.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace Infrastructure.Services
{
    public class ItemService : IItemService
    {
        private readonly AppDbContext _context;
        private readonly IFileService _fileService;
        private readonly FileStorageOptions _options;
        private readonly FileUrlBuilder _fileUrlBuilder;
        private readonly ILogger<ItemService> _logger;

        public ItemService(AppDbContext context, IFileService fileService, IOptions<FileStorageOptions> fileStorageOptions, FileUrlBuilder fileUrlBuilder , ILogger<ItemService> logger)
        {
            _context = context;
            _fileService = fileService;
            _options = fileStorageOptions.Value;
            _fileUrlBuilder = fileUrlBuilder;
            _logger = logger;
        }
        public async Task<List<ItemDto>> GetAllAsync()
        {
            try
            {
                var items = await _context.Items
                    .AsNoTracking()
                    .OrderByDescending(i => i.CreatedAt)
                    .Select(p => new ItemDto
                    {
                        Id = p.Id,
                        Name = p.Name,
                        Description = p.Description,
                        Price = p.Price,
                        DiscountedPrice = p.DiscountedPrice,
                        State = p.State.ToString(),
                        CategoryName = p.Category != null ? p.Category.Name : "",
                        CategoryId = p.Category != null ? p.Category.Id : null,
                        Photo = string.IsNullOrEmpty(p.Photo)
                            ? null
                            : _fileUrlBuilder.Build($"{_options.ItemImagesPath}/{p.Photo}")
                    })
                    .ToListAsync();

                _logger.LogInformation("Fetched {Count} items successfully.", items.Count);
                return items;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while fetching all items.");
                throw;
            }
        }
        
        public async Task<List<ItemDto>> GetByIndexAsync(int index)
        {
            try
            {
                var items = await _context.Items
                    .AsNoTracking()
                    .OrderBy(i => i.CreatedAt)
                    .Select(p => new ItemDto
                    {
                        Id = p.Id,
                        Name = p.Name,
                        Description = p.Description,
                        Price = p.Price,
                        DiscountedPrice = p.DiscountedPrice,
                        State = p.State.ToString(),
                        CategoryName = p.Category != null ? p.Category.Name : "",
                        CategoryId = p.Category != null ? p.Category.Id : null,
                        Photo = string.IsNullOrEmpty(p.Photo)
                                ? null
                                : _fileUrlBuilder.Build($"{_options.ItemImagesPath}/{p.Photo}")
                    })
                    .Skip((index - 1) * 10)
                    .Take(10)   
                    .ToListAsync();
                return items;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while fetching items by index {Index}", index);
                throw;
            }
        }
        public async Task<ItemDto?> GetByIdAsync(Guid id)
        {
            try
            {
                var item = await _context.Items
                    .AsNoTracking()
                    .FirstOrDefaultAsync(p => p.Id == id);

                if (item == null)
                {
                    _logger.LogWarning("Item with ID {Id} not found.", id);
                    return null;
                }

                _logger.LogInformation("Fetched item {Id} successfully.", id);

                return new ItemDto
                {
                    Id = item.Id,
                    Name = item.Name,
                    Description = item.Description,
                    Price = item.Price,
                    DiscountedPrice = item.DiscountedPrice,
                    State = item.State.ToString(),
                    CategoryName = item.Category?.Name ?? "",
                    CategoryId = item.Category?.Id,
                    Photo = string.IsNullOrEmpty(item.Photo)
                                ? null
                                : _fileUrlBuilder.Build($"{_options.ItemImagesPath}/{item.Photo}")
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while fetching item with ID {Id}", id);
                throw;
            }
        }
        public async Task<bool> AddCategoryAsync(Guid id, Guid categoryId)
        {
            try
            {
                var item = await _context.Items.FindAsync(id);
                if (item == null)
                {
                    _logger.LogWarning("Cannot add category. Item {ItemId} not found.", id);
                    return false;
                }

                item.CategoryId = categoryId;
                await _context.SaveChangesAsync();

                _logger.LogInformation("Category {CategoryId} added to item {ItemId} successfully.", categoryId, id);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while adding category {CategoryId} to item {ItemId}", categoryId, id);
                throw;
            }
        }

        public async Task<bool> ChangeStatusAsync(Guid id)
        {
            try
            {
                var item = await _context.Items.FindAsync(id);
                if (item == null)
                {
                    _logger.LogWarning("Item {Id} not found. Cannot change status.", id);
                    return false;
                }

                item.State = item.State == State.active ? State.diactive : State.active;
                item.DiactiveDateTime = item.State == State.diactive ? DateTime.UtcNow : null;

                await _context.SaveChangesAsync();

                _logger.LogInformation("Item {Id} status changed to {State}.", id, item.State);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while changing status for item {Id}", id);
                throw;
            }
        }

        public async Task<Guid> CreateAsync(ItemCreateDto dto)
        {
            try
            {
                var photoUrl = dto.Photo != null
                    ? await _fileService.SaveFileAsync(dto.Photo, FileType.Item)
                    : null;

                var item = new Item
                {
                    Name = dto.Name,
                    Description = dto.Description,
                    Price = dto.Price,
                    DiscountedPrice = dto.DiscountedPrice,
                    State = State.active,
                    CategoryId = dto.CategoryId,
                    Photo = photoUrl
                };

                _context.Items.Add(item);
                await _context.SaveChangesAsync();

                _logger.LogInformation("Item {Id} created successfully.", item.Id);
                return item.Id;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while creating item {@Dto}", dto);
                throw;
            }
        }
        public async Task<bool> UpdateAsync(ItemUpdateDto dto)
        {
            try
            {
                var item = await _context.Items.FindAsync(dto.Id);
                if (item == null)
                {
                    _logger.LogWarning("Item {Id} not found for update.", dto.Id);
                    return false;
                }

                item.Name = dto.Name;
                item.Description = dto.Description;
                item.Price = dto.Price;
                item.DiscountedPrice = dto.DiscountedPrice;
                item.CategoryId = dto.CategoryId;

                if (dto.Photo != null)
                {
                    if (item.Photo != null)
                    {
                        _logger.LogInformation("Deleting old photo for item {Id}", item.Id);
                        await _fileService.DeleteFileAsync(item.Photo, FileType.Item);
                    }

                    item.Photo = await _fileService.SaveFileAsync(dto.Photo, FileType.Item);
                    _logger.LogInformation("New photo uploaded for item {Id}", item.Id);
                }

                await _context.SaveChangesAsync();
                _logger.LogInformation("Item {Id} updated successfully.", item.Id);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while updating item {@Dto}", dto);
                throw;
            }
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            try
            {
                var item = await _context.Items.FindAsync(id);
                if (item == null)
                {
                    _logger.LogWarning("Item {Id} not found for deletion.", id);
                    return false;
                }

                if (item.Photo != null)
                {
                    _logger.LogInformation("Deleting photo for item {Id}", id);
                    await _fileService.DeleteFileAsync(item.Photo, FileType.Item);
                }

                _context.Items.Remove(item);
                await _context.SaveChangesAsync();

                _logger.LogInformation("Item {Id} deleted successfully.", id);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while deleting item {Id}", id);
                throw;
            }
        }

        public async Task<List<DiactiveItemsDto>?> GetDiactiveItemsAsync()
        {
            try
            {
                var result = await _context.Items
                    .AsNoTracking()
                    .Where(i => i.State == State.diactive)
                    .Select(i => new DiactiveItemsDto
                    {
                        Id = i.Id,
                        Name = i.Name,
                        DiactiveDateTime = i.DiactiveDateTime
                    })
                    .ToListAsync();

                _logger.LogInformation("Fetched {Count} deactivated items.", result.Count);
                return result;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while fetching deactivated items.");
                throw;
            }
        }

        public async Task<List<LatestAddedItemsDto>> GetLatestAddedItemsAsync(int index)
        {
            try
            {
                var result = await _context.Items
                    .AsNoTracking()
                    .OrderByDescending(i => i.CreatedAt)
                    .Take(index)
                    .Select(i => new LatestAddedItemsDto
                    {
                        Id = i.Id,
                        Name = i.Name,
                        Price = i.Price,
                        Description = i.Description,
                        CreatedAt = i.CreatedAt.Date.ToShortDateString()
                    })
                    .ToListAsync();

                _logger.LogInformation("Fetched {Count} latest items successfully.", result.Count);
                return result;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while fetching latest {Count} items.", index);
                throw;
            }
        }
    }
}

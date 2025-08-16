using Application.Common.Options;
using Application.DTOs.Item;
using Application.Interfaces.Helpers;
using Application.Interfaces.Services;
using Domain.Entities;
using Domain.Enums;
using Infrastructure.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Infrastructure.Services
{
    public class ItemService : IItemService
    {
        private readonly AppDbContext _context;
        private readonly IFileService _fileService;
        private readonly FileStorageOptions _options;
        private readonly FileUrlBuilder _fileUrlBuilder;

        public ItemService(AppDbContext context, IFileService fileService, IOptions<FileStorageOptions> fileStorageOptions, FileUrlBuilder fileUrlBuilder )
        {
            _context = context;
            _fileService = fileService;
            _options = fileStorageOptions.Value;
            _fileUrlBuilder = fileUrlBuilder;
        }
        public async Task<List<ItemDto>> GetAllAsync()
        {
            return await _context.Items
                .Include(p => p.Category)
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
                    Photo = String.IsNullOrEmpty(p.Photo)
                            ? null 
                            : _fileUrlBuilder.Build($"{_options.ItemImagesPath}/{p.Photo}")
                })
                .ToListAsync();
        }
        
        public async Task<List<ItemDto>> GetByIndexAsync(int index)
        {
            return await _context.Items
                .Include(p => p.Category)
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
                    Photo = String.IsNullOrEmpty(p.Photo)
                            ? null
                            : _fileUrlBuilder.Build($"{_options.ItemImagesPath}/{p.Photo}")
                })
                .Take(index * 10)
                .ToListAsync();
        }
        public async Task<ItemDto?> GetByIdAsync(Guid id)
        {
            var item = await _context.Items
                .Include(p => p.Category)
                .FirstOrDefaultAsync(p => p.Id == id);

            if(item == null) return null;

            return new ItemDto
            {
                Id = item.Id,
                Name = item.Name,
                Description = item.Description,
                Price = item.Price,
                DiscountedPrice = item.DiscountedPrice,
                State = item.State.ToString(),
                CategoryName = item.Category?.Name ?? "",
                CategoryId = item.Category != null ? item.Category.Id : null,
                Photo = String.IsNullOrEmpty(item.Photo)
                            ? null
                            : _fileUrlBuilder.Build($"{_options.ItemImagesPath}/{item.Photo}")
            };
        }
        public async Task<bool> AddCategoryAsync(Guid id, Guid categoryId)
        {
            var item = await _context.Items.FindAsync(id);

            if(item == null) return false;

            item.CategoryId = categoryId;
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> ChangeStatusAsync(Guid id)
        {
            var item = await _context.Items.FindAsync(id);

            if (item == null) return false;

            item.State = item.State == State.active
                          ? State.diactive
                          : State.active;

            if(item.State == State.diactive)
            {
                item.DiactiveDateTime = DateTime.Now;
            }
            else
            {
                item.DiactiveDateTime = null;
            }

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<Guid> CreateAsync(ItemCreateDto dto)
        {
            var photoUrl = dto.Photo != null ? await _fileService.SaveFileAsync(dto.Photo,FileType.Item) : null;

            var item = new Item
            {
                Name = dto.Name,
                Description = dto.Description,
                Price = dto.Price,
                DiscountedPrice = dto.DiscountedPrice,
                State = State.active,
                CategoryId = dto.CategoryId ?? null,
                Photo = photoUrl,
            };

            _context.Items.Add(item);
            await _context.SaveChangesAsync();
            return item.Id;
        }
        public async Task<bool> UpdateAsync(ItemUpdateDto dto)
        {
            var item = await _context.Items.FindAsync(dto.Id);
            if (item == null) return false;

            item.Name = dto.Name;
            item.Description = dto.Description;
            item.Price = dto.Price;
            item.DiscountedPrice = dto.DiscountedPrice;
            item.CategoryId = dto.CategoryId;

            if (dto.Photo != null)
            {
               if(item.Photo != null) await _fileService.DeleteFileAsync(item.Photo,FileType.Item);
                item.Photo = await _fileService.SaveFileAsync(dto.Photo, FileType.Item); 
            }
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var item = await _context.Items.FindAsync(id);
            if (item == null) return false;

            if(item.Photo != null) await _fileService.DeleteFileAsync(item.Photo , FileType.Item);

            _context.Items.Remove(item);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<List<DiactiveItemsDto>?> GetDiactiveItemsAsync()
        {
            var result = await _context.Items
                .Where(i => i.State == State.diactive)
                .Select(i => new DiactiveItemsDto
                {
                    Id = i.Id,
                    Name = i.Name,
                    DiactiveDateTime = i.DiactiveDateTime

                }).ToListAsync();
            return result != null ? result : null ;
        }

        public async Task<List<LatestAddedItemsDto>> GetLatestAddedItemsAsync(int index)
        {
            return await _context.Items
                .OrderByDescending(i => i.CreatedAt)
                .Take(index)
                .Select(i => new LatestAddedItemsDto
                {
                    Id = i.Id,
                    Name = i.Name,
                    Description = i.Description,
                    CreatedAt = i.CreatedAt.Date.ToShortDateString(),
                }).ToListAsync();
        }
    }
}

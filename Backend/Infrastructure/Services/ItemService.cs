using Application.DTOs.Item;
using Application.Interfaces.Services;
using Domain.Entities;
using Domain.Enums;
using Infrastructure.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
    public class ItemService : IItemService
    {
        private readonly AppDbContext _context;

        public ItemService(AppDbContext context)
        {
            _context = context;
        }
        public async Task<List<ItemDto>> GetAllAsync()
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
                    CategoryName = p.Category != null ? p.Category.Name : ""
                }).ToListAsync();
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
                    CategoryName = p.Category != null ? p.Category.Name : ""
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
                CategoryName = item.Category?.Name ?? ""
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
                item.DiactiveDateTime = DateTime.UtcNow;
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
            var item = new Item
            {
                Name = dto.Name,
                Description = dto.Description,
                Price = dto.Price,
                DiscountedPrice = dto.DiscountedPrice,
                State = State.active,
                CategoryId = dto.CategoryId ?? null,
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

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var item = await _context.Items.FindAsync(id);
            if (item == null) return false;

            _context.Items.Remove(item);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<List<DiactiveItemsDto>> GetDiactiveItemsAsync()
        {
            return await _context.Items
                .Where(i => i.State == State.diactive)
                .Select(i => new DiactiveItemsDto
                {
                    Id = i.Id,
                    Name = i.Name,
                    DiactiveDateTime = i.DiactiveDateTime

                }).ToListAsync();
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
                    CreatedAt = i.CreatedAt,
                }).ToListAsync();
        }
    }
}

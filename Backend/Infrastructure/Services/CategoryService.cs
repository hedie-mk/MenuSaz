using Application.DTOs.Category;
using Application.Interfaces.Services;
using Domain.Entities;
using Domain.Enums;
using Infrastructure.Context;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly AppDbContext _context;
        public CategoryService(AppDbContext context)
        {
            _context = context;
        }
        public async Task<List<CategoryDto>> GetAllAysnc()
        {
            return await _context.Categories
                .Include(c => c.Items)
                .Include(c => c.ParentCategory)
                .Select(c => new CategoryDto
                {
                    Id = c.Id,
                    Name = c.Name,
                    State = c.State.ToString(),
                    ParentCategoryId = c.ParentCategoryId,
                    ParentCategoryName = c.ParentCategory!.Name,
                    Items = c.Items!.Select(i => i.Name).ToList() ?? null ,
                    ItemsLength = c.Items!.Count,

                }).ToListAsync();
        }
        public async Task<CategoryDto?> GetByIdAsync(Guid id)
        {
            var category = await _context.Categories
                .Include(c => c.Items)
                .Include (c => c.ParentCategory)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (category == null) return null;

            return new CategoryDto
            {
                Id = category.Id,
                Name = category.Name,
                State = category.State.ToString(),
                ParentCategoryId = category.ParentCategoryId,
                ParentCategoryName = category.ParentCategory!.Name,
                Items = category.Items!.Select(i => i.Name).ToList() == null ? null : category.Items!.Select(i => i.Name).ToList(),
                ItemsLength = category.Items!.Count,
            };
        }

        public async Task<bool> ChangeStatusAsync(Guid id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null) return false;
            category.State = category.State == State.active
                          ? State.diactive
                          : State.active;
            await _context.SaveChangesAsync();
            return true;
        }
        public async Task<CategoryItemsDto?> GetCateroryItemsAysnc(Guid id)
        {
            var category = await _context.Categories.Include(c => c.Items).FirstOrDefaultAsync(c => c.Id == id);

            if (category == null) return null;

            return new CategoryItemsDto
            {
                Name = category.Name,
                ItemsName = category.Items!.Select(i => i.Name).ToList() ?? null,
            };

        }

        public async Task<Guid> CreateAsync(CategoryCreateDto dto)
        {
            var category = new Category
            {
                Name = dto.Name,
                ParentCategoryId = dto.ParentCategoryId,
            };
            _context.Categories.Add(category);
            await _context.SaveChangesAsync();
            return category.Id;
        }
        public async Task<bool> UpdateAsync(CategoryUpdateDto dto)
        {
            var category = await _context.Categories.Include(c => c.ParentCategory).FirstOrDefaultAsync(c => c.Id == dto.Id);

            if (category == null) return false;

            category.Name = dto.Name;
            category.ParentCategoryId = dto.ParentCategoryId;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null) return false;

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();
            return true;
        }
        

        
    }
}

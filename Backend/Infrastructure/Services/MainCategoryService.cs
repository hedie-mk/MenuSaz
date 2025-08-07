using Application.DTOs.Category;
using Application.DTOs.MainCategory;
using Application.Interfaces.Services;
using Domain.Entities;
using Domain.Enums;
using Infrastructure.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
    public class MainCategoryService : IMainCategoryService
    {
        private readonly AppDbContext _context;
        public MainCategoryService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<MainCategoryDto>?> GetAllAysnc()
        {
            if (_context.Categories == null)
            {
                return null;
            }

            return await _context.MainCategories
                .Include(m => m.Categories)
                .Select(m => new MainCategoryDto
                {
                    Id = m.Id,
                    Name = m.Name,
                    State = m.State.ToString(),
                    Categories = m.Categories!.Select(c => c.Name).ToList() ?? null,
                    CategoriesLength = m.Categories!.Count
                }).ToListAsync();
        }

        public async Task<MainCategoryDto?> GetByIdAsync(Guid id)
        {
            var mainCategory = await _context.MainCategories.Include(m => m.Categories).FirstOrDefaultAsync(m => m.Id == id);

            if (mainCategory == null)  return null;
            
            return new MainCategoryDto
            {
                Id = mainCategory.Id,
                Name = mainCategory.Name,
                State = mainCategory.State.ToString(),
                Categories = mainCategory.Categories!.Select(c => c.Name).ToList(),
                CategoriesLength = mainCategory.Categories!.Count
            };
        }

        public async Task<MainCategoryCategoriesDto?> GetCateroryCategoriesAysnc(Guid id)
        {
            var mainCategory = await _context.MainCategories.Include(m => m.Categories).FirstOrDefaultAsync(m => m.Id == id);

            if (mainCategory == null) return null;

            return new MainCategoryCategoriesDto
            {
                Name = mainCategory.Name,
                Categories = mainCategory.Categories!.Select(c => c.Name).ToList(),
            };
        }

        public async Task<bool> ChangeStatusAsync(Guid id)
        {
            var category = await _context.MainCategories.FindAsync(id);

            if (category == null) return false;

            category.State = category.State == State.active
                          ? State.diactive
                          : State.active;

            if (category.State == State.diactive)
            {
                category.DiactiveDateTime = DateTime.Now;
            }
            else
            {
                category.DiactiveDateTime = null;
            }

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<Guid> CreateAsync(MainCategoryCreateDto dto)
        {
            var mainCategory = new MainCategory
            {
                Name = dto.Name
            };

            _context.MainCategories.Add(mainCategory);

            await _context.SaveChangesAsync();

            return mainCategory.Id;
        }

        public async Task<bool> UpdateAsync(MainCategoryUpdateDto dto)
        {
            var mainCategory = await _context.MainCategories.FindAsync(dto.Id);

            if (mainCategory == null) return false;

            mainCategory.Name = dto.Name;
            await _context.SaveChangesAsync();

            return true;    
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var mainCategory = _context.MainCategories.Find(id);

            if (mainCategory == null) return false;

            _context.MainCategories.Remove(mainCategory);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<List<DiactiveMainCategoryDto>> GetDiactiveCategoryAsync()
        {
            return await _context.MainCategories
               .Where(c => c.State == State.diactive)
               .Select(c => new DiactiveMainCategoryDto
               {
                   Id = c.Id,
                   Name = c.Name,
                   DiactiveDateTime = c.DiactiveDateTime,
               }).ToListAsync();
        }
    }
}

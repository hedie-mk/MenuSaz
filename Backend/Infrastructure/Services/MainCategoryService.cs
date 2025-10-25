using Application.DTOs.Category;
using Application.DTOs.MainCategory;
using Application.Interfaces.Services;
using Domain.Entities;
using Domain.Enums;
using Infrastructure.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
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
        private readonly ILogger<MainCategoryService> _logger;
        public MainCategoryService(AppDbContext context, ILogger<MainCategoryService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<List<MainCategoryDto>?> GetAllAysnc()
        {
            try
            {
                var mainCategories = await _context.MainCategories
                    .AsNoTracking()
                    .OrderByDescending(i => i.CreatedAt)
                    .Select(m => new MainCategoryDto
                    {
                        Id = m.Id,
                        Name = m.Name,
                        State = m.State.ToString(),
                        Categories = m.Categories!.Select(c => c.Name).ToList(),
                        CategoriesLength = m.Categories!.Count
                    }).ToListAsync();

                _logger.LogInformation("Fetched {Count} main categories successfully.", mainCategories.Count);
                return mainCategories;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while fetching all main categories.");
                throw;
            }
        }

        public async Task<MainCategoryDto?> GetByIdAsync(Guid id)
        {
            try
            {
                var mainCategory = await _context.MainCategories
                    .AsNoTracking()
                    .Include(m => m.Categories)
                    .FirstOrDefaultAsync(m => m.Id == id);

                if (mainCategory is null)
                {
                    _logger.LogWarning("Main category with ID {MainCategoryId} not found.", id);
                    return null;
                }

                var categories = mainCategory.Categories?.Select(c => c.Name).ToList() ?? new List<string>();

                _logger.LogInformation(
                    "Fetched main category '{Name}' (ID: {Id}) successfully with {Count} categories.",
                    mainCategory.Name, mainCategory.Id, categories.Count
                );

                return new MainCategoryDto
                {
                    Id = mainCategory.Id,
                    Name = mainCategory.Name,
                    State = mainCategory.State.ToString(),
                    Categories = categories,
                    CategoriesLength = categories.Count
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while fetching main category with ID {MainCategoryId}.", id);
                throw;
            }
        }

        public async Task<MainCategoryCategoriesDto?> GetCateroryCategoriesAysnc(Guid id)
        {
            try
            {
                var mainCategory = await _context.MainCategories
                    .AsNoTracking()
                    .Include(m => m.Categories)
                    .ThenInclude(c => c.Items)
                    .FirstOrDefaultAsync(m => m.Id == id);

                if (mainCategory is null)
                {
                    _logger.LogWarning("Main category with ID {MainCategoryId} not found.", id);
                    return null;
                }

                var categories = mainCategory.Categories?
                    .Select(c => new CategoryDto
                    {
                        Id = c.Id,
                        Name = c.Name,
                        Priority = c.Priority,
                        State = c.State.ToString(),
                        ParentCategoryId = c.ParentCategoryId,
                        ParentCategoryName = c.ParentCategory?.Name ?? "No parent",
                        Items = c.Items?.Select(i => i.Name).ToList() ?? new List<string>(),
                        ItemsLength = c.Items?.Count ?? 0,
                    })
                    .OrderBy(c => c.Priority)
                    .ToList() ?? new List<CategoryDto>();

                _logger.LogInformation("Fetched {Count} categories for main category '{MainCategoryName}' successfully.",
                    categories.Count, mainCategory.Name);

                return new MainCategoryCategoriesDto
                {
                    Name = mainCategory.Name,
                    Categories = categories
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while fetching categories for main category with ID {MainCategoryId}.", id);
                throw;
            }
        }

        public async Task<bool> ChangeStatusAsync(Guid id)
        {
            try
            {
                var category = await _context.MainCategories.FindAsync(id);

                if (category == null)
                {
                    _logger.LogWarning("Main category with ID {MainCategoryId} not found.", id);
                    return false;
                }

                category.State = category.State == State.active ? State.diactive : State.active;
                category.DiactiveDateTime = category.State == State.diactive ? DateTime.Now : null;

                await _context.SaveChangesAsync();

                _logger.LogInformation("Main category '{Name}' status changed to {State}.", category.Name, category.State);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while changing status for main category with ID {MainCategoryId}.", id);
                throw;
            }
        }

        public async Task<Guid> CreateAsync(MainCategoryCreateDto dto)
        {
            try
            {
                var mainCategory = new MainCategory { Name = dto.Name };

                _context.MainCategories.Add(mainCategory);
                await _context.SaveChangesAsync();

                _logger.LogInformation("Created main category with ID {Id}.",  mainCategory.Id);
                return mainCategory.Id;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while creating main category '{Name}'.", dto.Name);
                throw;
            }
        }

        public async Task<bool> UpdateAsync(MainCategoryUpdateDto dto)
        {
            try
            {
                var mainCategory = await _context.MainCategories.FindAsync(dto.Id);

                if (mainCategory == null)
                {
                    _logger.LogWarning("Main category with ID {MainCategoryId} not found.", dto.Id);
                    return false;
                }

                mainCategory.Name = dto.Name;
                await _context.SaveChangesAsync();

                _logger.LogInformation("Main category '{id}' updated successfully.", dto.Id);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while updating main category with ID {MainCategoryId}.", dto.Id);
                throw;
            }
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            try
            {
                var mainCategory = await _context.MainCategories.FindAsync(id);

                if (mainCategory == null)
                {
                    _logger.LogWarning("Main category with ID {MainCategoryId} not found.", id);
                    return false;
                }

                _context.MainCategories.Remove(mainCategory);
                await _context.SaveChangesAsync();

                _logger.LogInformation("Main category ID: {Id} deleted successfully.", mainCategory.Id);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while deleting main category with ID {MainCategoryId}.", id);
                throw;
            }
        }

        public async Task<List<DiactiveMainCategoryDto>> GetDiactiveCategoryAsync()
        {
            try
            {
                var diactiveCategories = await _context.MainCategories
                    .AsNoTracking()
                    .Where(c => c.State == State.diactive)
                    .Select(c => new DiactiveMainCategoryDto
                    {
                        Id = c.Id,
                        Name = c.Name,
                        DiactiveDateTime = c.DiactiveDateTime,
                    }).ToListAsync();

                _logger.LogInformation("Fetched {Count} deactivated main categories.", diactiveCategories.Count);
                return diactiveCategories;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while fetching deactivated main categories.");
                throw;
            }
        }
    }
}

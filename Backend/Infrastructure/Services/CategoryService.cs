using Application.DTOs.Category;
using Application.Interfaces.Services;
using Domain.Entities;
using Domain.Enums;
using Infrastructure.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly AppDbContext _context;
        private readonly ILogger<CategoryService> _logger;
        public CategoryService(AppDbContext context,ILogger<CategoryService> logger)
        {
            _context = context;
            _logger = logger;
        }
        public async Task<List<CategoryDto>?> GetAllAysnc()
        {
            try
            {
                _logger.LogInformation("Fetching all categories from database...");

                var categories = await _context.Categories
                    .AsNoTracking()
                    .OrderByDescending(i => i.ParentCategoryId)
                    .ThenBy(c => c.Priority)
                    .Select(c => new CategoryDto
                    {
                        Id = c.Id,
                        Name = c.Name,
                        Priority = c.Priority,
                        State = c.State.ToString(),
                        ParentCategoryId = c.ParentCategoryId,
                        ParentCategoryName = c.ParentCategory.Name,
                        Items = c.Items!.Select(i => i.Name).ToList(),
                        ItemsLength = c.Items!.Count,
                    })
                    .ToListAsync();

                _logger.LogInformation("Fetched {Count} categories successfully.", categories.Count);
                return categories;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while fetching categories.");
                throw;
            }
        }
        public async Task<CategoryDto?> GetByIdAsync(Guid id)
        {
            try
            {
                _logger.LogInformation("Fetching category with ID {CategoryId}", id);

                var category = await _context.Categories
                    .AsNoTracking()
                    .Include(c => c.Items)
                    .Include(c => c.ParentCategory)
                    .FirstOrDefaultAsync(c => c.Id == id);

                if (category == null)
                {
                    _logger.LogWarning("Category with ID {CategoryId} not found.", id);
                    return null;
                }

                _logger.LogInformation("Fetched category {CategoryName} successfully.", category.Name);

                return new CategoryDto
                {
                    Id = category.Id,
                    Name = category.Name,
                    State = category.State.ToString(),
                    ParentCategoryId = category.ParentCategoryId,
                    ParentCategoryName = category.ParentCategory!.Name,
                    Items = category.Items!.Select(i => i.Name).ToList(),
                    ItemsLength = category.Items!.Count,
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while fetching category with ID {CategoryId}.", id);
                throw;
            }
        }


        public async Task<Guid> CreateAsync(CategoryCreateDto dto)
        {
            try
            {

                var category = new Category
                {
                    Name = dto.Name,
                    ParentCategoryId = dto.ParentCategoryId,
                };

                _context.Categories.Add(category);
                await _context.SaveChangesAsync();

                _logger.LogInformation("Created category with ID {CategoryId}.", category.Id);
                return category.Id;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while creating category: {CategoryName}", dto.Name);
                throw;
            }
        }
        public async Task<bool> UpdateAsync(CategoryUpdateDto dto)
        {
            try
            {

                var category = await _context.Categories
                    .FirstOrDefaultAsync(c => c.Id == dto.Id);

                if (category == null)
                {
                    _logger.LogWarning("Category with ID {CategoryId} not found for update.", dto.Id);
                    return false;
                }

                category.Name = dto.Name;
                category.ParentCategoryId = dto.ParentCategoryId;

                await _context.SaveChangesAsync();
                _logger.LogInformation("Updated category {id} successfully.", category.Id);


                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while updating category with ID {CategoryId}.", dto.Id);
                throw;
            }
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            try
            {

                var category = await _context.Categories.FindAsync(id);
                if (category == null)
                {
                    _logger.LogWarning("Category with ID {CategoryId} not found for deletion.", id);
                    return false;
                }

                _context.Categories.Remove(category);
                await _context.SaveChangesAsync();

                _logger.LogInformation("Deleted category {id} successfully.", category.Id);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while deleting category with ID {CategoryId}.", id);
                throw;
            }
        }

        public async Task<bool> ChangeStatusAsync(Guid id)
        {
            try
            {

                var category = await _context.Categories.FindAsync(id);
                if (category == null)
                {
                    _logger.LogWarning("Category with ID {CategoryId} not found for status change.", id);
                    return false;
                }

                category.State = category.State == State.active ? State.diactive : State.active;
                category.DiactiveDateTime = category.State == State.diactive ? DateTime.Now : null;

                await _context.SaveChangesAsync();

                _logger.LogInformation("Category {id} status changed to {Status}.", category.Id, category.State);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while changing status for category with ID {CategoryId}.", id);
                throw;
            }
        }
        public async Task<CategoryItemsDto?> GetCateroryItemsAysnc(Guid id)
        {
            try
            {

                var category = await _context.Categories
                    .AsNoTracking()
                    .Include(c => c.Items)
                    .FirstOrDefaultAsync(c => c.Id == id);

                if (category == null)
                {
                    _logger.LogWarning("Category with ID {CategoryId} not found.", id);
                    return null;
                }

                _logger.LogInformation("Fetched {Count} items for category {id}.", category.Items?.Count ?? 0, category.Id);

                return new CategoryItemsDto
                {
                    Name = category.Name,
                    ItemsName = category.Items!.Select(i => i.Name).ToList(),
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while fetching items for category with ID {CategoryId}.", id);
                throw;
            }

        }

        public async Task<List<DiactiveCategoryDto>?> GetDiactiveCategoryAsync()
        {
            try
            {

                var result = await _context.Categories
                    .AsNoTracking()
                    .Where(c => c.State == State.diactive)
                    .Select(c => new DiactiveCategoryDto
                    {
                        Id = c.Id,
                        Name = c.Name,
                        DiactiveDateTime = c.DiactiveDateTime,
                    })
                    .ToListAsync();

                _logger.LogInformation("Fetched {Count} deactivated categories.", result.Count);
                return result;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while fetching deactivated categories.");
                throw;
            }
        }

        public async Task<bool> ChangePriority(Guid id , int number)
        {
            try
            {

                var category = await _context.Categories.FirstOrDefaultAsync(c => c.Id == id);
                if (category == null)
                {
                    _logger.LogWarning("Category with ID {CategoryId} not found for priority change.", id);
                    return false;
                }

                category.Priority = number;
                await _context.SaveChangesAsync();

                _logger.LogInformation("Category {id} priority updated to {Priority}.", category.Id, number);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while changing priority for category with ID {CategoryId}.", id);
                throw;
            }
        }
    }
}

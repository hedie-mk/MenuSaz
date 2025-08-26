using Application.DTOs.Category;
using Application.DTOs.Item;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces.Services
{
    public interface ICategoryService
    {
        Task<List<CategoryDto>?> GetAllAysnc();
        Task<CategoryDto?> GetByIdAsync(Guid id);
        Task<CategoryItemsDto?> GetCateroryItemsAysnc(Guid id);
        Task<bool> ChangeStatusAsync(Guid id);
        Task<Guid> CreateAsync(CategoryCreateDto dto);
        Task<bool> UpdateAsync(CategoryUpdateDto dto);
        Task<bool> DeleteAsync(Guid id);
        Task<List<DiactiveCategoryDto>?> GetDiactiveCategoryAsync();
        Task<bool> ChangePriority(Guid id, int number);

    }
}

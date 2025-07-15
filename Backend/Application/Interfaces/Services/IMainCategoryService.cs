using Application.DTOs.MainCategory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces.Services
{
    public interface IMainCategoryService
    {
        Task<List<MainCategoryDto>> GetAllAysnc();
        Task<MainCategoryDto?> GetByIdAsync(Guid id);
        Task<MainCategoryCategoriesDto> GetCateroryCategoriesAysnc(Guid id);
        Task<bool> ChangeStatusAsync(Guid id);
        Task<Guid> CreateAsync(MainCategoryCreateDto dto);
        Task<bool> UpdateAsync(MainCategoryUpdateDto dto);
        Task<bool> DeleteAsync(Guid id);
    }
}

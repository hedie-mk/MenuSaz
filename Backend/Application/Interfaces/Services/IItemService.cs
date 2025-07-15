using Application.DTOs.Item;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces.Services
{
    public interface IItemService
    {
        Task<List<ItemDto>> GetAllAsync();
        Task<List<ItemDto>> GetByIndexAsync(int index);
        Task<ItemDto?> GetByIdAsync(Guid id);
        Task<bool> ChangeStatusAsync(Guid id);
        Task<bool> AddCategoryAsync(Guid id, Guid categoryId);
        Task<Guid> CreateAsync(ItemCreateDto dto);
        Task<bool> UpdateAsync(ItemUpdateDto dto);
        Task<bool> DeleteAsync(Guid id);
    }
}

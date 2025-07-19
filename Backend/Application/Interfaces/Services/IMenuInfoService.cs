
using Application.DTOs.MenuInfo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces.Services
{
    public interface IMenuInfoService
    {
        Task<MenuInfoDto> GetMenuInfoAsync();
        Task<Guid> CreateMenuInfoAsync(MenuInfoCreateDto dto);
        Task<bool> UpdateMenuInfoAsync(MenuInfoUpdateDto dto);
    }
}

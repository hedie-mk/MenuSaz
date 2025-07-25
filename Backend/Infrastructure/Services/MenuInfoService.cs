using Application.DTOs.MenuInfo;
using Application.Interfaces.Services;
using Domain.Entities;
using Infrastructure.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
    public class MenuInfoService : IMenuInfoService
    {
        private readonly AppDbContext _context;
        public MenuInfoService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<MenuInfoDto> GetMenuInfoAsync()
        {
            return await _context.MenuInfos.Select(m => new MenuInfoDto
            {
                Name = m.Name,
                Address = m.Address,
                WorkHour = m.WorkHour,
                PhoneNumber = m.PhoneNumber,
                SiteDescription = m.SiteDescription,
                SocialMedia = m.SocialMedia,
                Logo = m.Logo

            }).FirstOrDefaultAsync();
        }

        public async Task<Guid> CreateMenuInfoAsync(MenuInfoCreateDto dto)
        {
            var menuInfo = new MenuInfo
            {
                Name = dto.Name,
                Address = dto.Address,
                WorkHour = dto.WorkHour,
                PhoneNumber = dto.PhoneNumber,
                SiteDescription = dto.SiteDescription,
                SocialMedia = dto.SocialMedia,
                Logo = dto.Logo
            };

            _context.MenuInfos.Add(menuInfo);
            await _context.SaveChangesAsync();

            return menuInfo.Id;
        }

       
        public async Task<bool> UpdateMenuInfoAsync(MenuInfoUpdateDto dto)
        {
            var menuInfo = await _context.MenuInfos.FindAsync(dto.Id);
            if (menuInfo == null) return false;

            menuInfo.Name = dto.Name;
            menuInfo.Address = dto.Address;
            menuInfo.WorkHour = dto.WorkHour;
            menuInfo.PhoneNumber = dto.PhoneNumber;
            menuInfo.SiteDescription = dto.SiteDescription;
            menuInfo.SocialMedia = dto.SocialMedia;
            menuInfo.Logo = dto.Logo;

            await _context.SaveChangesAsync();
            return true;
        }
    }
}

using Application.Common.Options;
using Application.DTOs.MenuInfo;
using Application.Interfaces.Helpers;
using Application.Interfaces.Services;
using Domain.Entities;
using Domain.Enums;
using Infrastructure.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
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
        private readonly IFileService _fileService;
        private readonly IOptions<FileStorageOptions> _options;
        private readonly FileUrlBuilder _fileUrlBuilder;
        public MenuInfoService(AppDbContext context , IFileService fileService, IOptions<FileStorageOptions> fileStorageOptions, FileUrlBuilder fileUrlBuilder)
        {
            _context = context;
            _fileService = fileService;
            _options = fileStorageOptions;
            _fileUrlBuilder = fileUrlBuilder;
        }

        public async Task<MenuInfoDto?> GetMenuInfoAsync()
        {
            return await _context.MenuInfos.Select(m => new MenuInfoDto
            {
                Id = m.Id,
                Name = m.Name,
                Address = m.Address,
                WorkHour = m.WorkHour,
                PhoneNumber = m.PhoneNumber,
                SiteDescription = m.SiteDescription,
                SocialMedia = m.SocialMedia,
                Logo = String.IsNullOrEmpty(m.Logo)
                            ? null
                            : _fileUrlBuilder.Build($"{_options.Value.MenuLogosPath}/{m.Logo}")

            }).FirstOrDefaultAsync() ?? null;
        }

        public async Task<Guid> CreateMenuInfoAsync(MenuInfoCreateDto dto)
        {

            var photoUrl = dto.Logo != null ? await _fileService.SaveFileAsync(dto.Logo, FileType.Menu) : null;

            var menuInfo = new MenuInfo
            {
                Name = dto.Name,
                Address = dto.Address,
                WorkHour = dto.WorkHour,
                PhoneNumber = dto.PhoneNumber,
                SiteDescription = dto.SiteDescription,
                SocialMedia = dto.SocialMedia,
                Logo = photoUrl
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
            
            if (dto.Logo != null)
            {
                if (menuInfo.Logo != null) await _fileService.DeleteFileAsync(menuInfo.Logo, FileType.Menu);
                menuInfo.Logo = await _fileService.SaveFileAsync(dto.Logo, FileType.Menu);
            }

            await _context.SaveChangesAsync();
            return true;
        }
    }
}

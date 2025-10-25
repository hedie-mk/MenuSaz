using Application.Common.Options;
using Application.DTOs.MenuInfo;
using Application.Interfaces.Helpers;
using Application.Interfaces.Services;
using Domain.Entities;
using Domain.Enums;
using Infrastructure.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace Infrastructure.Services
{
    public class MenuInfoService : IMenuInfoService
    {
        private readonly AppDbContext _context;
        private readonly IFileService _fileService;
        private readonly IOptions<FileStorageOptions> _options;
        private readonly FileUrlBuilder _fileUrlBuilder;
        private readonly ILogger<MenuInfoService> _logger;
        public MenuInfoService(AppDbContext context , IFileService fileService, IOptions<FileStorageOptions> fileStorageOptions, FileUrlBuilder fileUrlBuilder,ILogger<MenuInfoService> logger)
        {
            _context = context;
            _fileService = fileService;
            _options = fileStorageOptions;
            _fileUrlBuilder = fileUrlBuilder;
            _logger = logger;
        }

        public async Task<MenuInfoDto?> GetMenuInfoAsync()
        {
            try
            {
                var menuInfo = await _context.MenuInfos
                    .AsNoTracking()
                    .Select(m => new MenuInfoDto
                    {
                        Id = m.Id,
                        Name = m.Name,
                        Address = m.Address,
                        WorkHour = m.WorkHour,
                        PhoneNumber = m.PhoneNumber,
                        SiteDescription = m.SiteDescription,
                        SocialMedia = m.SocialMedia,
                        Logo = string.IsNullOrEmpty(m.Logo)
                            ? null
                            : _fileUrlBuilder.Build($"{_options.Value.MenuLogosPath}/{m.Logo}")
                    })
                    .FirstOrDefaultAsync();

                if (menuInfo == null)
                {
                    _logger.LogWarning("No MenuInfo found in the database.");
                    return null;
                }

                _logger.LogInformation("Fetched MenuInfo '{Name}' successfully.", menuInfo.Name);
                return menuInfo;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while fetching MenuInfo.");
                throw;
            }
        }

        public async Task<Guid> CreateMenuInfoAsync(MenuInfoCreateDto dto)
        {

            try
            {
                string? photoUrl = null;

                if (dto.Logo != null)
                {
                    photoUrl = await _fileService.SaveFileAsync(dto.Logo, FileType.Menu);
                    _logger.LogInformation("Logo file saved successfully at '{Path}'", photoUrl);
                }

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

                _logger.LogInformation("Created MenuInfo with ID {Id}", menuInfo.Id);
                return menuInfo.Id;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while creating MenuInfo '{name}'", dto.Name);
                throw;
            }
        }

       
        public async Task<bool> UpdateMenuInfoAsync(MenuInfoUpdateDto dto)
        {
            try
            {
                var menuInfo = await _context.MenuInfos.FindAsync(dto.Id);

                if (menuInfo == null)
                {
                    _logger.LogWarning("MenuInfo with ID {MenuInfoId} not found.", dto.Id);
                    return false;
                }

                menuInfo.Name = dto.Name;
                menuInfo.Address = dto.Address;
                menuInfo.WorkHour = dto.WorkHour;
                menuInfo.PhoneNumber = dto.PhoneNumber;
                menuInfo.SiteDescription = dto.SiteDescription;
                menuInfo.SocialMedia = dto.SocialMedia;

                // Handle logo update
                if (dto.Logo != null)
                {
                    try
                    {
                        if (!string.IsNullOrEmpty(menuInfo.Logo))
                        {
                            await _fileService.DeleteFileAsync(menuInfo.Logo, FileType.Menu);
                            _logger.LogInformation("Old logo deleted: {OldLogo}", menuInfo.Logo);
                        }

                        var newLogo = await _fileService.SaveFileAsync(dto.Logo, FileType.Menu);
                        menuInfo.Logo = newLogo;
                        _logger.LogInformation("New logo saved successfully: {NewLogo}", newLogo);
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError(ex, "Error occurred while updating logo for MenuInfo ID {MenuInfoId}", dto.Id);
                        throw;
                    }
                }

                await _context.SaveChangesAsync();

                _logger.LogInformation("MenuInfo '{Name}' (ID: {Id}) updated successfully.", menuInfo.Name, menuInfo.Id);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while updating MenuInfo with ID {MenuInfoId}", dto.Id);
                throw;
            }
        }
    }
}

using Application.Common.Options;
using Application.Interfaces.Helpers;
using Domain.Enums;
using Microsoft.Extensions.Options;

namespace API.Services
{
    public class FileStorageService : IFileService
    {
        private readonly FileStorageOptions _options;

        public FileStorageService(IOptions<FileStorageOptions> options)
        {
            _options = options.Value;
        }

        private string GetFolderPath(FileType type)
        {
            var path = type switch
            {
                FileType.Item => _options.ItemImagesPath,
                FileType.Menu => _options.MenuLogosPath,
                _ => throw new ArgumentOutOfRangeException(nameof(type))
            };

            var fullPath = Path.Combine(_options.WebRootPath, path);

            if (!Directory.Exists(fullPath))
                Directory.CreateDirectory(fullPath);

            return fullPath;
        }

        public async Task<string> SaveFileAsync(IFormFile file, FileType type)
        {
            var folderPath = GetFolderPath(type);
            var fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(folderPath, fileName);

            using var stream = new FileStream(filePath, FileMode.Create);
            await file.CopyToAsync(stream);

            return fileName; 
        }

        public Task DeleteFileAsync(string fileName, FileType type)
        {
            var folderPath = GetFolderPath(type);
            var filePath = Path.Combine(folderPath, fileName);
            if (File.Exists(filePath))
                File.Delete(filePath);

            return Task.CompletedTask;
        }
    }
}

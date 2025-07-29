using Domain.Enums;
using Microsoft.AspNetCore.Http;
using Microsoft.VisualBasic.FileIO;

namespace Application.Interfaces.Helpers
{
    public interface IFileService
    {
        Task<string> SaveFileAsync(IFormFile file, FileType type);
        Task DeleteFileAsync(string fileName, FileType type);
    }
}

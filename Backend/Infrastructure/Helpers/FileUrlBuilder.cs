using Microsoft.AspNetCore.Http;

namespace Infrastructure.Services
{
    public class FileUrlBuilder
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public FileUrlBuilder(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public string? Build(string relativePath)
        {
            var request = _httpContextAccessor.HttpContext?.Request;
            if (request == null || string.IsNullOrEmpty(relativePath))
                return null;

            var baseUrl = $"{request.Scheme}://{request.Host}";
            return $"{baseUrl}/{relativePath.Replace("\\", "/")}";
        }
    }
}

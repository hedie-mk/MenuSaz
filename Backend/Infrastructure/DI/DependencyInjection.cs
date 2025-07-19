using Application.Interfaces.Helpers;
using Application.Interfaces.Services;
using Infrastructure.Context;
using Infrastructure.Helpers;
using Infrastructure.Services;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.DI
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration config)
        {
            // DbContext
            services.AddDbContext<AppDbContext>(options =>
                options.UseSqlServer(config.GetConnectionString("DefaultConnection")));

            // Service Bindings
            services.AddScoped<IItemService, ItemService>();
            services.AddScoped<ICategoryService, CategoryService>();
            services.AddScoped<IMainCategoryService, MainCategoryService>();
            services.AddScoped<IAccountService, AccountService>();
            services.AddScoped<IMenuInfoService, MenuInfoService>();
            services.AddScoped<ITokenService, TokenService>();

            return services;
        }
    }
}

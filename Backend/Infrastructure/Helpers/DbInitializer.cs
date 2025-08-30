using Domain.Entities;
using Domain.Enums;
using Infrastructure.Context;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure.Helpers
{
    public static class DbInitializer
    {
        public static async Task SeedAsync(IServiceProvider serviceProvider)
        {
            using var scope = serviceProvider.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();


            if (!context.Accounts.Any())
            {
                var admin = new Account
                {
                    UserName = "admin",
                    Password = PasswordHasher.Hash("Admin123!"),
                    Role = UserRole.Manager,
                    Email = "admin@menusaz.ir",
                    Phone = "09120000000"
                };

                context.Accounts.Add(admin);

                var visiter = new Account
                {
                    UserName = "visiter",
                    Password = PasswordHasher.Hash("123456"),
                    Role = UserRole.visiter,
                    Email = "admin@menusaz.ir",
                    Phone = "09120000000"
                };
                context.Accounts.Add(visiter);

                await context.SaveChangesAsync();
            }
            if(!context.MenuInfos.Any())
            {
                var menuInfo = new MenuInfo { Name = "کافه" };
                context.MenuInfos.Add(menuInfo);
                await context.SaveChangesAsync();
            }
        }
    }

}

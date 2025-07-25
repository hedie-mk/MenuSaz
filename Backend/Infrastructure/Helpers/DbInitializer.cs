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
                    Id = Guid.NewGuid(),
                    UserName = "admin",
                    Password = PasswordHasher.Hash("Admin123!"),
                    Role = UserRole.Manager,
                    Email = "admin@menusaz.ir",
                    Phone = "09120000000",
                    CreatedAt = DateTime.UtcNow
                };

                context.Accounts.Add(admin);
                await context.SaveChangesAsync();
            }
        }
    }

}

using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Item> Items => Set<Item>();
        public DbSet<Category> Categories => Set<Category>();
        public DbSet<MainCategory> MainCategories => Set<MainCategory>();
        public DbSet<MenuInfo> MenuInfos => Set<MenuInfo>();
        public DbSet<Account> Accounts => Set<Account>();
    }
}

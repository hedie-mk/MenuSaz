using Domain.Entities;
using Domain.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Persistence.Configurations
{
    public class CategoryConfiguration : IEntityTypeConfiguration<Category>
    {
        public void Configure(EntityTypeBuilder<Category> builder)
        {
            builder.Property(c => c.Name)
                .HasMaxLength(30)
                .IsRequired();

            builder.Property(c => c.State)
                .HasConversion<string>()
                .HasDefaultValue(State.active);
            

            builder.Property(c => c.Priority)
                .HasDefaultValue(null);

            builder.HasOne(c => c.ParentCategory)
                .WithMany(m => m.Categories)
                .HasForeignKey(c => c.ParentCategoryId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasMany(c => c.Items)
                .WithOne(c => c.Category)
                .HasForeignKey(c => c.CategoryId)
                .OnDelete(DeleteBehavior.SetNull);

            builder.HasIndex(c => c.Name)
                .IsUnique(false);
        }
    }
}

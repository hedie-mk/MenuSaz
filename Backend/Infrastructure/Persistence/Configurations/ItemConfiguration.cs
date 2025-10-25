using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Persistence.Configurations
{
    public class ItemConfiguration : IEntityTypeConfiguration<Item>
    {
        public void Configure(EntityTypeBuilder<Item> builder)
        {
            builder.Property(i => i.Name)
                .HasMaxLength(100)
                .IsRequired();

            builder.Property(i => i.Description)
                 .HasMaxLength(500); 

            builder.Property(i => i.Price)
                .HasColumnType("decimal(18,2)")
                .IsRequired();

            builder.Property(i => i.DiscountedPrice)
            .HasColumnType("decimal(18,2)");

            builder.Property(i => i.State)
            .IsRequired()
            .HasConversion<string>();

            builder.HasOne(i => i.Category)
                .WithMany(c => c.Items)
                .HasForeignKey(i => i.CategoryId)
                .OnDelete(DeleteBehavior.SetNull);

            builder.HasIndex(i => i.Name)
                .IsUnique(false);

        }
    }
}

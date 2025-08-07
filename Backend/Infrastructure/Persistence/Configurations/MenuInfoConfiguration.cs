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
    public class MenuInfoConfiguration : IEntityTypeConfiguration<MenuInfo>
    {
        public void Configure(EntityTypeBuilder<MenuInfo> builder)
        {
            builder.Property(m => m.Name)
                .HasMaxLength(100)
                .IsRequired();

            builder.Property(m => m.WorkHour)
                .HasMaxLength(50)
                .IsRequired();
        }
    }
}

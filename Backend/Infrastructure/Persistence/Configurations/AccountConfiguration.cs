using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations
{
    public class AccountConfiguration : IEntityTypeConfiguration<Account>
    {
        public void Configure(EntityTypeBuilder<Account> builder)
        {
            builder.Property(a => a.UserName)
                .HasMaxLength(50)
                .IsRequired();

            builder.Property(a => a.Role)
                .HasConversion<string>();

            builder.Property(a => a.Password)
                .IsRequired();

            builder.HasIndex(a => a.UserName)
                .IsUnique();
        }
    }
}

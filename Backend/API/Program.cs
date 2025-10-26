using API.Extensions;
using API.Middlewares;
using Infrastructure.Context;
using Infrastructure.DI;
using Infrastructure.Helpers;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Serilog;

try
{

    var configuration = new ConfigurationBuilder()
        .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
        .AddJsonFile($"appsettings.{Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Production"}.json", optional: true)
        .AddEnvironmentVariables()
        .Build();

    Log.Logger = new LoggerConfiguration()
        .ReadFrom.Configuration(configuration)
        .Enrich.FromLogContext()
        .CreateLogger();

    Log.Information("Starting up web host");

    var builder = WebApplication.CreateBuilder(args);


    builder.Host.UseSerilog((ctx, lc) =>
    {
        lc.ReadFrom.Configuration(ctx.Configuration);

    });
    if (builder.Environment.IsDevelopment())
    {
        builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowFrontend",
                policy =>
                {
                    policy.WithOrigins("http://localhost:5173")
                          .AllowAnyHeader()
                          .AllowAnyMethod()
                          .AllowCredentials();
                });
        });
    }

    builder.Services.AddInfrastructure(builder.Configuration);
    builder.Services.AddControllers();
    builder.Services.AddEndpointsApiExplorer();

    // Custom services
    builder.Services.AddJwtAuthentication(builder.Configuration);
    builder.Services.AddSwaggerDocs();
    builder.Services.AddCustomAppServices(builder.Configuration, builder.Environment);

    var app = builder.Build();

    app.UseMiddleware<ExceptionHandlingMiddleware>();

    using (var scope = app.Services.CreateScope())
    {
        var services = scope.ServiceProvider;
        try
        {
            var context = services.GetRequiredService<AppDbContext>();
            context.Database.Migrate();
            await DbInitializer.SeedAsync(services);
        }
        catch (Exception ex)
        {

            Log.Error(ex, "An error occurred during migration/seeding.");
            throw;
        }
    }


    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }


    app.UseCors("AllowFrontend");

    app.UseHttpsRedirection();

    app.UseAuthentication();
    app.UseAuthorization();

    app.UseDefaultFiles();
    app.UseStaticFiles();

    app.UseStaticFiles(new StaticFileOptions
    {
        FileProvider = new PhysicalFileProvider(
            Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images")),
        RequestPath = "/images",
        OnPrepareResponse = ctx =>
        {
            ctx.Context.Response.Headers.Remove("Cache-Control");
            ctx.Context.Response.Headers.Append("Cache-Control", "public,max-age=2592000");
        }
    });


    app.MapControllers();

    app.MapFallbackToFile("index.html");

    await app.RunAsync();
}
catch (Exception ex)
{

    Log.Fatal(ex, "Host terminated unexpectedly");
}
finally
{
    Log.CloseAndFlush();
}

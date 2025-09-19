using API.Extensions;
using Infrastructure.Context;
using Infrastructure.DI;
using Infrastructure.Helpers;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;


var builder = WebApplication.CreateBuilder(args);

// ================== Services ==================

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

// ================== DB Migration & Seed ==================
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
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occurred during migration/seeding.");
    }
}

// ================== Middleware Pipeline ==================
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
// --- API Controllers ---
app.MapControllers();

// --- SPA fallback (React Router) ---
app.MapFallbackToFile("index.html");



app.Run();

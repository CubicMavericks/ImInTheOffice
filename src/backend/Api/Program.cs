using Api.Configurations;
using Api.Hubs;
using Microsoft.AspNetCore.HttpLogging;

var builder = WebApplication.CreateBuilder(args);
var allowAllOrigins = "_allowAllOrigins";
builder.Services.AddCors(options =>
{
    options.AddPolicy(allowAllOrigins, b =>
        b.WithOrigins("http://localhost:3000")
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials());
});
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddMongoDB(builder.Configuration);
builder.Services.RegisterRepositories();
builder.Services.AddSignalR();
builder.Services.AddLogging();
builder.Services.AddHttpLogging(s => s.LoggingFields = HttpLoggingFields.All);

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpLogging();
app.UseHttpsRedirection();
app.MapControllers();
app.UseCors(allowAllOrigins);
app.UseRouting();
app.UseAuthorization();
app.UseEndpoints(endpoints => endpoints.MapHub<NotificationHub>("/hubs/notification"));
app.Run();
using Api.Configurations;
using Api.Notifications;
using Microsoft.AspNetCore.HttpLogging;

var builder = WebApplication.CreateBuilder(args);
var allowAllOrigins = "_allowAllOrigins";

builder.Services.AddCors(options =>
{
    options.AddPolicy(allowAllOrigins, b =>
        b.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());
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
app.UseRouting();
app.UseCors(allowAllOrigins);
app.UseEndpoints(endpoints => endpoints.MapHub<NotificationHub>("/notificationHub"));

app.Run();
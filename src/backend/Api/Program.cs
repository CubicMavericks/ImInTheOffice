using Api.Configurations;
using Api.Notifications;

var builder = WebApplication.CreateBuilder(args);
//builder.Configuration.AddJsonFile("appsettings.Development.json");

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddMongoDB(builder.Configuration);
builder.Services.RegisterRepositories();
builder.Services.AddSignalR();

 builder.Services.AddCors(options =>{
                options.AddPolicy("Api", builder =>
                    builder.AllowAnyOrigin()
                            .AllowAnyMethod()
                            .AllowAnyHeader());
            });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

//app.UseAuthorization();

app.MapControllers();

app.UseRouting();
app.UseCors("Api");

app.UseEndpoints(endpoints =>{
   endpoints.MapHub<NotificationHub>("/notificationHub");
});
app.Run();

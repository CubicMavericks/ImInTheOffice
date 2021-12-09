using MongoDB.Driver;

namespace Api.Configurations
{
    public static class DBConfig
    {
           public static void AddMongoDB(this IServiceCollection services, IConfiguration configuration)
        {
             var connectionString = configuration.GetSection("MongoDBConnection");
            services.Configure<MongoSettings>(connectionString);
            
            var settings = connectionString.Get<MongoSettings>();
            
            services.AddSingleton((s) =>
            {
                IMongoClient client = new MongoClient(settings.ConnectionString);
                return client;
            });
        }
    }
}

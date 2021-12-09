using Api.Configurations;
using MongoDB.Driver;

namespace Api.Repository
{
    public class UserRepository : IUserRepository
    {
         private readonly IMongoClient _mongoClient;
        public readonly IMongoCollection<Users> _collection;

        public UserRepository(IMongoClient mongoClient, IConfiguration config)
        {
            _mongoClient = mongoClient;

            var connectionString = config.GetSection("MongoDBConnection");
            var settings = connectionString.Get<MongoSettings>();

            var database = _mongoClient.GetDatabase(settings.DataBase);
            _collection = database.GetCollection<Users>(settings.Collection);
        }

        public async Task Insert(Users voucher) => 
            await _collection.InsertOneAsync(voucher);

        public async Task<Users> FindByName(string name) =>
            await _collection.Find(p => p.Name == name).FirstOrDefaultAsync();
    }
}

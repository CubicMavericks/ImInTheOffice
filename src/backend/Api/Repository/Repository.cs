using System.Linq.Expressions;
using Api.Configurations;
using MongoDB.Driver;

namespace Api.Repository
{
    public class Repository<TEntity> : IRepository<TEntity>
    {
         private readonly IMongoClient _mongoClient;
        public readonly IMongoCollection<TEntity> _collection;

        public Repository(IMongoClient mongoClient, IConfiguration config)
        {
            _mongoClient = mongoClient;

            var connectionString = config.GetSection("MongoDBConnection");
            var settings = connectionString.Get<MongoSettings>();

            var database = _mongoClient.GetDatabase(settings.DataBase);
            _collection = database.GetCollection<TEntity>(typeof(TEntity).Name);
        }

        public async Task Insert(TEntity entity) => 
            await _collection.InsertOneAsync(entity);

        public async Task Update(Expression<Func<TEntity, bool>> expression, TEntity entity) =>
            await _collection.ReplaceOneAsync(expression, entity);

        public async Task<TEntity> Find(Expression<Func<TEntity, bool>> expression) =>
            await _collection.Find(expression).FirstOrDefaultAsync();

        public async Task<TEntity> Find(FilterDefinition<TEntity> filter) =>
            await _collection.Find(filter).FirstOrDefaultAsync();

        public async Task<List<TEntity>> List(Expression<Func<TEntity, bool>> expression) =>
            await _collection.Find(expression).ToListAsync();

        public async Task<List<TEntity>> List(FilterDefinition<TEntity> filter) =>
            await _collection.Find(filter).ToListAsync();
    }
}
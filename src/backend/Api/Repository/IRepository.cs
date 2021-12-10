using System;
using System.Linq.Expressions;
using MongoDB.Driver;

namespace Api.Repository
{
    public interface IRepository<TEntity>
    {
        Task Insert(TEntity entity);
        Task Update(Expression<Func<TEntity, bool>> expression, TEntity entity);
        Task<TEntity> Find(Expression<Func<TEntity, bool>> expression);
        Task<TEntity> Find(FilterDefinition<TEntity> filter);
        Task<List<TEntity>> List(Expression<Func<TEntity, bool>> expression);
        Task<List<TEntity>> List(FilterDefinition<TEntity> filter);
    }
}
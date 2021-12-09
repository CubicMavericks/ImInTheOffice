using System;
using System.Linq.Expressions;

namespace Api.Repository
{
    public interface IRepository<TEntity>
    {
        Task Insert(TEntity entity);
        Task Update(Expression<Func<TEntity, bool>> expression, TEntity entity);
        Task<TEntity> Find(Expression<Func<TEntity, bool>> expression);
    }
}
using System;

namespace Api.Repository
{
    public interface IUserRepository
    {
        Task Insert(Users voucher);
        Task<Users> FindByName(string name);
    }
}
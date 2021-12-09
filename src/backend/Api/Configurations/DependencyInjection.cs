using Api.Repository;

namespace Api.Configurations
{
   public static class DependencyInjection
    {
        public static void RegisterRepositories(this IServiceCollection services)
        {
             services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
        }
    }
}
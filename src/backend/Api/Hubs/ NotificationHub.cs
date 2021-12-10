using Api.Repository;
using Microsoft.AspNetCore.SignalR;

namespace Api.Hubs
{
    public interface INotificationClient
    {
        Task ReceiveNotification<TMessage>(TMessage message);
    }
    /// <summary>
    /// Class to notify when someone checkin / checkout the office
    /// </summary>
    public class  NotificationHub : Hub<INotificationClient>
    {
       
    }
}
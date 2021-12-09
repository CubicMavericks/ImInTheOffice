using Api.Repository;
using Microsoft.AspNetCore.SignalR;

namespace Api.Notifications
{
    /// <summary>
    /// Class to notify when someone checkin / checkout the office
    /// </summary>
    public class  NotificationHub : Hub
    {
        public async Task SendNotification(Users user)
        {
            await Clients.All.SendAsync("newNotification", "anonymous", user);
        }
    }
}
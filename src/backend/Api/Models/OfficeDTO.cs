using System;

namespace Api.Models
{
    public class OfficeDTO
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Avatar { get; set; }
        public DateTime DateCheckin { get; set; }
        public DateTime DateCheckout { get; set; }
        public string Action { get; set; }
    }
}

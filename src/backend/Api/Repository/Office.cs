using Api.Exceptions;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Api.Repository
{
    public class Office
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string UserId { get; set; }
        public DateTime DateLastCheckin { get; set; }
        public DateTime DateLastCheckout { get; set; }
        public bool UserInTheOffice { get; set; }

        public void SetCheckin() { 
            AllowCheckin();
            UserInTheOffice = true;
            DateLastCheckin = DateTime.UtcNow;
        }
         public void SetCheckout() { 
            AllowCheckout();
            UserInTheOffice = false;
            DateLastCheckout = DateTime.UtcNow;
        }

        private void AllowCheckout()
        {
            if(UserInTheOffice) return;

            throw new DomainException("You already have check out");
        }
         private void AllowCheckin()
        {
            if(UserInTheOffice == false) return;

            throw new DomainException("You already have check in");
        }

        public static class OfficeFactory
        {
            public static Office AsCheckin(string userId){
                var office = new Office
                    {
                        UserId = userId,
                    };
       
                office.SetCheckin();
                return office;
            }

             public static Office AsCheckout(string userId){
                var office = new Office
                    {
                        UserId = userId,
                    };

                office.SetCheckout();
                return office;
            }
        }
    }
}
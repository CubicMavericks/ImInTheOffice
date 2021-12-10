using MongoDB.Driver;

namespace Api.Repository
{
    public static class OfficeCheckinFilter
    {
        public static FilterDefinition<Office> BuildUserAndDate(string userId)
        {
            var initialDateTime = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, 0, 0, 0);
            var officeFilterBuilder = Builders<Office>.Filter;
            var officeFilter = officeFilterBuilder.Eq(x => x.UserId, userId)
                                    & officeFilterBuilder.Gte(x => x.DateLastCheckin, initialDateTime);
            return officeFilter;
        }

        public static FilterDefinition<Office> BuildUserAndDateWhenCheckin(string userId)
        {
            var initialDateTime = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, 0, 0, 0);
            var officeFilterBuilder = Builders<Office>.Filter;
            var officeFilter = officeFilterBuilder.Eq(x => x.UserId, userId)
                                    & officeFilterBuilder.Gte(x => x.DateLastCheckin, initialDateTime)
                                    & officeFilterBuilder.Eq(x => x.UserInTheOffice, true);
            return officeFilter;
        }

        public static FilterDefinition<Office> BuildPerDate()
        {
            var initialDateTime = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, 0, 0, 0);
            var officeFilterBuilder = Builders<Office>.Filter;
            var officeFilter = officeFilterBuilder.Gte(x => x.DateLastCheckin, initialDateTime);
            return officeFilter;
        }
    }
}
using MongoDB.Driver;

namespace Api.Repository
{
    public static class OfficeCheckinFilter
    {
        public static FilterDefinition<Office> Build(string userId)
        {
            var initialDateTime = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, 0, 0, 0);
            var officeFilterBuilder = Builders<Office>.Filter;
            var officeFilter = officeFilterBuilder.Eq(x => x.UserId, userId)
                                    & officeFilterBuilder.Gte(x => x.DateLastCheckin, new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, 0, 0, 0));
            return officeFilter;
        }
    }
}
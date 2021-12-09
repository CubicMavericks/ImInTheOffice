export default class OfficeService{
    async checkIn(userId){
       return request(userId, "checkin")
    }
    async checkOut(userId){
        return request(userId, "checkout")
    }
}
const request = async (userId, resource) => {
    const requestOptions = {
        crossDomain:true,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    };

    try {
        debugger;
        var response = await fetch('https://localhost:7128/office/' + resource + "/" + userId, requestOptions)
        const data = await response.json();
    
        if(!response.ok){
                const error = (data && data.message) || response.status;
                return error;
        }
        return data;
    } catch (error) {
        debugger;
    }
    
}
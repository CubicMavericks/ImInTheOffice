
export default class AuthService {
    signIn(email, callback) {
        const requestOptions = {
            crossDomain:true,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        };
        fetch('https://localhost:7128/user/signin', requestOptions)
       // .then(response => response.json())
        .then(async response => {
            const data = await response.json();
            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.stastus;
                return Promise.reject(error);
            }
            if(callback){
                callback(data);
            }
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    }

    signOut(callback) {
        return callback(true);
    }
}
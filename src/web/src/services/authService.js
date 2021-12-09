
export default class AuthService {
    signIn(email, callback) {
        const requestOptions = {
            crossDomain:true,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        };
        fetch('http://localhost:5031/Identity/login', requestOptions)
        .then(response => response.json())
        .then(async response => {
            debugger;
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }

          //  this.setState({ postId: data.id })
        })
        .catch(error => {
         //   this.setState({ errorMessage: error.toString() });
            console.error('There was an error!', error);
        });
    }

    signOut(callback) {
        return callback(true);
    }
}
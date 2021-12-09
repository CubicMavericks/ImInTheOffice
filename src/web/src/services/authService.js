export default class AuthService {
  signIn(email, callback) {
    
    const requestOptions = {
      crossDomain: true,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    };

    fetch("https://localhost:7128/user/signin", requestOptions)
      .then(async (response) => {
        const data = await response.json();

        if (!response.ok) {
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }

        if (callback) {
          callback(data);
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }

  signOut(callback) {
    return callback(true);
  }
}

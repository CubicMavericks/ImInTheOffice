export default class AuthService {
  signIn(email, callback, failCallback) {
    
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
          console.error(error);

          if (failCallback) {
            failCallback();
          }

          return;
        }

        if (callback) {
          callback(data);
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);

        if (failCallback) {
          failCallback();
        }
      });
  }

  signOut(callback) {
    return callback(true);
  }
}
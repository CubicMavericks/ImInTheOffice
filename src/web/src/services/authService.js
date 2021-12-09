export default class AuthService {
    signIn(email, callback) {
        return callback({
            user: {
                name: "Filipe Lima",
                email: email,
                id: "f110d913-8d45-41bb-933a-d94069761332"
            }
        });
    }

    signOut(callback) {
        return callback(true);
    }
}
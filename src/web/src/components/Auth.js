import * as React from "react";
import { Navigate, useLocation } from "react-router-dom";

import AuthService from "../services/authService";

const AuthContext = React.createContext();

// From https://usehooks.com/useLocalStorage/
function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = React.useState(() => {
      try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        console.log(error);
        return initialValue;
      }
    });

    const setValue = (value) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.log(error);
      }
    };
    return [storedValue, setValue];
  }

export function AuthProvider({children}) {
    const authService = new AuthService();
    const [user, setUser] = useLocalStorage("user", null);

    const signIn = (email, callback, failCallback) => {
        return authService.signIn(email,
          (userInfo) => {
            setUser(userInfo);
            if (callback) {
                callback();
            }
          },
          () => {
            if (failCallback) {
              failCallback();
            }
          });
    }

    const signOut = (callback) => {
        return authService.signOut((done) => {
            setUser(null)
            if (callback) {
                callback();
            }
        });
    }

    const setOfficeState = (inOffice) => {
      user.inOffice = inOffice;
      setUser(user);
    }

    let value = { user, signIn, signOut, setOfficeState };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return React.useContext(AuthContext);
}

export function RequireAuth({children}) {
    const auth = useAuth();
    const location = useLocation();

    console.log(auth);

    if (!auth.user) {
        return <Navigate to="/signin" state={{from: location}} />
    }

    return children;
}
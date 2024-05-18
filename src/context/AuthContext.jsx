import axios from "axios";
import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({})
    const [authError, setAuthError] = useState(null)

    const handleLogin = async (email, password) => {
        await axios.post(import.meta.env.VITE_API_LOGIN, {
            email: email,
            password: password
        }).then(function (response) {
            setUser(response.data);
            setAuthError(null)
        }).catch(function (error) {
            setAuthError(error.response.data);
        });
    }

    const handleRegister = async (fullName, email, password) => {
        await axios.post(import.meta.env.VITE_API_REGISTER, {
            name: fullName,
            email: email,
            password: password
        }).then(function (response) {
            setUser(response.data);
            setAuthError(null)
        }).catch(function (error) {
            setAuthError(error.response.data);
        });
    }

    const handleLogout = async() => {
        setUser({})
    }

    return (
        <AuthContext.Provider value={{
            user,
            setUser,
            handleLogin,
            handleRegister,
            handleLogout,
            authError,
            setAuthError
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
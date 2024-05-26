import axiosInstance from "../constants/axios";
import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({})
    const [authError, setAuthError] = useState(null)

    const getUser = async () => {
        const { data } = await axiosInstance.get("/api/user")
        console.log(data);
        setUser(data)
    }

    const handleLogin = async (email, password, callback) => {
        await axiosInstance.post("/login", {
            email: email,
            password: password
        }).then(function (response) {
            getUser()
            setAuthError(null)
            callback()
        }).catch(function (error) {
            setAuthError(error.response?.data);
            console.log(error.response?.data);
        });
    }

    const handleRegister = async (fullName, email, password, passwordConf, callback) => {
        await axiosInstance.post("/register", {
            name: fullName,
            email: email,
            password: password,
            password_confirmation: passwordConf,
        }).then(function (response) {
            getUser()
            setAuthError(null)
           callback()
        }).catch(function (error) {
            setAuthError(error.response.data);
        });
    }

    const handleLogout = async() => {
        await axiosInstance.post('/logout').then(function (response) {
            setUser({})
        })
    }

    return (
        <AuthContext.Provider value={{
            user,
            setUser,
            handleLogin,
            handleRegister,
            handleLogout,
            authError,
            setAuthError,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
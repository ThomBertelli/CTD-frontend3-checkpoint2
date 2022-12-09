import { createContext, useContext, useState } from "react";


export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {

    const tokenLocalStorage = localStorage.getItem('token')

    const [token, setToken] = useState(tokenLocalStorage)

    localStorage.setItem('token',token)


    return (
        <AuthContext.Provider value={{ token, setToken }}>

            {children}

        </AuthContext.Provider>

    )
}

export const useAuth = () => useContext(AuthContext)
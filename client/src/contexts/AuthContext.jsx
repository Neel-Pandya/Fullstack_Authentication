import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({
    authToken: '',
    setAuthToken: (token) => {
        throw new Error('setAuthToken is called outside of AuthProvider')
    }
})


const AuthProvider = ({ children }) => {

    const [authToken, setAuthToken] = useState(() => localStorage.getItem('auth-token') || "");

    useEffect(() => {
        authToken ? localStorage.setItem('auth-token', authToken) : localStorage.removeItem('auth-token', authToken);
    }, [authToken]);

    return <AuthContext.Provider value={{ authToken, setAuthToken }}>
        {children}
    </AuthContext.Provider>
}

const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context){
        throw new Error('useAuthContext called outside of AuthProvider');
    }
    return context;
}

export {AuthContext, AuthProvider, useAuthContext}
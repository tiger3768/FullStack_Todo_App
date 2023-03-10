import { createContext, useContext, useState } from "react";
import { apiClient, getAuthenticated } from "../api/TodoApiService";

export const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext) 

export default function AuthProvider({children}){
    const[isAuthenticated, setAuthenticated] = useState(false)
    const[username, setUsername] = useState(null)
    const [token, setToken] = useState()
    async function login(username, password) {
        try {
          const response = await getAuthenticated(username, password);
            if (response.status === 200) {
                setAuthenticated(true);
                setUsername(username);
                const bAToken = 'Bearer ' + response.data.token;
                setToken(bAToken);
                apiClient.interceptors.request.use((config) => {
                    config.headers.Authorization = bAToken;
                    return config;
                });
                return true;
            } 
            else {
                logout();
                return false;
            }
        } 
        catch (error) {
            logout();
            return false;
        }
    }
    function logout(){
        setToken(null)
        setAuthenticated(false)
        setUsername(null)
    }
    return(
        <AuthContext.Provider value={{isAuthenticated, login, logout, username, token}}>
            {children}
        </AuthContext.Provider>
    )
}
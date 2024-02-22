import  { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { checkAuthStatus, loginUser, logoutUser, signupUser } from '../helpers/api-communicator';



type User = {
    name: string;
    email: string;
};
type UserAuth = {
    isLoggedIn: boolean;
    user: User | null;
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (name: string, email: string, password: string) => Promise<void>;
    logOut: () => Promise<void>;
}

const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const [user, setUser] = useState<User | null>(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    useEffect(() => {
        async function checkStatus() {
            const data = await checkAuthStatus()
            if (data.success===true) {
                setUser({ email: data.email, name: data.name })
                setIsLoggedIn(true);
            }
        }
        checkStatus()

    }, [])


    const signIn = async (email: string, password: string) => {
        const data = await loginUser(email, password);
        if (data.success===true) {
            setUser({ email: data.email, name: data.name })
            setIsLoggedIn(true);
            return data;
        }
        if(data.success===false){
            return data;
        }
        if(data.errors){
            return data
        }

    }
    const signUp = async (name: string, email: string, password: string) => {
        const data=await signupUser(name,email,password);
        if (data.success===true) {
            setUser({ email: data.email, name: data.name })
            setIsLoggedIn(true);
        }
        if(data.success===false){
            return data;
        }
        if(data.errors){
            return data
        }
     }
    const logOut = async () => { 
        await logoutUser();
        setIsLoggedIn(false);
        setUser(null)
        window.location.reload();
    }


    const value = {
        user,
        isLoggedIn, signIn, signUp, logOut
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
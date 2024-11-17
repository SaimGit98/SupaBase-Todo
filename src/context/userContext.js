'use client'
import { createContext, useEffect, useState } from "react";
import { supabase } from "@/client";

export const UserContext = createContext();


const MyUser = (({ children }) => {

    const [user, setUser] = useState(() => {
        if (typeof window !== "undefined"){
            const storedUser = localStorage.getItem("user")
            return storedUser ? JSON.parse(storedUser) : null
        }
        return null
    });

    useEffect(() => {

        const getSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            const currentUser = session?.user ?? null;

            if (currentUser) {
                localStorage.setItem('user', JSON.stringify(currentUser));
                setUser(currentUser);
            }
        };

        getSession();

        console.log("first render : ", user)

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (event,session) => {
               const currentUser = session?.user?? null ;
                if (currentUser) {
                    localStorage.setItem("user" , JSON.stringify(currentUser))
                    setUser(currentUser);
                } 
                else{
                    localStorage.removeItem('user')
                }
            }
        );


        return () => {
            subscription.unsubscribe();
        };
    }, [user]);
    

  

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>

    )
})
export default MyUser;
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext=createContext();

export const AuthContextProvider=({children})=>{
    const [currentUser, setCurrentUser]=useState(JSON.parse(localStorage.getItem("user")||null));

    const login=async(inputs)=>{
      const res=await axios.post("/auth/login", inputs);
      localStorage.setItem("token", res.data.token);
      setCurrentUser(res.data.other);
    };

    const logout=async(inputs)=>{
      setCurrentUser(null);
      localStorage.clear();
    };

    useEffect(()=>{
        localStorage.setItem("user", JSON.stringify(currentUser));
    },[currentUser]);

    return(
        <AuthContext.Provider value={{currentUser, setCurrentUser, login, logout}}>{children}</AuthContext.Provider>
    )
};
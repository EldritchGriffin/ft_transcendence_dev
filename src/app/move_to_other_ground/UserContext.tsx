// // UserContext.js
// import React, { createContext, useContext, useState } from 'react';

// const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   const login = (userData) => {
//     setUser(userData);
//   };

//   const logout = () => {
//     setUser(null);
//   };

//   return (
//     <UserContext.Provider value={{ user, login, logout }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = () => {
//   return useContext(UserContext);
// };


'use client';

import { createContext, useContext, Dispatch, SetStateAction, useState } from "react";

type DataType = {
    firstName: string
}

interface ContextProps {
    userId: string,
    setUserId: Dispatch<SetStateAction<string>>,
    data: DataType[],
    setData: Dispatch<SetStateAction<DataType[]>>
}

export const useGlobalContext = createContext<ContextProps>({
    userId: 'JAHAD', 
    setUserId: (props): string => '',
    data: [],
    setData: (): string[] => [] 
})

export const GlobalContextProvider = ({ children }) => {
    const [userId, setUserId] = useState('');
    const [data, setData] = useState<[] | DataType[]>([]);
    
    return (
        <useGlobalContext.Provider value={{ userId, setUserId, data, setData }}>
            {children}
        </useGlobalContext.Provider>
    )
};

// export const useGlobalContext = () => useContext(GlobalContext);



"use client";

import { fetchCurrentUser } from '../(handlers)/requestHandler';
import {  usePathname, useRouter } from "next/navigation";
import React, { Fragment, useEffect, useMemo, useRef } from "react";
import { useState } from "react";
import { User } from "../(interfaces)/userInterface";
import Navbar_compo from './navbar';
import { toast } from 'react-toastify';

export const Ft_memo = (props:any) => {
  
    const router = useRouter();
    const [valid, setValid] = useState<boolean>(false);
  const [currUser, setCurrUser] = useState<User | null>(null);
  const checkpathname = usePathname();

    const fetchuser = async () => {
        try {
          const res = await fetchCurrentUser();
          setCurrUser(res);
        } catch (error) {
            toast.error("could not fetch the user, redirect to login")
            router.push("/")
        }
      };

    useEffect(() => {
        fetchuser();
    },[checkpathname])
    useEffect(() => {
        toast.info(`pathname is ${checkpathname}`)
        if(currUser)
        {
            if(!currUser.nickname)
            {
                router.push("/setupNickName")
            }
            else
                setValid(true);
        }
    }, [currUser, checkpathname])
  
    return (
            valid ? <><Navbar_compo /> {props.children}</> : null
  )
}


// export const Ft_memo = () => {
  
//     return
//     (
//         <>
            
//         </>
//     );
// }

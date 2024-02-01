"use client";
import React, { useRef } from "react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function auth() {
  const [value, setValue] = useState<string[]>(Array(6).fill(""));
  const [activeinput, setActiveinput] = useState<number>(0);
  const code = value.join("");
  const inputRef = useRef<HTMLInputElement>(null);
  const handleonchange = (e:any, index:any) => {
    const otp = e.target.value;
    setValue((prev) => {
      const prevValue = [...prev];
      prevValue[index] = otp;
      return prevValue;
    });
    if (otp !== "") {
      setActiveinput(index + 1);
    } else if (otp === "") {
      setActiveinput(index - 1);
    } 
  };
  useEffect(() => {
    inputRef.current?.focus();
  }, [activeinput]);

  const [image, setImage] = useState();

  const backendUrl = "http://192.168.1.50:3001/user/validate2fa";

  const backendUrl2 = "http://192.168.1.50:3001/user/enable2fa";

  const oneDigit = (inputField: any) => {
    if (inputField.value.length > 1) {
        inputField.value = inputField.value.slice(0, 1);
    }
  }

  useEffect(() => {
    axios.get(backendUrl2, { withCredentials: true})
    .then((res) => {
      console.log(res);
    setImage(res);
    })
    .catch((error) => {
      console.error('Error:', error);
    })
  }, []);
  const handleButtonClick = () => {
    const requestData = {
      code: code,
    };
    console.log(requestData);
    axios.post(backendUrl, requestData, { withCredentials: true})
    .then((res) => {
      console.log(res.data);
    })
    .catch((error) => {
      console.error('Error:', error);
    })
    .finally(() => {
      setValue(Array(6).fill(""));
    });
  }
  console.log(code);
  return (
   <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bck py-12">
    <div className="flex justify-center">

    <span className=" text-white">2FA Enabled</span>
    </div>

</div>
  );
}
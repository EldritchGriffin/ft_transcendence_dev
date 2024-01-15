"use client";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function TwoFactor() {
  const [value, setValue] = useState<string[]>(Array(6).fill(""));
  const [activeinput, setActiveinput] = useState<number>(0);
  const code = value.join("");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const handleonchange = (e: React.ChangeEvent<HTMLInputElement>, index:number) => {
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


  const backendUrl = "http://localhost:3001/auth/signinTFA";

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
  return (
   <div className="relative flex min-h-screen flex-col justify-center overflow-hidden py-12">
    <div className="flex justify-center">

    <span className="relative  text-white text-[28px]">2FA Enabled</span>
    </div>
  <div className="relative bg-primary_blue bck2 px-16 pt-10  flex justify-around pb-9 shadow-xl mx-auto w-[280px] sm:w-[600px] xl:w-[952px]">
    <div className="flex  w-full flex-col space-y-28">
      <div className="flex flex-col items-center justify-center text-center space-y-2">
        <div className="text-xl text-white">
          <p>Enter 6-digit code from your 2FA application</p>
        </div>
      </div>
      <div>
          <div className="flex flex-col space-y-16 ">
            <div className="flex flex-row  items-center justify-between w-full ">
              {value.map((value, index) => (
              <input
                ref={index === activeinput ? inputRef : null}
                className="h-16 w-[20px] sm:h-[43px] sm:w-[50px] flex flex-col items-center justify-center text-center  outline-none border-b-4 border-white  text-white  text-sm lg:text-2xl bg-primary_blue"
                key={index}
                name="otp"
                onChange= {(e) => handleonchange(e, index)}
              />
              ))
              }
            </div>
            <div className="flex flex-col ">
              <div className="flex justify-center">
                <button 
                  className="flex flex-row items-center justify-center w-[110px] h-[48px] text-center outline-none py-5 bg-accent_red border-none text-white text-2xl shadow-sm"
                  onClick={handleButtonClick}
                  >
                  Submit
                </button>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</div>
  );
}
"use client";
import React from "react";
import { useEffect, useState,useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import OtpInput from 'react-otp-input';
import { getImage, validTfa } from "../(handlers)/requestHandler";


export default function Model2Fa({OpenModel, settwofa,CloseModel}:any) {
  let current: number = 0;
  const [value, setValue] = useState<string[]>(Array(6).fill(""));
  const [activeinput, setActiveinput] = useState<number>(0);
  const code = value.join("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [otp, setOtp] = useState('');
  const [image, setImage] = useState<any>();
  const handleonchange = ({target}: React.ChangeEvent<HTMLInputElement>) => {
    const otp = target.value;
    setValue((prev) => {
      const prevValue = [...prev];
      prevValue[current] = otp;
      return prevValue;
    });
    if (!otp) {
      setActiveinput(current - 1);
    } else {
      setActiveinput(current + 1);
    }
  };
  
  const oneDigit = (Input: any) => {
    {
      if (Input.value.length > 1) {
        Input.value = Input.value.slice(0, 1);
      }
    }
  }
  useEffect(() => {
    inputRef.current?.focus();

  }, [activeinput]);
  
  const handelOnkeydown = (
    {key}: React.KeyboardEvent<HTMLInputElement>,
    index: number
    ) => {
      current = index;
      console.log("value = ", value[0], "index = ", current)
      if (key === "Backspace" && value[current] === "") {
        setActiveinput(current - 1);
      }
  };

  const backendUrl = "http://localhost:3001/user/validate2fa";

  const backendUrl2 = "http://localhost:3001/user/enable2fa";

  const getimage = async () => {
    try {

      const res = await getImage();
      setImage(res);
      // const res = await axios.get(backendUrl2, { withCredentials: true });
      // if(res.status >= 200 && res.status < 300){
      //   const data = await res.data;
      //   setImage(data);
      // }
    } catch (error) {
      toast.error("Already enabled 2FA");
    }
  }

  useEffect(() => {
    getimage();
  }, []);

  const handleButtonClick = async () => {
    const requestData = {
      code: otp as string,
    };
    console.log("******",requestData)
    try{

      const res = await validTfa(requestData);
      settwofa(true);
      CloseModel(false);
      // const res = await  axios.post(backendUrl, requestData, { withCredentials: true });
      // if (res.status >= 200 && res.status < 300) {
      //   toast.success("2FA enabled successfully");
      //   settwofa(true);
      //   CloseModel(false);
      // }
      // else{
      //   toast.error("Invalid 2FA code");
      // }
    } catch (error) {
      toast.error("Invalid 2FA code");
    }

  };
  if(!OpenModel) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-20 ">
        <div className=" flex flex-col">
            <button className='text-white text-xl place-self-end'
                onClick={() => CloseModel(false)}
            >
                X
            </button>
            <div className="bg-white p-2 h-full rounded">
            <div className="relative bck2 px-16 pt-10  flex justify-around pb-9 shadow-sm mx-auto w-[280px] sm:w-[600px] xl:w-[952px]">
                    <div className="flex  w-full flex-col space-y-8">
                    <div className="flex flex-col items-center justify-center text-center">
                      <div className="font-bold text-2xl flex flex-col space-y-5 text-black justify-center items-center">
                        <p>Enter 6-digit code from your 2FA application</p>
                        <img src={image} alt="" className="w-[150px] h-[150px] sm:w-[250px] sm:h-[250px] lg:w-[300px] lg:h-[300px]" />
                      </div>
                    </div>
                    <div>
                      <div className="flex flex-col space-y-16 ">
                        <div className="flex flex-row  items-center justify-center w-full ">
                        <OtpInput
                          value={otp}
                          onChange={setOtp}
                          numInputs={6}
                          containerStyle={"gap-4 md:gap-8 xl:gap-10"}
                          inputStyle={'h-16 w-[20px] sm:h-[43px] sm:w-[50px] flex flex-col items-center justify-center text-center  outline-none border-b-2 border-black  text-black inpute_code text-sm lg:text-2xl'}
                          renderSeparator={<span>&nbsp;</span>}
                          renderInput={(props) => <input {...props} />}
                        />
                        </div>
                        <div className="flex flex-col ">
                          <div className="flex justify-center">
                            <button
                              className="flex flex-row items-center justify-center w-[110px] h-[48px] text-center outline-none py-5 btncolor border-none text-white text-2xl shadow-sm"
                              onClick={()=> handleButtonClick() }
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
        </div>
        </div>
  )
}


// className="h-16 w-[20px] sm:h-[43px] sm:w-[50px] flex flex-col items-center justify-center text-center  outline-none border-b-4 border-black  text-black inpute_code text-sm lg:text-2xl"
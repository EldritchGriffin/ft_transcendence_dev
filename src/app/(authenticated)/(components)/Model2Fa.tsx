"use client";
import React, { useRef } from "react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Model2Fa({OpenModel, CloseModel}:any) {
    if(!OpenModel) return null;
    let current: number = 0;
  const [value, setValue] = useState<string[]>(Array(6).fill(""));
  const [activeinput, setActiveinput] = useState<number>(0);
  const code = value.join("");
  const inputRef = useRef<HTMLInputElement>(null);
  const handleonchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const otp = e.target.value;
    setValue((prev) => {
      const prevValue = [...prev];
      prevValue[current] = otp;
      return prevValue;
    });
    if (otp !== "") {
      setActiveinput(current + 1);
    } else if (otp === "") {
      setActiveinput(current - 1);
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
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    current = index;
    if (e.key === "Backspace") {
      setActiveinput(current - 1);
    }
  };

  const [image, setImage] = useState<any>();

  const backendUrl = "http://localhost:3001/user/validate2fa";

  const backendUrl2 = "http://localhost:3001/user/enable2fa";

  useEffect(() => {
    axios
      .get(backendUrl2, { withCredentials: true })
      .then((res) => {
        // console.log("anass image",res.data);
        setImage(res.data);
      })
      .catch((error) => {
        // console.log("l7waa")
        console.error("Error:", error);
      });
  }, []);

  // console.log("image",image)
  const handleButtonClick = () => {
    const requestData = {
      code: code as string,
    };
    // console.log(requestData);
    axios
      .post(backendUrl, requestData, { withCredentials: true })
      .then((res) => {
        // console.log(res.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setValue(Array(6).fill(""));
      });
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-20 ">
        <div className=" flex flex-col">
            <button className='text-white text-xl place-self-end'
                onClick={CloseModel}
            >
                X
            </button>
            <div className="bg-white p-2 h-full rounded ">
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
                        <div className="flex flex-row items-center justify-between w-full ">
                          {value.map((value, index) => (
                            <input
                              ref={index === activeinput ? inputRef : null}
                              className="h-16 w-[20px] sm:h-[43px] sm:w-[50px] flex flex-col items-center justify-center text-center  outline-none border-b-4 border-black  text-black inpute_code text-sm lg:text-2xl"
                              key={index}
                              type="number"
                              name="otp"
                              onInput={(e) => oneDigit(e.target)}
                              onChange={handleonchange}
                              // onKeyDown={(e) => handelOnkeydown(e, index)}
                            />
                          ))}
                        </div>
                        <div className="flex flex-col ">
                          <div className="flex justify-center">
                            <button
                              className="flex flex-row items-center justify-center w-[110px] h-[48px] text-center outline-none py-5 btncolor border-none text-white text-2xl shadow-sm"
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

{/* <div className="relative bck2 px-16 pt-10  flex justify-around pb-9 shadow-xl mx-auto w-[280px] sm:w-[600px] xl:w-[952px]">
    <div className="flex  w-full flex-col space-y-8">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="font-bold text-2xl flex flex-col space-y-5 text-white justify-center items-center">
          <p>Enter 6-digit code from your 2FA application</p>
          <img src={image} alt="" className="w-[150px] h-[150px] sm:w-[250px] sm:h-[250px] lg:w-[300px] lg:h-[300px]"/>
        </div>
      </div>
      <div>
          <div className="flex flex-col space-y-16 ">
            <div className="flex flex-row items-center justify-between w-full ">
              {value.map((value, index) => (
              <input
                ref={index === activeinput ? inputRef : null}
                className="h-16 w-[20px] sm:h-[43px] sm:w-[50px] flex flex-col items-center justify-center text-center  outline-none border-b-4 border-black  text-black inpute_code text-sm lg:text-2xl"
                key={index}
                type="number"
                // maxLength={1}
                onInput={(e) => oneDigit(e.target)}
                name="otp"
                onChange={handleonchange}
              />
              ))
              }
            </div>
            <div className="flex flex-col ">
              <div className="flex justify-center">
                <button 
                  className="flex flex-row items-center justify-center w-[110px] h-[48px] text-center outline-none py-5 btncolor border-none text-white text-2xl shadow-sm"
                  onClick={handleButtonClick}
                  >
                  Submit
                </button>
              </div>
            </div>
          </div>
      
      </div>
    </div>
  </div> */}
            </div>
        </div>
        </div>
  )
}

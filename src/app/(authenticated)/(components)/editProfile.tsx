"use client";
import React, { useEffect, useState, useRef } from "react";

export default function Edit_nickname(props: any) {
  // if (!props)
  //   return ;
  const [NickName, setNickName] = useState(props.user_data.intraLogin);
  const [updatenick, setupdatenick] = useState("");
  const [new_file, setnew_file] = useState<File>();
  const [errimg, seterrimg] = useState(0);
  const [errNickName, seterrNickName] = useState(0);
  useEffect(() => {
    var fileInput = document.getElementById("inpt");
    var imageDisplay = document.getElementById(
      "profile_pic"
    ) as HTMLImageElement;
    if (fileInput && imageDisplay) {
      fileInput.addEventListener("input", function (event) {
        if (event && event.target) {
          var fileInputTarget = event.target as HTMLInputElement;
          var file = fileInputTarget.files?.[0];
          if (file && file.type.startsWith("image/")) {
            setnew_file(file);
            displayImage(file);
          } else {
            alert("Please select a valid image file.");
          }
        }
      });
    }
    function displayImage(file: any) {
      var reader = new FileReader();
      reader.onload = function (e) {
        if (e.target && imageDisplay) {
          var imageUrl = e.target.result;
          imageDisplay.src = imageUrl as string;
        }
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleImageUpload = async (event: any) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    if (file) {
      setnew_file(file);
    }
  };

  const handleClickProgrammatically = () => {
    // here i automaticly click the input_file to make it
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleNickNameUpload = async (name: any) => {
    // after the new NickName passes the error checks i POST it on the back-end
    if (!name) return;
    try {
      const new_nickname = "http://localhost:3001/user/updatenick/" + name;
      const res = await fetch(new_nickname, {
        method: "POST",
        mode: "cors",
        credentials: "include",
      });
      if (!res.ok)
        throw new Error(
          "An error occurred while attempting to update the new Nickname."
        );
    } catch (error) {
      console.log(error);
    }
  };
  const handleFileUpload = async (files: any) => {
    // here i made the final tests for the new Profile Picture before POSTED on the back-end
    if (files.size > 5 * 10 ** 6) {
      console.log("wrong image size !:", files.size);
      seterrimg(1);
      return;
    }

    if (files.type !== "image/jpeg") {
      console.log("wrong image type !:", files.type);
      seterrimg(1);
      return;
    }

    console.log(
      "correct image type !:",
      files.type,
      "correct image size !:",
      files.size
    );
    if (!files) return;
    try {
      seterrimg(0);
      const data = new FormData();
      data.append("avatar", files);
      const res = await fetch("http://localhost:3001/user/updateavatar", {
        mode: "cors",
        credentials: "include",
        method: "POST",
        body: data,
      });
      if (!res.ok)
        throw new Error(
          "An error occurred while attempting to update the new profile picture."
        );
    } catch (error) {
      console.log(error);
    }
  };
  const handleInputChangek = (event: any) => {
    // here i keep the state of the updated NickName updated when the user click on "Enter" button
    if (event.key === "Enter") {
      handleInputChange(event);
    }
  };
  const handleInputChange = (event: any) => {
    // here i keep the state of the updated NickName updated when ever a character is wroten or removed from the input field
    setupdatenick(event.target.value);
  };
  const updateNickname = () => {
    // here i check the values that will be POSTED to the back-end for any error
    const nickname_state = document.getElementById("inpt_nickname");
    const validInput = /^[a-zA-Z0-9]*$/;
    if (
      updatenick.length > 32 ||
      updatenick.length == 0 ||
      !validInput.test(updatenick)
    ) {
      if (nickname_state) nickname_state.style.borderColor = "red";
      seterrNickName(1);
    } else {
      seterrNickName(0);
      if (nickname_state) nickname_state.style.borderColor = "white";
      handleNickNameUpload(updatenick);
    }
    if (!new_file) console.log("FILE NOT SELECTED!!");
    else handleFileUpload(new_file);
  };
  return (
    <div className="h-full w-full edit_n ickname bg-primary_blue flex flex-col items-center space-y-10 pt-10">
      <div className="h-fit w-fit flex flex-col items-center">
        <div className="h-fit w-fit border border-pink-500 relative flex justify-center ">
          <img
            src={props.user_data.avatarLink}
            id="profile_pic"
            className=" h-32 w-28 border-4 border-red-400 "
          />
          <button
            className=" w-9 h-6 bg-red-500 font-bold text-white absolute bottom-[-10px]"
            onClick={handleClickProgrammatically}
          >
            {" "}
            Edit{" "}
          </button>
          <input
            name="image"
            type="file"
            placeholder="Edit"
            id="inpt"
            accept="/image/*"
            className="outline-none oda w-0 h-0 bg-red-500  absolute bottom-[-10px] opacity-0 "
            ref={inputRef}
            onClick={handleImageUpload}
          />
        </div>
        {errimg ? (
          <span className="font-bold pt-2 border-solid text-xs  text-red-600 ">
            {" "}
            Wrong Image{" "}
          </span>
        ) : null}
      </div>
      <span className="font-bold text-white"> {NickName} </span>
      <div className="h-fit w-fit flex flex-col items-center">
        <input
          type="text"
          id="inpt_nickname"
          className="outline-none bg-primary_blue border-b-2 border-white-500  text-sm font-bold text-white"
          placeholder="NickName"
          onChange={handleInputChange}
          onKeyDown={handleInputChangek}
        />
        {errNickName ? (
          <span className="font-bold pt-0 border-solid text-xs text-red-600 ">
            {" "}
            Wrong NickName{" "}
          </span>
        ) : null}
      </div>
      <button
        className="bg-red-500 h-10 w-16 font-bold text-white"
        onClick={updateNickname}
      >
        {" "}
        Save{" "}
      </button>
    </div>
  );
}

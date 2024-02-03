"use client";
import React, { useEffect, useState, useRef } from 'react';
// import ClipLoader from "react-spinners/ClipLoader";
// import BeatLoader from "react-spinners/ClipLoader";
// import GridLoader from "react-spinners/ClipLoader";
// import HashLoader from "react-spinners/ClipLoader";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { fetchUsernickname, postUserAvatar } from '../(handlers)/requestHandler';

export default  function EditNickname( props:any ) {
  const router = useRouter();
    const [NickName, setNickName] = useState<any>(props.user_data?.intraLogin);
    const [updatenick, setupdatenick] = useState<any>(props.user_data?.nickname);
    const [new_file, setnew_file] = useState<File>();
    const [image, setRes] = useState(true); 
    const [name, setName] = useState(true); 
    let imgflag = 0;
    let nickflag = 0;
    const inputRef = useRef<HTMLInputElement | null>(null);
  const handleClickProgrammatically = () => { // here i automaticly click the input_file to make it 
    if (inputRef?.current) {
      inputRef?.current.click();
    }
  };
  const handleNickNameUpload = async (name:any) => { // after the new NickName passes the error checks i POST it on the back-end
    if (!name)  return 
    try{

      setName(false);
      // const new_nickname = "http://localhost:3001/user/updatenick/" + name;
      const res = await fetchUsernickname(name);
      // const res = await fetch(new_nickname, {
        //   method: 'POST',   
        //   mode: 'cors',
        //   credentials : 'include',
        // }).then((res) =>{
          setName(true)
          // }).catch((error)=>{
        }
        catch(error){
          toast.error("Invalid NickName ");
        }
  };
  const handleInputChangek = (event:any) => {// here i keep the state of the updated NickName updated when the user click on "Enter" button
    if (event?.key === 'Enter') {
      handleInputChange(event);
    }
  }
  const handleInputChange = (event:any) => { // here i keep the state of the updated NickName updated when ever a character is wroten or removed from the input field
    setupdatenick(event?.target?.value);
  }
  const handleFileUpload =  (files:any) => { // here i made the final tests for the new Profile Picture before POSTED on the back-end
    if (files && files.type !== "image/jpeg")
    {
      imgflag = 1;
                  toast.error("image type error");
      return 1;
    } 
   else if (files && files.size > 5 * 10 **6)  
    {
      imgflag = 1;
      toast.error("image size error");

      return 1;
    }
      imgflag = 0;
      const data = new FormData();
      data.append('avatar', files);
        setRes(false);
        // const res =   fetch('http://localhost:3001/user/updateavatar', {
        //   mode: 'cors',
        //   credentials : 'include',
        //   method: 'POST',   
        //   body: data
        // }).then((res)=>{
        //   setRes(true);
        //   imgflag = 0;
        //   toast.success("Avatar updated successfully");
        // }).catch((error)=>{
  const handleAvatarUpload = async (setavatar:any) => { // after the new NickName passes the error checks i POST it on the back-end

          try {
            
            const res =   await postUserAvatar(setavatar);
              setRes(true);
            }
            catch(error){
              toast.error("invalide Image");
              setRes(true);
        }
      }
      handleAvatarUpload(data);
      var imageDisplay = document.getElementById('profile_pic') as HTMLImageElement;
              var reader = new FileReader();
              reader.onload = function (e) {
                if (e.target && imageDisplay)
                {
                  var imageUrl = e.target.result;
                  imageDisplay.src = imageUrl as string;
                }
              };
              reader.readAsDataURL(files);
  };
    const updateNickname = () => { // here i check the values that will be POSTED to the back-end for any error
      const nickname_state = document.getElementById("inpt_nickname");
      const validInput = /^[a-zA-Z0-9]*$/;
      if (!updatenick || updatenick?.length < 3 || updatenick?.length > 15 || updatenick?.length === 0 || !validInput?.test(updatenick) || !/^[a-zA-Z]*$/.test(updatenick?.charAt(0)))
      {
        if (nickname_state)
         nickname_state.style.borderColor = 'red';
        nickflag = 1;
        toast.error("Invalid NickName");
      }
      else
      {
        nickflag = 0;
        if (nickname_state)
          nickname_state.style.borderColor = 'white';
      handleNickNameUpload(updatenick);
      if(!name || !image)
      {
        console.log("image or name still not fullfilled");
      }
      if(name && image)
        router.push("/user/me");
    }
    }
    return (
      <div className="h-full w-full  bg-primary_blue flex flex-col items-center space-y-10 pt-20"  style={{ 
          opacity: (!name || !image) ? 0.4 : 1
        }} >

            <div className="h-fit w-fit flex flex-col items-center">
            <div className="h-fit w-fit border border-accent_red relative flex justify-center ">
                <img src={props.user_data?.avatarLink} id="profile_pic" className=" h-44 w-44 border-4 border-red-400 " />
                <button  className=" w-12 h-6 bg-accent_red font-bold text-white absolute bottom-[-10px]" onClick={handleClickProgrammatically} > Edit </button>
                <input  name="image" onChange={(e)=>{handleFileUpload(e.target.files?.[0])}} type="file" placeholder="Edit" id='inpt' accept='/image/*' className="outline-none  h-10 w-10 bg-red-500 hidden green absolute bottom-[-10px] opacity-10 " ref={inputRef} 
                 />
            </div>
             </div>
            <span  className="font-bold w-24 text-4xl h-12 items-center pr-32  text-white"> {NickName} </span>
            <div className="h-fit w-fit flex flex-col items-center">
              <input type="text" id='inpt_nickname' className="outline-none bg-primary_blue border-b-2 border-white-500  text-lg font-bold text-white" placeholder="NickName" defaultValue={updatenick} onChange={handleInputChange} onKeyDown={handleInputChangek} />
            </div>
            <button className="bg-accent_red h-12 w-20 text-xl  text-white" onClick={updateNickname}> Save </button>
             </div>
    );
  }



// 401
//            403  Forbidden action
//            415 
// 302
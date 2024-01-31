"use client";
import React, { useEffect, useState, useRef } from 'react';
// import ClipLoader from "react-spinners/ClipLoader";
// import BeatLoader from "react-spinners/ClipLoader";
// import GridLoader from "react-spinners/ClipLoader";
// import HashLoader from "react-spinners/ClipLoader";
import { useRouter } from 'next/navigation';

export default  function Edit_nickname( props:any ) {
  const router = useRouter();


  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");



    const [NickName, setNickName] = useState(props.user_data?.intraLogin);
    const [updatenick, setupdatenick] = useState(props.user_data?.nickname);
    const [new_file, setnew_file] = useState<File>();
    const [errimg, seterrimg] = useState(0);
    const [errNickName, seterrNickName] = useState(0); 
    const [image, setRes] = useState(true); 
    const [name, setName] = useState(true); 


    let imgflag = 0;
    let nickflag = 0;
    useEffect(() => {
            var fileInput = document.getElementById('inpt');
            var imageDisplay = document.getElementById('profile_pic') as HTMLImageElement;
            if (fileInput && imageDisplay)
            {
                fileInput.addEventListener('input', function (event) {
                  if (event && event.target)
                  {
                    var fileInputTarget = event.target as HTMLInputElement;
                    var file = fileInputTarget.files?.[0];
                    if (file && file.type.startsWith('image/')) {
                      setnew_file(file);
                      displayImage(file);
                      handleFileUpload(file);
                    } else {
                      // alert('Please select a valid image file.');
                    }
                  }
                });
            }
            function displayImage(file:any) {
                var reader = new FileReader();
                reader.onload = function (e) {
                  if (e.target && imageDisplay)
                  {
                    var imageUrl = e.target.result;
                    imageDisplay.src = imageUrl as string;
                  }
                };
                reader.readAsDataURL(file);
            } 
      }, []);

    const inputRef = useRef<HTMLInputElement | null>(null);
  const handleClickProgrammatically = () => { // here i automaticly click the input_file to make it 
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleNickNameUpload = async (name:any) => { // after the new NickName passes the error checks i POST it on the back-end
    if (!name)  return 
    // try {
        setName(false);
        const new_nickname = "http://localhost:3001/user/updatenick/" + name;
        const res = await fetch(new_nickname, {
          method: 'POST',   
          mode: 'cors',
          credentials : 'include',
        }).then((res) =>{
          setName(true)
        }).catch((error)=>{
          console.log(error);
        })
        // if (!res.ok) throw new Error("An error occurred while attempting to update the new Nickname.");
    // } catch (error) {
    //     console.log(error);
    // }
  };

  const handleInputChangek = (event:any) => {// here i keep the state of the updated NickName updated when the user click on "Enter" button
    if (event.key === 'Enter') {
      handleInputChange(event);
    }
  }
  const handleInputChange = (event:any) => { // here i keep the state of the updated NickName updated when ever a character is wroten or removed from the input field
    setupdatenick(event.target.value);
  }


  const handleFileUpload = async (files:any) => { // here i made the final tests for the new Profile Picture before POSTED on the back-end
    if (files.type !== "image/jpeg")  
    {
      console.log("wrong image type !:", files.type);
      imgflag = 1;
      seterrimg(imgflag);
      return 1;
    } 
    if (files.size > 5 * 10 **6)  
    {
      console.log("wrong image size !:", files.size);
      imgflag = 1;
      seterrimg(imgflag);
      return 1;
    }
    
    
    console.log("correct image type !:", files.type, "correct image size !:", files.size);
      imgflag = 0;
      seterrimg(imgflag);
      const data = new FormData();
      data.append('avatar', files);
        setRes(false);
        const res =  await fetch('http://localhost:3001/user/updateavatar', {
          mode: 'cors',
          credentials : 'include',
          method: 'POST',   
          body: data
        }).then((res)=>{
          setRes(true);
          imgflag = 0;
          seterrimg(imgflag);
          console.log("uploaed ile success");
        }).catch((error)=>{
          console.log(error)
        })
        // if (!res.ok) throw new Error("An error occurred while attempting to update the new profile picture.");
  };



    const updateNickname = () => { // here i check the values that will be POSTED to the back-end for any error
      const nickname_state = document.getElementById("inpt_nickname");
      // alert(nickname_state.target.value);
      const validInput = /^[a-zA-Z0-9]*$/;
      // if (updatenick.length > 15 || updatenick.length === 0 || !validInput.test(updatenick) )
      if (updatenick.length > 15 || updatenick.length === 0 || !validInput.test(updatenick) || !/^[a-zA-Z]*$/.test(updatenick.charAt(0)))
      {
        if (nickname_state)
         nickname_state.style.borderColor = 'red';
        nickflag = 1;
        // alert("salam ana hiba");
      }
      else
      {
        nickflag = 0;
        if (nickname_state)
          nickname_state.style.borderColor = 'white';
      handleNickNameUpload(updatenick);
      if(!name || !image)
      {
        setLoading(true);
        console.log("image or name still not fullfilled");
      }
      if(name && image)
        router.push("/user/me");
    }
      seterrNickName(nickflag);
    }
    return (
      <div className="h-full w-full edit_n ickname bg-primary_blue flex flex-col items-center space-y-10 pt-10"         style={{ 
          opacity: (!name || !image) ? 0.4 : 1
        }} >

            <div className="h-fit w-fit flex flex-col items-center">
            <div className="h-fit w-fit border border-accent_red relative flex justify-center ">
                <img src={props.user_data?.avatarLink} id="profile_pic" className=" h-32 w-28 border-4 border-red-400 " />
                <button  className=" w-9 h-6 bg-accent_red font-bold text-white absolute bottom-[-10px]" onClick={handleClickProgrammatically} > Edit </button>
                <input name="image"  type="file" placeholder="Edit" id='inpt' accept='/image/*' className="outline-none oda w-0 h-0 bg-red-500  absolute bottom-[-10px] opacity-0 " ref={inputRef}  />
            </div>
                {errimg ? 
                  <span  className="font-bold pt-2 border-solid text-xs  text-red-600 "> Wrong Image </span>
                  :
                  null
                }
             </div>
            <span  className="font-bold text-white"> {NickName} </span>
            <div className="h-fit w-fit flex flex-col items-center">
            <input type="text" id='inpt_nickname' className="outline-none bg-primary_blue border-b-2 border-white-500  text-sm font-bold text-white" placeholder="NickName" defaultValue={updatenick} onChange={handleInputChange} onKeyDown={handleInputChangek} />
             {errNickName ? 
             <span  className="font-bold pt-0 border-solid text-xs text-red-600 "> Wrong NickName </span>
             : null}
            </div>
            <button className="bg-accent_red h-10 w-16 font-bold text-white" onClick={updateNickname}> Save </button>
             </div>
    );
  }



// 401
//            403  Forbidden action
//            415 
// 302
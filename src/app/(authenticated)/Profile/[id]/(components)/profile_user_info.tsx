import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';


const ProfileUserInfo = (props: any) => {
  const user_data = props.users_data;
  const router = useRouter();

  const updateNickname = () => {
    const next_rout = "/editProfile";
    router.push(next_rout);
  }
  return (
    <div className="flex flex-col w-full sm:w-[464px]">
      <a className="text-white truncate ">PROFILE</a>
      <div className=" w-full h-[380px] sm:w-[464px]  bg-primary_blue flex flex-col items-center space-y-5 pt-8 pb-8">
        <img
          src={user_data.avatarLink}
          alt=""
          draggable="false"
          className="h-32 w-32 sm:h-[174px]   sm:w-[174px] border-4 br "
        />
        <a className="h-full w-full text-4xl sm:w-[140px] sm:h-[41px] text-center  text-white">
          {" "}
          {user_data.intraLogin}{" "}
        </a>
        <a className="h-full w-full text-2xl sm:w-[104] sm:h-[27px]  text-center text-white">
          {" "}
          {user_data.nickname}{" "}
        </a>
        <button
          className=" border-red-400 w-[70px] h-[30px] bg-accent_red font-bold text-white"
          onClick={updateNickname}
        >
          {" "}
          Edit{" "}
        </button>
      </div>
    </div>
  );
};

export default ProfileUserInfo;

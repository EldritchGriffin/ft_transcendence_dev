"use client";

import React, { useEffect, useState } from "react";
import ProfileUserInfo from "../../Profile/[id]/(components)/profile_user_info";
import UserBlockList from "../../Profile/[id]/(components)/UserBlockList";
import Mhistory from "../../Profile/[id]/(components)/hs";
import UserFriendList from "../../Profile/[id]/(components)/UserFriendList";
import Stats from "../../Profile/[id]/(components)/stats";
import Leadrboard from "../../Profile/[id]/(components)/board";
import Achievements from "../../achive/Achievements";
// import Navbar_compo from '/testing/page';

const ProfilePage = (props: any) => {
  const [users_data, setusers_data] = useState(null);
  const [leader_board, setleader_board] = useState(null);
  const [loading, setloading] = useState(true);

  const fetchGetDataBack = async () => {
    try {
      const response = await fetch("http://localhost:3001/user/me", {
        method: "GET",
        mode: "cors",
        credentials: "include",
      });
      if (!response.ok)
        throw new Error(
          "An error occurred while attempting to update the new Nickname."
        );
      const result = await response.json();
      // console.log("users data ====>", result);
      setusers_data(result);
    } catch (error) {
      console.error("Error posting data:", error);
    } finally {
      setloading(false);
    }
  };
  const fetchGetLeaderBoard = async () => {
    try {
      const response = await fetch("http://localhost:3001/leaderboard", {
        method: "GET",
        mode: "cors",
        credentials: "include",
      });
      if (!response.ok)
        throw new Error(
          "An error occurred while attempting to update the new Nickname."
        );
      const result = await response.json();
      // console.log(" leader board ====>", result);
      setleader_board(result);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };
  useEffect(() => {
    fetchGetDataBack();
    fetchGetLeaderBoard();
  }, []);

  if (loading) {
    return <p>uploading........</p>;
  }
  return (
    <div className="w-full flex flex-row min-h-screen flex-wrap justify-center pt-20 ">
      <div className="w-full sm:w-[468px] md:w-[468px] flex flex-col test:order-2 pt-5 space-y-5">
        <div className="w-full h-[400px] sm:w-[468px]  md:w-full shadow-xl ">
          <ProfileUserInfo users_data={users_data} />
        </div>
        <div className="w-full h-[400px] sm:w-full  md:w-full shadow-xl">
          {leader_board && <Leadrboard result={leader_board} />}
        </div>
      </div>
      <div className="w-full sm:w-[468px] md:w-[468px] flex flex-col  test:order-1 pt-5 space-y-5">
        <div className="w-full  h-[400px] sm:w-[468px]  md:w-full shadow-xl">
          {users_data && <Mhistory result={users_data} />}
        </div>
        <div className="w-full h-[400px] sm:w-[468px]  md:w-full shadow-xl">
          {users_data && <Stats win={users_data} place={leader_board} />}
        </div>
      </div>
      <div className="w-full  sm:w-[468px] test1:w-[940px] test:w-[468px] flex flex-col pt-5 test1:flex-row test:flex-col space-y-5 test1:space-y-0 test:order-3 test:space-y-5">
        <div className="w-full h-[400px] sm:w-[468px]  md:w-full shadow-xl">
          <UserFriendList users_data={users_data} />
        </div>
        <div className="w-full h-[400px] sm:w-[468px] md:w-full shadow-xl">
          <UserBlockList users_data={users_data} />
        </div>
      </div>
      {/* <Achievements matchHistory={users_data.matchHistory} /> */}
    </div>
  );
};

export default ProfilePage;

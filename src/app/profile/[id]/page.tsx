"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Mhistory from "./compprofile/matchhistory";
import Leadrboard from "./compprofile/leadrboard";
import Profilestat from "./compprofile/Profilestat";
import Friendlist from "./compprofile/Friendlist";
import { type } from "os";
import Link from "next/link";
import UpdateProfile from "./compprofile/UpdateProfile";
import axios from "axios";
import { Result } from "postcss";

const api = axios.create({
  baseURL: "http://10.13.10.12:3001",
});

export default function Profile({ params }: any) {
  const [userData, setUserData] = useState<any>([]);
  if (params.id) {
    useEffect(() => {
      const fetch = async () => {
        try {
          const res = await api
            .get(`/users/${params.id}`, { withCredentials: true })
            .then((res) => setUserData(res.data));
          // console.log(res.data);
          // setUserData(res.data);
        } catch (err) {
          if (axios.isAxiosError(err)) {
            if (err.response) {
              console.log(err.response.status); // Logs the HTTP status code
              console.log(err.response.data); // Logs the server's response
            } else if (err.request) {
              console.log(err.request); // Logs the request that was made
            } else {
              console.error("Error", err.message);
            }
          } else {
            console.error(err);
          }
        }
      };
      fetch();
    }, []);
  } else {
    useEffect(() => {
      const fetch = async () => {
        try {
          const res = await api
            .get("/users/me", { withCredentials: true })
            .then((res) => setUserData(res.data));
          // console.log(res.data);
          // setUserData(res.data);
        } catch (err) {
          if (axios.isAxiosError(err)) {
            if (err.response) {
              console.log(err.response.status); // Logs the HTTP status code
              console.log(err.response.data); // Logs the server's response
            } else if (err.request) {
              console.log(err.request); // Logs the request that was made
            } else {
              console.error("Error", err.message);
            }
          } else {
            console.error(err);
          }
        }
      };
      fetch();
    }, []);
  }
  const [leaderData, setLeaderData] = useState<any>([]);
  useEffect(() => {
    const leaderB = async () => {
      try {
        const res = await api
          .get("/leaderboard", {
            withCredentials: true,
          })
          .then((res) => setLeaderData(res.data));
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (err.response) {
            console.log(err.response.status); // Logs the HTTP status code
            console.log(err.response.data); // Logs the server's response
          } else if (err.request) {
            console.log(err.request); // Logs the request that was made
          } else {
            console.error("Error", err.message);
          }
        } else {
          console.error(err);
        }
      }
    };
    leaderB();
  }, []);

  const [isChecked, setIsChecked] = useState(false);
  const firstTab = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (firstTab.current) {
      firstTab.current.click();
    }
  }, []);
  //   const handleTabChange = (value: boolean) => {
  //   setIsChecked(value);
  // };
  const checked = () => {
    if (isChecked) {
      return <Leadrboard people={peopleData} />;
    } else {
      return <Mhistory />;
    }
  };

  type Person = {
    id: string;
    name: string;
    image: string;
    score: number;
  };
  const peopleData: Person[] = [];

  const rank = () => {
    if (userData && userData.currUser) {
      for (let i = 0; i < leaderData.length; i++) {
        if (userData.currUser.intraLogin === leaderData[i].intraLogin) {
          return i + 1;
        }
      }
    }
    return 0;
  };

  const rank2 = rank();
  // const [upd, setUpd] = useState(
  //   userData && userData.currUser ? userData.currUser.nickname : ""
  // );
  const [upd, setUpd] = useState("");
  useEffect(() => {
    // setUpd(userData && userData.currUser ? userData.currUser.nickname : "");
    setUpd(userData && userData.currUser ? userData.currUser.nickname : "");
  }, []);

  if (params.id != "me") {
    console.log(userData);
    return (
      <div className="container sm:pr-24 py-24 mx-auto flex flex-col 2xl:flex-row justify-between  w-full sm:max-w-full h-screen">
        <div className="py-14">
          <div className="space-y-5  bg-customRed  h-fit lg:h-[300px] sm:w-[700px] lg:w-[900px] boxshadow">
            {userData.currUser && (
              <Profilestat result={userData} ra={rank2} u={upd} />
            )}
            <div className="flex justify-center pt-3">
              <button className="btn bg-white hover:bg-costumwhite rounded-none fontbtn text-black">
                ADD FRIEND
              </button>
            </div>
          </div>
        </div>
        <div className="sm:w-[700px] ">
          <div className="tabs tabs-bordered">
            <input
              ref={firstTab.current === null ? firstTab : null}
              id="leaderboard"
              type="radio"
              name="my_tabs_2"
              className="tab [--tab-bg:yellow] [--tab-border-color:orange]"
              aria-label="LEADRBOARD"
              onClick={checked}
            />
            <div className="tab-content bg-customRed border-base-300  sm:p-10 boxshadow">
              <div className="">
                {leaderData && <Leadrboard result={leaderData} />}
              </div>
            </div>
            <input
              id="matchhistory"
              type="radio"
              name="my_tabs_2"
              className="tab"
              aria-label="HISTORY"
              onClick={checked}
            />
            <div className="tab-content bg-customRed border-base-300 boxshadow sm:p-10">
              {userData.currUser && <Mhistory result={userData.currUser} />}
            </div>
            {/* <input
              id="matchhistory"
              type="radio"
              name="my_tabs_2"
              className="tab"
              aria-label="FRIENDS"
              onClick={checked}
            />
            <div className="tab-content bg-customRed border-base-300 boxshadow sm:p-10 ">
              {userData.currUser && <Friendlist result={userData.currUser} />}
            </div> */}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container sm:pr-24 py-24 mx-auto flex flex-col 2xl:flex-row justify-between  w-full sm:max-w-full h-screen">
        <div className="py-14">
          <div className="space-y-5  bg-customRed  h-fit lg:h-[300px] sm:w-[700px] lg:w-[900px] boxshadow">
            {userData.currUser && (
              <Profilestat result={userData} ra={rank2} u={upd} />
            )}
            <div className="flex justify-center pt-3">
              <UpdateProfile update_nick_name={setUpd} />
            </div>
          </div>
        </div>
        <div className="sm:w-[700px] ">
          <div className="tabs tabs-bordered">
            <input
              ref={firstTab.current === null ? firstTab : null}
              id="leaderboard"
              type="radio"
              name="my_tabs_2"
              className="tab"
              aria-label="LEADRBOARD"
              onClick={checked}
            />
            <div className="tab-content bg-customRed border-base-300  sm:p-10 boxshadow">
              <div className="">
                {leaderData && <Leadrboard result={leaderData} />}
              </div>
            </div>
            <input
              id="matchhistory"
              type="radio"
              name="my_tabs_2"
              className="tab"
              aria-label="HISTORY"
              onClick={checked}
            />
            <div className="tab-content bg-customRed border-base-300 boxshadow sm:p-10">
              {userData.currUser && <Mhistory result={userData.currUser} />}
            </div>
            <input
              id="matchhistory"
              type="radio"
              name="my_tabs_2"
              className="tab"
              aria-label="FRIENDS"
              onClick={checked}
            />
            <div className="tab-content bg-customRed border-base-300 boxshadow sm:p-10 ">
              {userData.currUser && <Friendlist result={userData.currUser} />}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

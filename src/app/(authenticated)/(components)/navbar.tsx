"use client";
import Cookies from "js-cookie";
import React, { use, useEffect, useRef } from "react";
import { useState } from "react";
import {
  AiOutlineMenu,
  AiOutlineComment,
  AiOutlineIdcard,
  AiFillHome,
} from "react-icons/ai";
import { HiOutlineLogout } from "react-icons/hi";
import { MdLogout } from "react-icons/md";
import { GiPingPongBat } from "react-icons/gi";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import { Cookie } from "next/font/google";

const Navbar_search_list = (props: any) => {
  const router = useRouter();
  const navigate_to_users_profile = (users_target_intra: string) => {
    var next_rout = "/Profile/" + users_target_intra;
    props.setshowsearch(false);
    router.push(next_rout);
  };
  return (
    <div
      className="w-full h-fit flex items-center space-x-5 flex-row space-y-3 overflow-hidden  font-lilita-one text-stroke border-2 "
      key={props.index}
      onClick={() => {
        navigate_to_users_profile(props.item.intraLogin);
      }}
    >
      <img
        src={props.item.avatarLink}
        alt=""
        className="h-10 w-10 sm:h-[60px] sm:w-[60px] flex-none red  "
      />
      <label className="h-fit w-fit  text-sm flex items-center red justify-center text-center font-lilita-one  text-stroke text-white">
        {" "}
        {props.item.nickname}{" "}
      </label>
    </div>
  );
};

export default function Navbar_compo() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [users_data, setusers_data] = useState<any>();
  const [showsearch, setshowsearch] = useState(false);
  const [navactive, setnavactive] = useState(3);
  const searchRef = useRef(null);
  const openNav = () => {
    setShow(!show);
  };
  const fetchserch = async () => {
    try {
      const response = await axios.get("http://localhost:3001/user/all", {
        withCredentials: true,
      });
      if (response.status >= 200 && response.status < 300) {
        const data = await response.data;
        setusers_data(data);
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  };
  const handleLogoutClick = () => {
    Cookies.remove("token");
    window.location.href = "/";
  };
  useEffect(() => {
    fetchserch();
  }, []);
  const handlenavsearch = (event: any) => {
    setnavsearch(event.target.value);
  };
  const showsearchfield = () => {
    fetchserch();
    setshowsearch(true);
    setShow(false);
  };
  const hidesearchfield = () => {
    setshowsearch(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      // Check if the click is outside the search result list
      if (
        searchRef.current &&
        !(searchRef.current as HTMLElement).contains(event.target as Node)
      ) {
        hidesearchfield();
      }
    };

    // Add event listener to document on mount
    document.addEventListener("click", handleOutsideClick);

    // Cleanup the event listener on unmount
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [searchRef]);

  const [navsearch, setnavsearch] = useState("");
  return (
    <nav className=" fixed w-full h-16 shadow-xl bg-primary_blue ">
      <div className="flex justify-between items-center h-full w-full px-4 2xl:px-9">
        <div className="flex items-center space-x-4">
          <div className="relative flex md:gap-8 lg:gap-16 items-center space-x-4">
            <span className="oo text-sm md:text-2xl font-bold">PongVerse</span>
            <div className="flex flex-col space-y-10 " ref={searchRef}>
              <input
                type="text"
                className="w-[120px] sm:w-auto outline-none bg-transparent text-white text-sm  border-b-2 border-white-500 placeholder-opacity-50 placeholder-white"
                placeholder="Search"
                // onFocus={(e) => setShow(false)}
                onChange={handlenavsearch}
                onFocus={showsearchfield}
                // onBlur={hidesearchfield}
              />
              {showsearch && users_data ? (
                <div className="absolute  w-[300px]  h-[200px] bg-primary_blue space-y-3  pt-2 overflow-y-auto custom-scrollbar">
                  {users_data.map((item: any, index: any) =>
                    item.intraLogin.includes(navsearch) ? (
                      <Navbar_search_list
                        item={item}
                        index={index}
                        key={index}
                        setshowsearch={setshowsearch}
                      />
                    ) : null
                  )}
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className="hidden md:flex ">
          <div className="flex items-center lg:space-x-16 space-x-7">
            <div
              className="flex   p-2  duration-200 hover:-translate-y-0.5 cursor-pointer"
              style={{
                borderBottom: navactive === 2 ? "2px solid white" : "none",
                marginTop: navactive === 2 ? "15px" : "0",
              }}
              onClick={() => {
                setnavactive(2);
                router.push("/messages");
              }}
            >
              <AiOutlineComment size={25} className="text-white" />
              <a className="text-white text-sm lg:text-lg font-bold">
                Messages
              </a>
            </div>
            <div
              className="flex  p-2  duration-200 hover:-translate-y-0.5 cursor-pointer"
              style={{
                borderBottom: navactive === 3 ? "2px solid white" : "none",
                marginTop: navactive === 3 ? "15px" : "0",
              }}
              onClick={() => {
                setnavactive(3);
                router.push("/user/me");
              }}
            >
              <AiOutlineIdcard size={25} className="text-white" />
              <a className="text-white text-sm lg:text-lg font-bold">Profile</a>
            </div>
            <div
              className="flex  p-2  duration-200 hover:-translate-y-0.5 cursor-pointer"
              style={{
                borderBottom: navactive === 4 ? "2px solid white" : "none",
                marginTop: navactive === 4 ? "15px" : "0",
              }}
              onClick={() => {
                setnavactive(4);
                router.push("/pregame");
              }}
            >
              <GiPingPongBat size={25} className="text-white" />
              <a className="text-white text-sm lg:text-lg font-bold">Game</a>
            </div>
          </div>
        </div>
        <div className="hidden md:flex justify-end items-center space-x-4 w-[359px] ">
          <button
            className="w-fit h-fit  text-2xl gap-3 font-bold text-white red"
            onClick={handleLogoutClick}
          >
            {/* Log out */}
            <MdLogout size={50} className="oo" />
          </button>
        </div>
        <div
          onClick={openNav}
          className="text-white text-3xl cursor-pointer md:hidden"
        >
          <AiOutlineMenu size={35} />
        </div>
        <div
          className={
            show
              ? "fixed top-16 left-0 md:hidden w-[65%] h-screen bg-primary_blue ease-in p-10 duration-500 z-50"
              : "fixed left-[-100%] top-16 h-screen p-10 ease-in duration-500"
          }
        >
          <div className="flex flex-col space-y-10 mt-10">
            <div className="flex">
              <AiFillHome size={25} className="text-white" />
              <a className="text-white text-sm lg:text-lg font-bold">Home</a>
            </div>
            <div
              className="flex cursor-pointer"
              onClick={() => {
                setnavactive(2);
                router.push("/messages");
              }}
            >
              <AiOutlineComment size={25} className="text-white" />
              <a className="text-white text-sm lg:text-lg font-bold">
                Messages
              </a>
            </div>
            <div
              className="flex cursor-pointer"
              onClick={() => {
                setnavactive(3);
                router.push("/user/me");
              }}
            >
              <AiOutlineIdcard size={25} className="text-white" />
              <a className="text-white text-sm lg:text-lg font-bold">Profile</a>
            </div>
            <div
              className="flex cursor-pointer"
              onClick={() => {
                setnavactive(4);
                router.push("/pregame");
              }}
            >
              <GiPingPongBat size={25} className="text-white" />
              <a className="text-white text-sm lg:text-lg font-bold">Game</a>
            </div>
          </div>
          <div className="flex items-center pt-10  space-x-4">
            <button
              className="w-fit h-fit   text-2xl gap-3 font-bold text-white"
              onClick={handleLogoutClick}
            >
              {/* Log out */}
              <MdLogout size={50} className="oo" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

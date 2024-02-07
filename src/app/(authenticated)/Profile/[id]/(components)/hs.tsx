"use client";
import React from "react";
import { useRouter } from "next/navigation";
const checkname = (person: any) => {
  if (person.nickname) {
    if (person.nickname.length > 7) {
      return person.nickname.slice(0, 7) + "...";
    } else {
      return person.nickname;
    }
  } else {
    if (person.intraLogin.length > 7) {
      return person.intraLogin.slice(0, 7) + "...";
    } else {
      return person.intraLogin;
    }
  }
};

const checkwiner = (person: any, h: any) => {
  if (person.intraLogin === h.players[0].intraLogin) {
    if (h.result > 0) {
      return "Won";
    } else {
      return "Lost";
    }
  } else if (person.intraLogin === h.players[1].intraLogin) {
    if (h.result < 0) {
      return "Won";
    } else {
      return "Lost";
    }
  }
};

const Mhistory = ({ result }: any) => {
  const history: any = result?.matchHistory;
  const router = useRouter();
  return (
    <div className="bck flex flex-col h-full    w-full  sm:h-[407px] sm:w-[464px] ">
      <a className="text-white truncate ">MATCH HISTORY</a>
      <div className="w-full h-full sm:h-[380px] sm:w-[464px] bg-primary_blue">
        {!history?.length ? (
          <p className="h-full w-full flex justify-center items-center  text-white">
            {" "}
            No Match History{" "}
          </p>
        ) : (
          <div className="flex flex-col overflow-y-auto custom-scrollbar h-[380px] shadow-black">
            {history &&
              history.map((h: any, i: number) => (
                <div
                  key={i}
                  className="flex flex-row justify-between items-center py-5 pl-[24px] pr-[24px] sm:px-4 sm:m-5"
                >
                  <div
                    className="flex flex-col items-center cursor-pointer"
                    onClick={() => {
                      router.push(
                        `/profile/${
                          h.players &&
                          h.players[0].intraLogin === result.intraLogin
                            ? h.players[0].intraLogin
                            : h.players[1].intraLogin
                        }`
                      );
                    }}
                  >
                    <img
                      draggable="false"
                      className="h-12 w-12 sm:h-[100px] sm:w-[100px]  flex-none bg-gray-50"
                      src={
                        h.players &&
                        h.players[0].intraLogin === result.intraLogin
                          ? h.players[0].avatarLink
                          : h.players[1].avatarLink
                      }
                      alt=""
                    />
                    <p className="text-xs sm:text-lg  text-white">
                      {checkname(
                        h.players &&
                          h.players[0].intraLogin === result.intraLogin
                          ? h.players[0]
                          : h.players[1]
                      )}
                    </p>
                  </div>
                  <p className="text-xs  sm:text-lg test1:text-3xl px-2 pb-5 text-white">
                    {checkwiner(result, h)}
                  </p>
                  <div
                    className="flex flex-col items-center cursor-pointer"
                    onClick={() => {
                      router.push(
                        `/profile/${
                          h.players &&
                          h.players[1].intraLogin === result.intraLogin
                            ? h.players[0].intraLogin
                            : h.players[1].intraLogin
                        }`
                      );
                    }}
                  >
                    <img
                      draggable="false"
                      className="h-12 w-12 sm:h-[100px] sm:w-[100px] flex-none  bg-gray-50"
                      src={
                        h.players &&
                        h.players[0].intraLogin === result.intraLogin
                          ? h.players[1].avatarLink
                          : h.players[0].avatarLink
                      }
                      alt=""
                    />
                    <p className="text-xs sm:text-lg  text-white">
                      {checkname(
                        h.players &&
                          h.players[1].intraLogin === result.intraLogin
                          ? h.players[0]
                          : h.players[1]
                      )}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Mhistory;

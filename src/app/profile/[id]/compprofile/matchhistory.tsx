import React from "react";
import Image from "next/image";

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
const Mhistory = ({ result }: any) => {
  const history: any = result?.matchHistory;
  return (
    <div className="">
      <a className="flex justify-around fontzabi truncate py-5">
        MATCH HISTORY
      </a>
      <div className="flex flex-col overflow-y-auto hide-scrollbar h-[800px] shadow-black">
        {history &&
          history.map((h: any, i: number) => (
            <div
              key={i}
              className="flex flex-row justify-between items-center py-2 sm:px-4 sm:m-5"
            >
              <div className="flex flex-row items-start">
                <img
                  draggable="false"
                  className="h-12 w-12 sm:h-20 sm:w-20 flex-none rounded-full bg-gray-50"
                  src={h.players[0].avatarLink}
                  alt=""
                />
                <p className="text-xs sm:text-lg  fontzabi">
                  {checkname(h.players[0])}
                </p>
              </div>
              <p className="text-xs sm:text-lg px-2 fontzabi">
                {h.result > 0 ? "Won" : "Lost"}
              </p>
              <div className="flex flex-row items-end">
                <p className="text-xs sm:text-lg  fontzabi">
                  {checkname(h.players[1])}
                </p>
                <img
                  draggable="false"
                  className="h-12 w-12 sm:h-20 sm:w-20 flex-none rounded-full bg-gray-50"
                  src={h.players[1].avatarLink}
                  alt=""
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Mhistory;

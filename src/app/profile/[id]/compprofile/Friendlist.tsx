import React from "react";
import Dropdownlist from "./Dropdownlist";

const checkname = (person: any) => {
  if (person.nickname) {
    if (person.nickname.length > 10) {
      return person.nickname.slice(0, 10) + "...";
    } else {
      return person.nickname;
    }
  } else {
    if (person.intraLogin.length > 10) {
      return person.intraLogin.slice(0, 10) + "...";
    } else {
      return person.intraLogin;
    }
  }
};

const Friendlist = ({ result }: any) => {
  // const getStatus = () => {
  //   if (status === "Online") {
  //     return "ring-green-500";
  //   } else if (status === "Offline") {
  //     return "ring-gray-600";
  //   } else {
  //     return "ring-yellow-500";
  //   }
  // };

  const fr: any = result?.friends;
  return (
    <div className="">
      <a className="flex justify-around fontzabi py-5">FRIENDS</a>
      <div className="overflow-y-auto hide-scrollbar h-[800px] shadow-black">
        {fr &&
          fr.map((friend: any, index: number) => (
            <div className=" flex justify-between sm:px-8 items-center py-5">
              <div className="flex items-center ">
                {/* <div className="rounded-full ring ring-green-500"> */}
                {/* <div className={`rounded-full ring-4 ${getStatus()}`}> */}
                <div className={`rounded-full ring-4 `}>
                  <img
                    draggable="false"
                    src={friend.avatarLink}
                    alt=""
                    className="h-12 w-12 sm:h-20 sm:w-20 rounded-full"
                  />
                </div>
                <p className="text-white fontzabi text-lg ml-2">
                  {checkname(friend)}
                </p>
              </div>
              <div className="fontzabi">
                <Dropdownlist />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Friendlist;

import React, { use } from "react";
import { useEffect, useRef } from "react";

// Define the type for ProfilestatProps

const Profilestat = ({ result, ra, u }: any) => {
  return (
    <div className="space-y-10 pl-7 pt-5 flex flex-col lg:flex-row  justify-between items-center fontzabi">
      <div className="flex ring-2 to ring-offset-2 hover:ring-offset-4 rounded-none justify-between items-center ">
        <img
          draggable="false"
          src={result.currUser.avatarLink}
          alt=""
          className="to w-[200px] h-[200px] border-2 border-white rounded-none dark:border-gray-800"
        />
      </div>
      <div className="space-y-14 flex flex-col justify-center items-center w-80 ">
        <div className="w-fit">
          <p className="justify-center text-3xl">
            {u ? u : result.currUser.intraLogin}
          </p>
        </div>
        <p className="text-clip overflow-hidden">{result.currUser.nickname}</p>
      </div>
      <div className="px-20 flex flex-col space-y-14 justify-between ">
        <p className="truncate">WINS : {result.gamesWon}</p>
        <p className="truncate">LOSES: {result.gamesLost}</p>
        <p className="truncate">RANK : {ra}</p>
      </div>
    </div>
  );
};

export default Profilestat;

"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function select_achievements(data:any)
{
  if (!data)
    return (null);
  const achievements = 
    [{name: '/achievements/firstgame.jpg', flag: data.length > 0},
    {name: '/achievements/fivegames.jpg', flag: data.length >= 5},
    {name: '/achievements/teengames.jpg', flag: data.length >= 10},
    {name: '/achievements/firstwin.jpg', flag: (data.filter((match:any) => match.result > 0).length > 0)},
    {name: '/achievements/fivewins.jpg', flag: (data.filter((match:any) => match.result > 0).length >= 5)},
    {name: '/achievements/teenwins.jpg', flag: (data.filter((match:any) => match.result > 0).length >= 10)},]
  ;
  return (achievements);
}

const Achievements = (props:any) => {
  const the_history_match = props.matchHistory;
  const [achivements, setachivements] = useState<any>(null);
  useEffect(() => {
   const achivement = select_achievements(the_history_match);
    setachivements(achivement);
  }, []);

  return (
    <div className="h-[50px] w-full sm:[464px] flex flex-row justify-center space-x-5 bg-primary_blue">
  {achivements?.map((item: any, index: any) => 
    item.flag ?  
     <div className="h-[50px] w-[50px] border-5" key={index}>
         {item.name &&  <Image
          priority={true}
          src={item.name}
          id="ggg"
          width={320}
          height={320}
          alt=""
         draggable={false}

          className=" h-[50px] w-[50px] "
        />}
  </div>
  :
     <div className="h-[50px] w-[50px] border-5" key={index}>
    <img src="/achievements/unlocked.jpg" alt="ggg" className="h-[50px] w-[50px] " />
  </div>
  )}
  </div>
  )
}
export default Achievements;


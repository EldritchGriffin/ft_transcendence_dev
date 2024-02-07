"use client";

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
  if (achivements)
   console.log("salam ana hya l first element fl achivements :", achivements[0].name);
  const kkk = "/onegame.png";
  return (
    <div className="h-[50px] w-full sm:[464px] flex flex-row justify-center space-x-5 bg-primary_blue">
  {achivements?.map((item: any, index: any) => 
    item.flag ?  
     <div className="h-[50px] w-[50px] border-5" key={index}>
    <img src={item.name} alt="ggg" className="h-[50px] w-[50px] " />
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


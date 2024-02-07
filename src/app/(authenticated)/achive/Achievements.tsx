"use client";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function select_achievements(data:any)
{
  if (!data)
    return (null);
  const achievements = 
    [{name: '/onegame.png', flag: data.length > 0},
    {name: '/paddle.jpg', flag: data.length >= 5},
    {name: '/search_flag.png', flag: data.length >= 10},
    {name: '/settings_button.png', flag: (data.filter((match:any) => match.result > 0).length > 0)},
    {name: '/friend_chat.png', flag: (data.filter((match:any) => match.result > 0).length >= 5)},
    {name: '/group_chat.png', flag: (data.filter((match:any) => match.result > 0).length >= 10)},]
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
    <div className="h-[50px] w-full sm:[464px] flex flex-row space-x-5 bg-primary_blue">
  {achivements?.map((item: any, index: any) => 
    item.flag ?  
     <div className="h-[50px] w-[50px] border-5" key={index}>
    <img src={item.name} alt="ggg" className="h-[50px] w-[50px] " />
  </div>
  : null
  )}
  </div>
  )
}
export default Achievements;


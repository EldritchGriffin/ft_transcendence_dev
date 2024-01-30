"use client";
import React, { useState, useEffect, useRef } from "react";
import progress from "../../../progress.json";
import Lottie from "lottie-react";

const Stats = (props: any) => {
  const win = props.win;
  const place = props.place;

  const x = win.matchHistory;
  const tole = win?.matchHistory?.length;

  const winrate = () => {
    let wine = 0;
    if (wine == null) return 0;
    for (let i = 0; i < tole; i++) {
      if (
        (x[i].players[0].intraLogin === win.intraLogin && x[i].result > 0) ||
        (x[i].players[1].intraLogin === win.intraLogin && x[i].result < 0)
      ) {
        wine++;
      }
    }
    return (wine / tole) * 100;
  };

  const test = winrate();
  const [stat, setStat] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStat((prevStat) => {
        if (prevStat < test) {
          return prevStat + 1;
        } else {
          clearInterval(interval);
          return prevStat;
        }
      });
    }, 20);
    return () => clearInterval(interval); // Clear the interval on component unmount
  }, []);

  const circularProgressStyle = {
    background: `conic-gradient(#F25F5C ${stat * 3.6}deg, #ededed 0deg)`,
  };

  const place1 = () => {
    if (win) {
      for (let i = 0; i < place.length; i++) {
        if (win.intraLogin === place[i].intraLogin) {
          return i + 1;
        }
      }
    }
    return 0;
  };
  const place2 = place1();

  return (
    <div className="flex flex-col w-full sm:w-[464px]">
      <a className="text-white truncate flex ">STATS</a>
      <div className="bg-primary_blue  flex flex-col w-full sm:w-[464px] h-[380px] container">
        <div className="w-full text-xl text-white">
          <p className="flex pl-[54px] pt-[54px]">WinRate:</p>
        </div>
        <div className="circular-progress" style={circularProgressStyle}>
          <p className="progress-value">{`${stat}%`}</p>
        </div>
        <div className="text-xl w-full  text-white flex flex-row">
          <p className="pb-[54px] pl-[45px] sm:pb-[54px] sm:pl-[54px]">Rank:</p>
          <p className="pl-[120px]">{place2 === 0 ? "None" : place2 + "st"}</p>
        </div>
      </div>
    </div>
  );
};

export default Stats;

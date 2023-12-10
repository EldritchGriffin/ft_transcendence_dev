"use client";
import { Press_Start_2P } from "next/font/google";
import Link from "next/link";
import { useRef } from "react";

const Font = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
});

export default function Stdbtn(props: any) {
  return (
    <Link href={props.link}>
      <button
        onClick={props.onClick}
        className="bg-accent_red w-[120px] h-[50px] m-10 hover:bg-accent_red_hover 
                          box-shadow md:w-[250px] md:h-[100px] xl:w-[400px] xl:h-[150px]"
      >
        <span
          className={
            Font.className +
            " text-[15px] text-primary_white font-shadow md:text-[30px] xl:text-[50px]"
          }
        >
          {props.name}
        </span>
      </button>
    </Link>
  );
}

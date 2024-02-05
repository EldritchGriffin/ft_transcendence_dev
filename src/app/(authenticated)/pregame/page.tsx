"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const Pregame = () => {
  const [gameMode, setGameMode] = useState<string>("");
  const router = useRouter();

  const handleGameMode = (mode: string) => {
    const active = document.getElementById(mode);
    const buttons = document.querySelectorAll("button");
    buttons.forEach((button) => {
      if (button.id !== "0" && button.id !== "1") {
        button.classList.remove("bg-accent_red", "text-white");
        button.classList.add("text-black");
      }
    });
    if (active) {
      active.classList.remove("bg-white", "text-white");
      active.classList.add("bg-accent_red");
      active.classList.add("text-white");
    }

    setGameMode(mode);
  };

  const handleRandomGame = () => {
    if (gameMode === "") {
      toast.error("Please choose a game mode");
    } else {
      router.push(`/game?mode=${gameMode}`);
    }
  };
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="bg-white rounded-lg flex flex-col w-[40rem] h-[40rem] gap-4 p-7">
        <h1 className="text-5xl text-black">Play a Game</h1>
        <span className="text-accent_red text-2xl">Choose a game mode</span>
        <div className="mt-auto flex flex-col gap-4">
          <button
            onClick={() => handleGameMode("easy")}
            id="easy"
            className="bg-white h-16 hover:bg-red-300 border-accent_red border-4 rounded-xl text-black"
          >
            <span className=" text-3xl">Easy</span>
          </button>
          <button
            onClick={() => handleGameMode("medium")}
            id="medium"
            className="bg-white h-16 hover:bg-red-300 border-accent_red border-4 rounded-xl text-black"
          >
            <span className=" text-3xl">Medium</span>
          </button>
          <button
            onClick={() => handleGameMode("hard")}
            id="hard"
            className="bg-white h-16 hover:bg-red-300 border-accent_red border-4 rounded-xl text-black"
          >
            <span className=" text-3xl">Hard</span>
          </button>
        </div>
        <div className="flex flex-row gap-4 items-center justify-center mt-auto">
          <button
            onClick={() => handleRandomGame()}
            id="0"
            className="bg-accent_red h-16 hover:bg-red-300 w-full text-white"
          >
            <span className=" text-3xl">Random game</span>
          </button>
          <button
            id="1"
            className="bg-accent_red h-16 hover:bg-red-300 w-full text-white"
          >
            <span className=" text-3xl">Invite friend</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pregame;

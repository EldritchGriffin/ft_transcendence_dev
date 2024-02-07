"use client";
import Lottie from "lottie-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "./logo.json";

const Home = () => {
  const router = useRouter();
  return (
    <div className="flex gap-10 justify-center h-screen items-center">
      <div className="flex flex-col">
        <span className="text-[64px] text-accent_red">PongVerse</span>
        <span className="text-[19px] text-white">PaddleBattles</span>
        <div className="flex gap-5 mt-5">
          <form method="get" action="http://localhost:3001/auth/signin">
            <button className="w-[110px] h-[40px] text-white text-[14px] bg-accent_red">
              Start
            </button>
          </form>
          <button className="w-[110px] h-[40px] text-white text-[14px] bg-primary_blue"
            onClick={() => {
              router.push("/aboutus");
            }}
          >
            About us
          </button>
        </div>
      </div>
      <Lottie
        animationData={logo}
        loop={true}
        style={{ width: 1000, height: 1000 }}
      />
    </div>
  );
};

export default Home;



// no need to listen to all the profile actions block/unblock add cancel remove accept | check what to let and what to not let



// {{{{{{ OPTIONAL }}}}}} add a clear button to clear the hestory of the notification , optional do it if you has found nothing to do
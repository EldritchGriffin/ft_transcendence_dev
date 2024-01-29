"use client";
import Image from "next/image";

const Home = () => {
  return (
    <div className="flex gap-10 justify-center h-screen items-center">
      <div className="flex flex-col">
        <span className="text-[64px] text-accent_red">PongVerse</span>
        <span className="text-[19px] text-white">PaddleBattles</span>
        <div className="flex gap-5 mt-5">
          <form method="get" action="http://10.13.10.14:3001/user/me">
            <button className="w-[110px] h-[40px] text-white text-[14px] bg-accent_red">
              Start
            </button>
          </form>
          <button className="w-[110px] h-[40px] text-white text-[14px] bg-primary_blue">
            About us
          </button>
        </div>
      </div>
      <Image
        priority
        src="/paddle.jpg"
        width={232}
        height={232}
        alt="image"
        className="w-[232px] h-[232px]"
      />
    </div>
  );
};

export default Home;

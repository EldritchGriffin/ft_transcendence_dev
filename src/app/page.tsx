"use client";
import Image from "next/image";

const Home = () => {
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

// protection   || public_user_info.tsx || profile_user_info.tsx ============== test
//  not found
//   uploaded image thats not a imgae , create a file and name it {something.jpeg}  , recheck the protections
// nickname already set
// responses , other than forbiden

// add the editnickname page when first login


// when first login in case refused to inter a NickName , and when to the URL and made 3000/user/me , he is pushed to the profile , whitout having a NickName , think to block him or automaticly make NickName his intralogin


// open the image >>  the file blabla on the desktop  || when i post it on the backend it gets updatedo n the database
// use intralogin instead of nickname becuase of the issues it causes
// double check 401 responses
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const checkname = (person: any) => {
  if (person.nickname) {
    if (person.nickname.length > 10) {
      return person.nickname.slice(0, 10) + "...";
    } else {
      return person.nickname;
    }
  } else {
    if (person.intraLogin.length > 10) {
      return person.intraLogin.slice(0, 10) + "...";
    } else {
      return person.intraLogin;
    }
  }
};

function Leadrboard({ result }: any) {
  const router = useRouter();
  return (
    <div className="">
      <a className="flex justify-around fontzabi py-5">LEADERBOARD</a>
      <div className="overflow-y-auto hide-scrollbar h-[800px] shadow-black">
        <ul role="list" className="">
          {result.map((person: any) => (
            <li className="flex  justify-between sm:px-8  gap-x-11 py-5">
              <div
                className="flex  gap-x-4  cursor-pointer"
                onClick={() => {
                  router.push(`/profile/${person.intraLogin}`);
                }}
              >
                {/* <Link href={""}> */}
                <img
                  draggable="false"
                  className=" h-12 w-12 sm:h-20 sm:w-20 flex-none rounded-full bg-gray-50"
                  src={person.avatarLink}
                  alt=""
                />
                {/* </Link> */}
                <div className="min-w-0 flex-auto">
                  <p className="text-sm sm:text-xl fontzabi leading-6 text-white ">
                    {checkname(person)}
                  </p>
                </div>
              </div>
              <div className="flex flex-col fontzabi sm:w-[150px] items-end  ">
                <p className="text-sm sm:text-xl leading-6 text-white ">
                  {person.score}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Leadrboard;

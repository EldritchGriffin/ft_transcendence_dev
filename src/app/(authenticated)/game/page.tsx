"use client";
import { Press_Start_2P } from "next/font/google";
import PixiComponent from "./game";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Font = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
});

export default function game(props: any) {
  toast.success("SALAM");
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (pathname !== "/game") {
      router.push("/pregame");
    }
  }, [pathname]);
  return (
    <div className="flex flex-col red items-center justify-center h-screen bg-darkblue">
      <PixiComponent />
    </div>
  );
}

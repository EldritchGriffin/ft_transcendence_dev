import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";
import Navbar from "../(components)/navbar";
import "../globals.css";

const Font = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "NewGame",
  description: "Made by abelahce absela hchahid ysakine aelyaku",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={Font.className + " bg-darkblue"}>
      <Navbar />
      {children}
    </div>
  );
}

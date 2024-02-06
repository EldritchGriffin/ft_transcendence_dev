import type { Metadata } from "next";
import "../../globals.css";

export const metadata: Metadata = {
  title: "NewGame",
  description: "Made by abelahce absela hchahid ysakine aelyaku",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}

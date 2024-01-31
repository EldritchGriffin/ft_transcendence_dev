import type { Metadata } from "next";
import { Lilita_One } from "next/font/google";
import Navbar_compo from "./(authenticated)/(components)/navbar";
import "./globals.css";
const Font = Lilita_One({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "PongVerse",
  description: "Made by abelahce absela hchahid ysakine aelyakou",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html data-theme="light" lang="en">
      <body className={Font.className + " bg-bg_gray"}>{children}</body>
    </html>
  );
}

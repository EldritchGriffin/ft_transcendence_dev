import type { Metadata } from "next";
import { Lilita_One } from "next/font/google";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    <html data-theme="light" lang="en" suppressHydrationWarning>
      <body  className={Font.className + " bg-bg_gray"}>
        {children}
      </body>
    </html>
  );
}

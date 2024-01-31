import type { Metadata } from "next";
import { Lilita_One } from "next/font/google";
import Navbar_compo from "./(components)/navbar";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../globals.css";

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
    <html lang="en">
      <body className={Font.className + " bg-bg_gray"}>
        <Navbar_compo />
        {children}
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
      </body>
    </html>
  );
}

"use client";
import React from "react";
import Notfound from "../../Notfound.json";
import Lottie from "lottie-react";

const pagenotfound = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen ">
      <Lottie
        animationData={Notfound}
        loop={true}
        style={{ width: 1000, height: 1000 }}
      />
      <p className="text-4xl">Page not found</p>
    </div>
  );
};
export default pagenotfound;

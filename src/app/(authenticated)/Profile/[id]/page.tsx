"use client";

import React, { useEffect, useState, useRef } from "react";
import ProfilePage from "../../user/me/page";
import PrivetProfile from "./(components)/Privet_profile";
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";

const PublicProfile = (params: any) => {
  const router = useRouter();
  const [users_data, setusers_data] = useState<any>(null);
  const [leader_board, setleader_board] = useState<any>();
  const [loading, setloading] = useState(true);
  const linkRef = useRef<HTMLAnchorElement>(null);

  var profiletype = false;
  const fetchGetDataBack = async () => {
    try {
      const response = await fetch("http://localhost:3001/user/me", {
        method: "GET",
        mode: "cors",
        credentials: "include",
      });
      if (response.status === 404)
        toast.error("rani sekrana bl 404 privat profile");
      if (!response.ok)
      throw new Error(
    "An error occurred while attempting to update the new Nickname."
    );
    const result = await response.json();
    setusers_data(result);
  } catch (error) {
      toast.error("99999999rani sekrana bl 404 privat profile");
      toast.error("salam");
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    if (users_data && users_data.intraLogin == params?.params?.id) {
      router.push("/user/me");
    }
    if(!users_data)
      fetchGetDataBack();
  }, [users_data]);
  
  if (loading) {
    return <div className="flex justify-center items-center"> Loading . . . .  </div>;
  }
    return (
      <div className="flex h-screen min-h-screen flex-col  justify-center items-center space-y-10  bg-bg_gray">
        {users_data &&  <PrivetProfile id={params.params.id} users_data={users_data} />}
    </div>
  );
};

export default PublicProfile;

"use client";

import React, { useEffect, useState, useRef } from "react";
import ProfilePage from "../../user/me/page";
import PrivetProfile from "./(components)/Privet_profile";

const PublicProfile = (params: any) => {
  const [users_data, setusers_data] = useState<any>();
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
      if (!response.ok)
        throw new Error(
          "An error occurred while attempting to update the new Nickname."
        );
      const result = await response.json();
      setusers_data(result);
    } catch (error) {
      console.error("Error posting data:", error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    fetchGetDataBack();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center"></div>;
  }

  if (users_data && users_data.intraLogin == params?.params?.id) {
    profiletype = true;
  }
  return (
    <div className="flex flex-col justify-center items-center space-y-10 bg-bg_gray">
      {profiletype ? (
        <ProfilePage />
      ) : (
        <PrivetProfile id={params.params.id} users_data={users_data} />
      )}
    </div>
  );
};

export default PublicProfile;

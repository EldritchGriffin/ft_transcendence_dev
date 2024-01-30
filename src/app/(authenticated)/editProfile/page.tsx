'use client'
import React, { useEffect, useState } from 'react';
import EditNickname from "./editProfile";
import { fetchCurrentUser } from "./requestHandler";

const EditProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await fetchCurrentUser();
        setUser(user);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <p className='flex text-white h-screen justify-center items-center text-4xl'>Loading...</p>;
  }
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-[300px] h-[390px]">
        <EditNickname user_data={user}/>
      </div>
    </div>
  );
};

export default EditProfile;
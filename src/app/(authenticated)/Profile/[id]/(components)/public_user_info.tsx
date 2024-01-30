import React, { useEffect, useState } from "react";

function isRequesting(data: any, users_name: string) {
  // if (!data)
  //   return (false);
  return data.some(function (requester: any) {
    return requester.intraLogin === users_name;
  });
}

const Publicuserinfo_block_unblock = (props: any) => {
  const user_data = props.users_data;
  const connected_user = props.connected_user;
  const [isBlocked, setisBlocked] = useState(
    isRequesting(connected_user?.blocked, user_data.intraLogin)
  );
  if (!isBlocked) {
    const send_block = async () => {
      try {
        const usersurl =
          "http://localhost:3001/user/blockuser/" + user_data.intraLogin;
        const response = await fetch(usersurl, {
          method: "POST",
          mode: "cors",
          credentials: "include",
        });
        if (!response.ok)
          throw new Error(
            "An error occurred while attempting to update the new Nickname."
          );
      } catch (error) {
        console.error("Error posting data:", error);
      }
    };
    const block_unblock_user = () => {
      send_block();
      setisBlocked(true);
    };
    return (
      <button
        className=" border-red-400 w-[70px] h-[30px] bg-accent_red font-bold text-white"
        onClick={block_unblock_user}
      >
        {" "}
        Block{" "}
      </button>
    );
  } else {
    const send_unblock = async () => {
      try {
        const usersurl =
          "http://localhost:3001/user/unblockuser/" + user_data.intraLogin;
        const response = await fetch(usersurl, {
          method: "POST",
          mode: "cors",
          credentials: "include",
        });
        if (!response.ok)
          throw new Error(
            "An error occurred while attempting to update the new Nickname."
          );
      } catch (error) {
        console.error("Error posting data:", error);
      }
    };
    const block_unblock_user = () => {
      send_unblock();
      setisBlocked(false);
    };
    return (
      <button
        className=" border-red-400 w-[70px] h-[30px] bg-accent_red font-bold text-white"
        onClick={block_unblock_user}
      >
        {" "}
        Unblock{" "}
      </button>
    );
  }
};

function knowstheuserrelationship(data:any, users_name:string) {
  var requesting_list = data.requesting;
  var friends_list = data.friends;
  var requested_list = data.requested;
  
  if (friends_list.some((obj:any) => obj.intraLogin === users_name))
    return ("Remove");
  else if ( requesting_list.some((obj:any) => obj.intraLogin === users_name))
    return ("Cancel");
  else if ( requested_list.some((obj:any) => obj.intraLogin === users_name))
    return ("Accept");
  else
    return ("Add");
}


const Publicuserinfo_add_remove_cancel = ( props:any ) => {

console.log("thats the data you pass to the add remove cancel friend :" , props);

  const [buttonstate, setbuttonstate] = useState<string>("Add");
  const user_data = props.users_data;
  useEffect(() => {
    var relationship = knowstheuserrelationship(props.connected_user, props.users_data.intraLogin);
    setbuttonstate(relationship);

  }, []);
  
  if (buttonstate === "Remove")
{
  
  const send_remove = async () => {
    try {
      const usersurl = "http://localhost:3001/user/removefriend/" + user_data.intraLogin;
      const response = await fetch(usersurl, {
        method: 'POST',
        mode: 'cors',
        credentials : 'include',
      })
      if (!response.ok)
        throw new Error("An error occurred while attempting to update the new Nickname.");
      console.log("a sidi rak dkholti l field dyal Remove");
    } catch (error) {
      console.error('Error posting data:', error);
    }
  }
  
  const remove_user = () => {
    send_remove();
  setbuttonstate("Add");

  }
  return (
    <button
      className=" border-red-400 w-[70px] h-[30px] bg-accent_red font-bold text-white"
      onClick={remove_user}
    >
      {" "}
      {buttonstate}{" "}
    </button>
  );
}
else if(buttonstate === "Cancel")
{

  const send_cancel = async () => {
    try {
      const usersurl = "http://localhost:3001/user/cancelfriend/" + user_data.intraLogin;
      const response = await fetch(usersurl, {
        method: 'POST',
        mode: 'cors',
        credentials : 'include',
      })
      if (!response.ok) throw new Error("An error occurred while attempting to update the new Nickname.");

      console.log("a sidi rak dkholti l field dyal Cancel");

    } catch (error) {
      console.error('Error posting data:', error);
    }
  }
  
  const cancel_user = () => {
    send_cancel();
    setbuttonstate("Add");

  }
  
  return (
    <button
      className=" border-red-400 w-[70px] h-[30px] bg-accent_red font-bold text-white"
      onClick={cancel_user}
    >
      {" "}
      {buttonstate}{" "}
    </button>
  );
  }
else if(buttonstate === "Accept")
{

  const send_accept = async () => {
    try {
      const usersurl = "http://localhost:3001/user/acceptfriend/" + user_data.intraLogin;
      const response = await fetch(usersurl, {
        method: 'POST',
        mode: 'cors',
        credentials : 'include',
      })
      if (!response.ok) throw new Error("An error occurred while attempting to update the new Nickname.");


      console.log("a sidi rak dkholti l field dyal Cancel");

    } catch (error) {
      console.error('Error posting data:', error);
    }
  }
  
  const cancel_user = () => {
    send_accept();
    setbuttonstate("Remove");

  }
  
  return (
    <button
      className=" border-red-400 w-[70px] h-[30px] bg-accent_red font-bold text-white"
      onClick={cancel_user}
    >
      {" "}
      {buttonstate}{" "}
    </button>
  );
  }

  else {

    const send_add = async () => {
      try {
        const usersurl = "http://localhost:3001/user/addfriend/" + user_data.intraLogin;

        const response = await fetch(usersurl, {
          method: 'POST',
          mode: 'cors',
          credentials : 'include',
        })
        if (!response.ok) throw new Error("An error occurred while attempting to update the new Nickname.");
        // props.updatingadd_remov_cancel(!props.setupdatingadd_remov_cancel);

      } catch (error) {
        console.error('Error posting data:', error);
      }
    }
    const add_user = () => {
      send_add();
      setbuttonstate("Cancel");

    }
  return (
    <button
      className=" border-red-400 w-[70px] h-[30px] bg-accent_red font-bold text-white"
      onClick={add_user}
    >
      {" "}
      {buttonstate}{" "}
    </button>
  );

}
}

const Publicuserinfo = (props: any) => {
  console.log("salam starting Public user info :", props);
  const user_data = props.users_data;

  return (
    <div className="flex flex-col w-full sm:w-[464px]">
      <a className="text-white truncate ">PROFILE</a>
      <div className=" w-full h-[380px]  sm:w-[464px]    bg-primary_blue flex flex-col items-center space-y-5 pt-8 pb-8">
        <img
          src={user_data.avatarLink}
          alt=""
          className="h-32 w-32 sm:h-[174px] sm:w-[174px] border-4 br "
        />
        <label className="h-full w-full text-4xl sm:w-[140px] sm:h-[41px] text-center font-lilita-one  text-stroke text-white">
          {" "}
          {user_data.intraLogin}{" "}
        </label>
        <label className="h-full w-full text-2xl sm:w-[104] sm:h-[27px]  text-stroke text-center font-lilita-one text-white">
          {" "}
          {user_data.nickname}{" "}
        </label>
        <div className="w-[full] h-[full] flex justify-center space-x-6">
          <div className="w-fit h-fit">
            <Publicuserinfo_add_remove_cancel
              users_data={user_data}
              connected_user={props.connected_user}
            />
          </div>
          <div className="w-fit h-fit">
            <Publicuserinfo_block_unblock
              users_data={user_data}
              connected_user={props.connected_user}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Publicuserinfo;

import { postacceptfriend, postaddfriend, postblockuser, postcancelfriend, postremovefriend, postunblockuser } from "@/app/(authenticated)/(handlers)/requestHandler";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

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
        // const usersurl =
        //   "http://localhost:3001/user/blockuser/" + user_data.intraLogin;
        // const response = await fetch(usersurl, {
        //   method: "POST",
        //   mode: "cors",
        //   credentials: "include",
        // });
        // if (!response.ok)
        //   throw new Error(
        //     "An error occurred while attempting to update the new Nickname."
        //   );
        const response = await postblockuser(user_data.intraLogin);
        // setisBlocked(response);
        toast.error("User Blocked successfuly !");
      } catch (error:any) {
        // console.error("Error posting data:", error);
        if (error?.response?.status === 403)
          toast.error("User Not Blocked !");
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
        // const usersurl =
        //   "http://localhost:3001/user/unblockuser/" + user_data.intraLogin;
        // const response = await fetch(usersurl, {
        //   method: "POST",
        //   mode: "cors",
        //   credentials: "include",
        // });
        // if (!response.ok)
        //   throw new Error(
        //     "An error occurred while attempting to update the new Nickname."
        //   );
        const response = await postunblockuser(user_data.intraLogin);
        // setUser_data(response);
        toast.success("User UnBlocked successfully");
  
      } catch (error:any) {
        if (error?.response?.status === 403)
          toast.error("User Not Blocked !");
        // console.error("Error posting data:", error);
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
  
  if ( requested_list.some((obj:any) => obj.intraLogin === users_name))
    return ("Accept");
  else if (friends_list.some((obj:any) => obj.intraLogin === users_name))
    return ("Remove");
  else if ( requesting_list.some((obj:any) => obj.intraLogin === users_name))
    return ("Cancel");
  else
    return ("Add");
}


const Publicuserinfo_add_remove_cancel = ( props:any ) => {

  const [buttonstate, setbuttonstate] = useState<string>("Add");
  const user_data = props?.users_data;
  useEffect(() => {
    var relationship = knowstheuserrelationship(props?.connected_user, props?.users_data?.intraLogin);
    setbuttonstate(relationship);

  }, []);
  
  if (buttonstate === "Remove")
{
  
  const send_remove = async () => {
    try {
      // const usersurl = "http://localhost:3001/user/removefriend/" + user_data.intraLogin;
      // const response = await fetch(usersurl, {
      //   method: 'POST',
      //   mode: 'cors',
      //   credentials : 'include',
      // })
      // // if (!response.ok)
      // //   throw new Error("An error occurred while attempting to update the new Nickname.");
      // // if(response.status === 403)
      //   // console.error("wa fin a charika l3ama :D");
      // console.log("a sidi rak dkholti l field dyal Remove");
      const response = await postremovefriend(user_data.intraLogin);
      // setUser_data(response);
      toast.success("User Removed successfully");

    } catch (error:any) {
      if (error?.response?.status === 403)
        toast.error("User Not Friend !");
      // console.error('Error posting data:', error);
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
      // const usersurl = "http://localhost:3001/user/cancelfriend/" + user_data.intraLogin;
      // const response = await fetch(usersurl, {
      //   method: 'POST',
      //   mode: 'cors',
      //   credentials : 'include',
      // })
      // if (!response.ok) throw new Error("An error occurred while attempting to update the new Nickname.");
      // if(response.status === 403)
      // console.error("wa fin a charika l3ama :D");
      // console.log("a sidi rak dkholti l field dyal Cancel");

      const response = await postcancelfriend(user_data.intraLogin);
      // setUser_data(response);
      toast.success("User Canceled successfully");

    } catch (error:any) {
      if (error?.response?.status === 403)
        toast.error("User Not Waiting For Invite !");
      // console.error('Error posting data:', error);
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
      // const usersurl = "http://localhost:3001/user/acceptfriend/" + user_data.intraLogin;
      // const response = await fetch(usersurl, {
      //   method: 'POST',
      //   mode: 'cors',
      //   credentials : 'include',
      // })
      const response = await postacceptfriend(user_data.intraLogin);
      // setUser_data(response);
      toast.success("User Accept successfully");
    } catch (error:any) {
      if (error?.response?.status === 403)
        toast.error("User has nothing to Accept !");
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
        // const usersurl = "http://localhost:3001/user/addfriend/" + user_data.intraLogin;

        // const response = await fetch(usersurl, {
        //   method: 'POST',
        //   mode: 'cors',
        //   credentials : 'include',
        // })
        // if (!response.ok) throw  response;

        const response = await postaddfriend(user_data.intraLogin);
        // setUser_data(response);
        toast.success("User Add successfully");
      } catch (error:any) {
        if (error?.response?.status === 403)
          toast.error("User Can't be Add !");
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
          src={user_data?.avatarLink || ''}
          alt=""
          className="h-32 w-32 sm:h-[174px] sm:w-[174px] border-4 br "
        />
        <span className="h-full w-full text-4xl sm:w-[140px] sm:h-[41px] text-center text-white">
          {" "}
          {user_data?.intraLogin || ''}{" "}
        </span>
        <span className="h-full w-full text-2xl sm:w-[104] sm:h-[27px] text-center text-white">
          {" "}
          {user_data?.nickname || ''}{" "}
        </span>
        <div className="w-[full] h-[full] flex justify-center space-x-6">
          {user_data &&
          <> <div className="w-fit h-fit">
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
          </div></>}
        </div>
      </div>
    </div>
  );
};

export default Publicuserinfo;

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
        const response = await postblockuser(user_data.intraLogin);
        toast.success("User Blocked successfuly !");
        setisBlocked(true);
      } catch (error:any) {
    toast.error(error.response.data.message);

        if (error.response.status === 401)
          window.location.replace("/");
        // if (error?.response?.status === 403)
        //   toast.error("User Not Blocked !");
          props.setstricted(true);
      }
    };
    const block_unblock_user = () => {
      send_block();
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
        const response = await postunblockuser(user_data.intraLogin);
        toast.success("User UnBlocked successfully");
        setisBlocked(false);
      } catch (error:any) {
    toast.error(error.response.data.message);

        if (error.response.status === 401)
          window.location.replace("/");
        // if (error?.response?.status === 403)
        //   toast.error("User Not Blocked !");
          props.setstricted(true);

      }
    };
    const block_unblock_user = () => {
      send_unblock();
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
      const response = await postremovefriend(user_data.intraLogin);
      toast.success("User Removed successfully");
      setbuttonstate("Add");

    } catch (error:any) {
      if (error.response.status === 401)
         window.location.replace("/");
      if (error?.response?.status === 403)
        toast.error("User Not Friend !");
      props.setstrictedadd(true);
        // props.setstricted(true);

    }
  }
  
  const remove_user = () => {
    send_remove();

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
      const response = await postcancelfriend(user_data.intraLogin);
      toast.success("User Canceled successfully");
    setbuttonstate("Add");

    } catch (error:any) {
    toast.error(error.response.data.message);

      if (error.response.status === 401)
        window.location.replace("/");
      // if (error?.response?.status === 403)
      //   toast.error("User Not Waiting For Invite !");
        // props.setstricted(true);
      props.setstrictedadd(true);


    }
  }
  
  const cancel_user = () => {
    send_cancel();

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
      const response = await postacceptfriend(user_data.intraLogin);
      toast.success("User Accept successfully");
    setbuttonstate("Remove");

    } catch (error:any) {
    toast.error(error.response.data.message);

      if (error.response.status === 401)
        window.location.replace("/");
      // if (error?.response?.status === 403)
      //   toast.error("User has nothing to Accept !");
        // props.setstricted(true);
        props.setstrictedadd(true);

    }
  }
  
  const cancel_user = () => {
    send_accept();

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
        const response = await postaddfriend(user_data.intraLogin);
        toast.success("User Add successfully");
        setbuttonstate("Cancel");
      } catch (error:any) {
    toast.error(error.response.data.message);

        if (error.response.status === 401)
        window.location.replace("/");
        // if (error?.response?.status === 403)
        //   toast.error("User Can't be Add !");
        // setbuttonstate("Accept");
      props.setstrictedadd(true);
      }
    }
    const add_user = () => {
      send_add();

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
  const [strictedadd, setstrictedadd] = useState(false);
  const [stricted, setstricted] = useState(props.connected_user.blockedOf?.filter(
    (item: any) => item.intraLogin === user_data.intraLogin
  ).length);

  console.log(" strictedadd value :", strictedadd, "stricted value :", stricted)
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
            {
             stricted ||  strictedadd ? 
              <button
              className=" border-red-400 w-[70px] h-[30px] bg-accent_red font-bold text-white opacity-40 " 
            >
              {" "}
              Add{" "}
            </button>
              :
              <Publicuserinfo_add_remove_cancel
              users_data={user_data}
              connected_user={props.connected_user}
              setstrictedadd={setstrictedadd}
              />
             }

          </div>
          <div className="w-fit h-fit">
          {
              stricted ? 
              <button
              className=" border-red-400 w-[70px] h-[30px] bg-accent_red font-bold text-white opacity-40"
            >
              {" "}
              Block{" "}
            </button>
              :

            <Publicuserinfo_block_unblock
              users_data={user_data}
              connected_user={props.connected_user}
              setstricted={setstricted}
            />
          }

          </div></>}
        </div>
      </div>
    </div>
  );
};

export default Publicuserinfo;

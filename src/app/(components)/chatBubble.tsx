import React from "react";
import { User } from "../(interfaces)/userInterface";
import { Message } from "../(interfaces)/messageInterface";

const ChatBubble = (props: any) => {
    const user: User = props.user;
    const message: Message = props.message;
    const handleUsernameClick = () => {
      console.log("clicked");
    };
  
    if (message.senderLogin === user.intraLogin) {
      return (
        <div className=" ml-auto bg-slate-300 rounded-lg shadow-lg  m-4 p-4 max-w-md w-[60%]">
          <div className="flex">
            <p className="text-gray-800 text-xs">{message.content}</p>
          </div>
        </div>
      );
    } else
      return (
        <div className="bg-white rounded-lg shadow-lg  mr-auto m-4 p-4 max-w-md w-[60%]">
          <button
            onClick={() => handleUsernameClick()}
            className="flex gap-3 items-center"
          >
            <img
              src={
                "https://cdn.intra.42.fr/users/77f43efbcf2ad3a94f96bfc46e426e1e/hchahid.jpg"
              }
              alt="Profile Picture"
              className="w-8 h-8 rounded-full mb-2"
            />
            <span className="text-accent_red">{message.senderLogin}</span>
          </button>
          <div className="flex">
            <div className="ml-6">
              <p className="text-gray-800 text-xs">{message.content}</p>
            </div>
          </div>
        </div>
      );
  };

export default ChatBubble;
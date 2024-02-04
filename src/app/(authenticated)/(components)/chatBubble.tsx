import React from "react";
import { User } from "../(interfaces)/userInterface";
import { Message } from "../(interfaces)/messageInterface";
import { useRouter } from "next/navigation";

const ChatBubble = (props: any) => {
  const user: User = props.user;
  const message: Message = props.message;
  const router = useRouter();
  const handleUsernameClick = () => {
    router.push(`/profile/${message.senderLogin}`);
  };

  if (message.senderLogin === user.intraLogin) {
    return (
      <div className=" ml-auto bg-slate-300 rounded-lg shadow-lg  m-4 p-4 max-w-md w-[60%] red">
        <div className="flex">
          <p className="text-gray-800 text-xs ">{message.content}</p>
        </div>
      </div>
    );
  } else
    return (
      <div className="bg-white rounded-lg shadow-lg  mr-auto m-4 p-4 max-w-md w-[60%] red">
        <button
          onClick={() => handleUsernameClick()}
          className="flex gap-3 items-center"
        >
          <img
            src={message.sender.avatarLink}
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

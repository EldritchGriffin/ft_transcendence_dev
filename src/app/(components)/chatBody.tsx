"use client";
import React, { useEffect, useState } from "react";
import { Channel } from "../(interfaces)/channelInterface";
import { fetchChannelMessages } from "../(handlers)/requestHandler";
import ChatBubble from "./chatBubble";
import { User } from "../(interfaces)/userInterface";

const handleSendMessage = (socket: any, channel: Channel, user: User) => {
  const message = document.getElementById("message") as HTMLInputElement;
  if (!message) return;
  const messageText = message.value;
  if (!messageText) return;
  const messageData = {
    channelId: channel.id,
    content: messageText,
    senderLogin: user.intraLogin,
  };
  socket.emit("sendMessage", messageData);
  message.value = "";
};

const ChatBody = (props: any) => {
  const user = props.user;
  const channel: Channel = props.channel;
  const socket = props.socket;
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!channel) return;
    const fetchData = async () => {
      try {
        const messages = await fetchChannelMessages(channel.id.toString());
        setMessages(messages);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    return () => {
      setMessages([]);
      setLoading(true);
    };
  }, [channel]);
  if (!channel) {
    return (
      <div className="flex text-white h-[85%] justify-center items-center text-2xl bg-primary_blue">
        Select a channel to start chatting!
      </div>
    );
  }
  if (loading || !messages || !user) {
    return (
      <div className="flex text-white h-[85%] justify-center items-center text-2xl bg-primary_blue">
        Loading...
      </div>
    );
  }
  return (
    <div className="flex h-[85%] flex-col bg-primary_blue">
      <div className="h-full overflow-y-scroll overflow-x-hidden custom-scrollbar">
        {messages.length === 0 ? (
          <div className="flex text-white h-[85%] justify-center items-center text-2xl bg-primary_blue">
            No messages yet!
          </div>
        ) : (
          messages.map((message: any, index: number) => (
            <ChatBubble key={index} user={user} message={message} />
          ))
        )}
      </div>
      <div className="w-full h-9 text-white">
        <input
          id="message"
          type="text"
          className=" border-b-2 bg-transparent w-full h-full px-4 text-white focus:outline-none"
          placeholder="Type a message..."
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSendMessage(socket, channel, user);
          }}
        />
      </div>
    </div>
  );
};

export default ChatBody;

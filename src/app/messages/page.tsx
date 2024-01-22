'use client'
import React, { useEffect, useState } from "react";
import { Channel } from "../(interfaces)/channelInterface";
import ChatSelector from "../(components)/chatSelector";
import ChannelHeader from "../(components)/channelHeader";
import { io } from "socket.io-client";
import Cookies from "js-cookie";
import ChatBody from "../(components)/chatBody";

const ChatPage = () => {
    const [socket, setSocket] = useState<any>(null);
    const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
    const handleSelectChannel = (channel: Channel) => {
        setSelectedChannel(channel);
    }

    useEffect(() => {
        if (!socket)
        {
            const token = Cookies.get("token");
            const newSocket = io("http://localhost:3001/channels",{
                extraHeaders: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setSocket(newSocket);
            newSocket.on("test", () => {
                console.log("connected");
            });
            return () => {
                newSocket.disconnect();
            };
        }
      }, []);
    return (
        <div className="flex h-screen justify-center items-center">
            <div className="flex flex-row gap-5 h-[430px]">
                <ChatSelector onChannelSelect={handleSelectChannel}/>
                <div className="flex-col h-full">
                    <ChannelHeader channel={selectedChannel}/>
                    <ChatBody socket={socket} channel={selectedChannel}/>
                </div>
            </div>
        </div>
    );
  };
  
  export default ChatPage;
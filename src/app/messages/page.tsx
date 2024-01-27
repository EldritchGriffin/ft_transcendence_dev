'use client'
import React, { useEffect, useState } from "react";
import { Channel } from "../(interfaces)/channelInterface";
import { User } from "../(interfaces)/userInterface";
import ChatSelector from "../(components)/chatSelector";
import ChannelHeader from "../(components)/channelHeader";
import ChatBody from "../(components)/chatBody";
import { io } from "socket.io-client";
import Cookies from "js-cookie";
import { fetchCurrentUser } from "../(handlers)/requestHandler";

const ChatPage = () => {
    const [user, setUser] = useState<User | null>(null);
    const [socket, setSocket] = useState<any>(null);
    const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
    const handleSelectChannel = (channel: Channel) => {
        setSelectedChannel(channel);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user:User = await fetchCurrentUser();
                setUser(user);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
        if (!socket)
        {
            const token = Cookies.get("token");
            const newSocket = io("http://localhost:3001/channels",{
                extraHeaders: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setSocket(newSocket);
            return () => {
                newSocket.disconnect();
            };
        }
        if(!user) fetchData();
      }, []);
    return (
        <div className="flex h-screen justify-center items-center">
            <div className="flex flex-row gap-5 h-[430px]">
                <ChatSelector onChannelSelect={handleSelectChannel}/>
                <div className="flex-col h-full">
                    <ChannelHeader channel={selectedChannel}/>
                    <ChatBody user={user} socket={socket} channel={selectedChannel}/>
                </div>
            </div>
        </div>
    );
  };
  
  export default ChatPage;
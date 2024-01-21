'use client'
import React, { use, useEffect, useState } from "react";
import { Channel } from "../(interfaces)/channelInterface";
import ChatSelector from "../(components)/chatSelector";
import ChannelHeader from "../(components)/channelHeader";
import { io } from "socket.io-client";
import Cookies from "js-cookie";
import { fetchChannelMessages } from "../(handlers)/requestHandler";


const ChatBody = (props:any) => {
    if (!props.channel)
    {
        return (
            <div className="flex text-white h-full justify-center items-center text-2xl bg-primary_blue">
                Select a channel to start chatting!
            </div>
        )
    }
    const channel:Channel = props.channel;
    const [messages, setMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
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
        };
    }, [channel]); 
    
    return (
        <div className="h-full bg-primary_blue">
            <div>
                {messages.map((message:any, index:number) => (
                    <div key={message.id} className="flex flex-row justify-start items-center gap-2 w-full h-10 px-5 text-white hover:bg-cyan-600">
                        <span className="text-sm">{message.content}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

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
            <div className="flex flex-row gap-5">
                <ChatSelector onChannelSelect={handleSelectChannel}/>
                <div className="flex flex-col gap-3">
                    <ChannelHeader channel={selectedChannel}/>
                    <ChatBody channel={selectedChannel}/>
                </div>
            </div>
        </div>
    );
  };
  
  export default ChatPage;
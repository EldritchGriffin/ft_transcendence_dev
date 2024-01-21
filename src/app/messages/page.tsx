'use client'
import React, { use, useEffect, useState } from "react";
import { Channel } from "../(interfaces)/channelInterface";
import ChatSelector from "../(components)/chatSelector";
import ChannelHeader from "../(components)/channelHeader";
import { io } from "socket.io-client";


const chatBody = (props:any) => {
    return (
        <div className="h-full bg-primary_blue">
        </div>
    );
};

const ChatPage = () => {
    const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
    const handleSelectChannel = (channel: Channel) => {
        setSelectedChannel(channel);
        console.log(channel);
    }
    return (
        <div className="flex h-screen justify-center items-center">
            <div className="flex flex-row gap-5">
                <ChatSelector onChannelSelect={handleSelectChannel}/>
                <div className="flex flex-col gap-3">
                    <ChannelHeader channel={selectedChannel}/>
                    <div className="h-full bg-primary_blue">
                    </div>
                </div>
            </div>
        </div>
    );
  };
  
  export default ChatPage;
'use client'
import React, { use, useEffect, useState } from "react";
import { Channel } from "../(interfaces)/channelInterface";
import ChatSelector from "../(components)/chatSelector";

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
                    <div className="bg-primary_blue h-12 w-[32rem]">
                    </div>
                    <div className="h-full bg-primary_blue">
                    </div>
                </div>
            </div>
        </div>
    );
  };
  
  export default ChatPage;
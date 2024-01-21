'use client'
import React, { use, useEffect, useState } from "react";
import { Channel } from "../(interfaces)/channelInterface";
import ChatSelector from "../(components)/chatSelector";

const ChannelHeader = (props:any) => {
    if(props.channel === null)
        return (
            <div className="flex flex-row w-[32rem] h-12 justify-around items-center bg-primary_blue">
                <div className="flex flex-row gap-2">
                    <span className="text-white text-lg">Select a chat</span>
                </div>
            </div>
        );
    return (
        <div className="flex flex-row w-[32rem] h-12 justify-between items-center bg-primary_blue">
            <div className="flex flex-row mx-10">
                <span className="text-white text-lg">{props.channel.title}</span>
            </div>
            <div className="flex flex-row gap-6 mx-10">
                <button className="text-white text-sm">Leave</button>
                <button className="text-white text-sm">Settings</button>
            </div>
        </div>
    );

}

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
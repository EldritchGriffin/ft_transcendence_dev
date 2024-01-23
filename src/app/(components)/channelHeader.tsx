import React from 'react';
import { Channel } from '../(interfaces)/channelInterface';
import { postLeaveChannel } from '../(handlers)/requestHandler';

const ChannelHeader = (props:any) => {
    const channel:Channel = props.channel;
    const handleLeave = async () => {
        try {
            await postLeaveChannel(channel.id);
        } catch (error) {
            console.log("Error leaving channel");
        }
    };
    if(channel === null)
        return (
            <div className="flex w-[32rem] mb-3 h-[12%] justify-center items-center bg-primary_blue">
                <span className="text-white text-lg">Select a chat</span>
            </div>
        );
    return (
        <div className="flex flex-row w-[32rem] mb-3 h-[12%] justify-between items-center bg-primary_blue">
            <div className="flex flex-row mx-10">
                <span className="text-white text-lg">{channel.title}</span>
            </div>
            <div className="flex flex-row gap-6 mx-10">
                <button onClick={() => handleLeave()}className="text-white text-sm hover:text-accent_red">Leave</button>
                <button className="text-white text-sm hover:text-accent_red">Settings</button>
            </div>
        </div>
    );

}
export default ChannelHeader;
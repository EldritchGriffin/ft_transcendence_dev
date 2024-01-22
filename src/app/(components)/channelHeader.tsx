import React from 'react';

const ChannelHeader = (props:any) => {
    if(props.channel === null)
        return (
            <div className="flex w-[32rem] mb-3 h-[12%] justify-center items-center bg-primary_blue">
                <span className="text-white text-lg">Select a chat</span>
            </div>
        );
    return (
        <div className="flex flex-row w-[32rem] mb-3 h-[12%] justify-between items-center bg-primary_blue">
            <div className="flex flex-row mx-10">
                <span className="text-white text-lg">{props.channel.title}</span>
            </div>
            <div className="flex flex-row gap-6 mx-10">
                <button className="text-white text-sm hover:text-accent_red">Leave</button>
                <button className="text-white text-sm hover:text-accent_red">Settings</button>
            </div>
        </div>
    );

}
export default ChannelHeader;
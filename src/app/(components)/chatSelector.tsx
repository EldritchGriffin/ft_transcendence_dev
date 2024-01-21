import React, { useState } from "react";
import ChannelsTab from "./channelsTab";
import FriendsTab from "./friendsTab";

const createChannel = () => {
    return (
        <button className=" bg-accent_red flex w-full h-8 justify-center items-center text-white hover:bg-red-300">
            <span className="text-sm">New Channel</span>
        </button>
    );
}

const selectNewFriend = () => {
    return (
        <button className=" bg-accent_red flex w-full h-8 justify-center items-center text-white hover:bg-red-300">
            <span className="text-sm">New Chat</span>
        </button>
    );
}

const ChatSelector = ({onChannelSelect}:any) => {
    const [selected, setSelected] = useState(0);
    const handleSelect = (index: number) => {
        let selected;
        let unselected;
        
        if(index === 0)
        {
            selected = "friends";
            unselected = "channels";
        }
        else
        {
            selected = "channels";
            unselected = "friends";
        }
        
        document.getElementById(selected)?.classList.remove("text-white");
        document.getElementById(selected)?.classList.add("text-accent_red");
        document.getElementById(unselected)?.classList.remove("text-accent_red");
        document.getElementById(unselected)?.classList.add("text-white");
        setSelected(index);
    }
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);
        const searchTerm = event.target.value;
        //TODO Perform search operations based on the searchTerm
    };

    return (
        <div className="flex flex-col w-[200px] h-[430px] bg-primary_blue">
            <div className="flex w-full h-10 mt-2 justify-center gap-5">
                <button onClick={() => handleSelect(0)}>
                    <span id="friends" className="text-accent_red text-sm">Friends</span>
                </button>
                <button onClick={() => handleSelect(1)}>
                    <span id="channels" className="text-white text-sm">Channels</span>
                </button>
            </div>
            <div className="flex justify-center items-center flex-col">
                <input
                    type="text"
                    placeholder="Search"
                    className="my-5 text-white text-[10px] bg-transparent border-b focus:outline-none"
                    onChange={handleSearch}
                />
            </div>
            {selected === 0 ? <FriendsTab onChannelSelect={onChannelSelect}/> : <ChannelsTab onChannelSelect={onChannelSelect}/>}
            <div>
                {selected === 0 ? selectNewFriend() : createChannel()}
            </div>
        </div>
    );
};

export default ChatSelector;
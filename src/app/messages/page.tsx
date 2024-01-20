'use client'
import React, { use, useEffect, useState } from "react";
import { fetchChannels } from "../(handlers)/requestHandler";
import { fetchUserDms } from "../(handlers)/requestHandler";
import { Channel } from "../(interfaces)/channelInterface";

const FriendsTab = () => {
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const friends = await fetchUserDms();
                setFriends(friends);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    if (loading) {
        return <p className='flex text-white h-full justify-center items-center text-2xl'>Loading...</p>;
    }
    return (
        <div className="h-full overflow-scroll custom-scrollbar">
            <div className="flex flex-col gap-2">
                {friends.map((friend:Channel, index) => (
                    <button key={index} className="flex flex-row justify-start items-center gap-2 w-full h-10 px-5 text-white hover:bg-cyan-600">
                        <span className="text-sm">{friend.title}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

const ChannelsTab = () => {
    const [channels, setChannels] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const channels = await fetchChannels();
                setChannels(channels);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    if (loading) {
        return <p className='flex text-white h-full justify-center items-center text-2xl'>Loading...</p>;
    }
    return (
        <div className="h-full overflow-scroll custom-scrollbar">
            <div className="flex flex-col gap-2">
                {channels.map((channel:Channel, index) => (
                    <button key={index} className="flex flex-row justify-start items-center gap-2 w-full h-10 px-5 text-white hover:bg-cyan-600">
                        <span className="text-sm">{channel.title}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

const ChatSelector = () => {
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
        // Perform search operations based on the searchTerm
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
            {selected === 0 ? <FriendsTab /> : <ChannelsTab />}
            <div >
                <button className=" bg-accent_red flex w-full h-8 justify-center items-center text-white hover:bg-red-300">
                    <span className="text-sm">Create Channel</span>
                </button>
            </div>
        </div>
    );
};
const ChatPage = () => {
    const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
    const handleSelectChannel = (channel: Channel) => {
        setSelectedChannel(channel);
    }
    return (
        <div className="flex h-screen justify-center items-center">
            <div className="flex flex-row gap-5">
                <ChatSelector />
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
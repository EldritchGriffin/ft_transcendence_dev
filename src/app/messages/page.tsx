'use client'
import React, { useState } from "react";

const selectedTab = (selected:number) => {
    if(selected === 0) 
    return (
        <div className="flex h-full flex-col bg-slate-600">
        </div>
    )
    else 
    return (
        <div className="h-full">
        </div>
    )
}


const ChatSelector = () => {
    const [selected, setSelected] = useState(0);
    const tab = selectedTab(selected);

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
        <div className="w-[200px] h-[430px] bg-primary_blue flex flex-col">
            <div className="flex w-full h-10 justify-center gap-5">
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
            {tab}
        </div>
    );
};
const ChatPage = () => {
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
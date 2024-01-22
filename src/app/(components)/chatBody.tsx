import React, { useEffect, useState } from "react";
import { Channel } from "../(interfaces)/channelInterface";
import { fetchChannelMessages } from "../(handlers)/requestHandler";

const ChatBubble = (message:any) => {
    console.log(message);
    return (
        <div className="bg-white rounded-lg shadow-lg  m-4 p-4 max-w-md w-full">
          <img src={"https://cdn.intra.42.fr/users/5e979f3a2414cbc8d47531b560a61f8b/ylamraou.jpg"} alt="Profile Picture" className="w-8 h-8 rounded-full mb-2" />
          <div className="flex">
            <div className="flex-shrink-0">
              <div className="h-6 w-6 transform rotate-45 bg-white shadow-md" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}></div>
            </div>
            <div className="ml-2">
              <p className="text-gray-800 text-sm">{message.content}</p>
            </div>
          </div>
        </div>
      );
}

const ChatBody = (props:any) => {
    const channel:Channel = props.channel;
    const [messages, setMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if(!channel) return;
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
            setLoading(true);
        };
    }, [channel]); 
    if (!channel) {
        return (
            <div className="flex text-white h-[85%] justify-center items-center text-2xl bg-primary_blue">
                Select a channel to start chatting!
            </div>
        )
    }
    if (loading) {
        return (
            <div className="flex text-white h-[85%] justify-center items-center text-2xl bg-primary_blue">
                Loading...
            </div>
        )
    }
    return (
        <div className="flex h-[85%] flex-col bg-primary_blue">
            <div className="h-full overflow-y-scroll custom-scrollbar">
                {messages.map((message:any, index:number) => (
                    <ChatBubble key={index} {...message}/>
                ))}
            </div>
            <div className="w-full h-8 text-white">
                <input 
                    id="message"
                    type="text"
                    className=" border-b-2 bg-transparent w-full h-full px-4 text-white focus:outline-none"
                    placeholder="Type a message..."/>
            </div>
        </div>
    );

};

export default ChatBody;
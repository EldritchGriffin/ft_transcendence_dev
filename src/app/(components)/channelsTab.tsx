import React, {useEffect, useState} from 'react';
import {fetchChannels} from '../(handlers)/requestHandler';
import {Channel} from '../(interfaces)/channelInterface';

const ChannelsTab = ({onChannelSelect}:any) => {
    const [channels, setChannels] = useState([]);
    const [loading, setLoading] = useState(true);
    const handleSelect = (channel: Channel) => {
        onChannelSelect(channel);
    };
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
    }, [channels]);
    if (loading) {
        return <p className='flex text-white h-full justify-center items-center text-2xl'>Loading...</p>;
    }
    return (
        <div className="h-full overflow-scroll custom-scrollbar">
            <div className="flex flex-col gap-2">
                {channels.map((channel:Channel, index) => (
                    <button onClick={() => handleSelect(channel)} key={index} className="flex flex-row text-left justify-start items-center gap-2 w-full h-10 px-5 text-white hover:bg-cyan-600">
                        <span className="text-sm">{channel.title}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ChannelsTab;
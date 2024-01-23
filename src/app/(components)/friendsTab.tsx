import React, {useEffect, useState} from 'react';
import {fetchUserDms} from '../(handlers)/requestHandler';
import {Channel} from '../(interfaces)/channelInterface';

const FriendsTab = ({onChannelSelect}:any) => {
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);
    const handleSelect = (channel: Channel) => {
        onChannelSelect(channel);
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const friends = await fetchUserDms();
                setFriends(friends);
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [friends]);
    if (loading) {
        return <p className='flex text-white h-full justify-center items-center text-2xl'>Loading...</p>;
    }
    return (
        <div className="h-full overflow-scroll custom-scrollbar">
            <div className="flex flex-col gap-2">
                {friends.map((friend:Channel, index) => (
                    <button onClick={() => handleSelect(friend)} key={index} className="flex flex-row justify-start items-center text-left gap-2 w-full h-10 px-5 text-white hover:bg-cyan-600">
                        <span className="text-sm">{friend.title}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default FriendsTab;
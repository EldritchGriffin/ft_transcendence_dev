import React, { useState } from "react";
import ChannelsTab from "./channelsTab";
import FriendsTab from "./friendsTab";
import CreateChannelModal from "./createChannelModal";
import JoinChannelModal from "./joinChannelModal";

const CreateChannel = (props: any) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const toggleCreateModal = () => {
    setShowCreateModal(!showCreateModal);
  };
  const toggleJoinModal = () => {
    setShowJoinModal(!showJoinModal);
  };
  return (
    <div className="flex">
      <button
        onClick={() => toggleCreateModal()}
        className=" bg-accent_red flex w-full h-8 justify-center items-center text-white hover:bg-red-300"
      >
        <span className="text-sm">Create</span>
      </button>
      <button
        onClick={() => toggleJoinModal()}
        className=" bg-accent_red flex w-full h-8 justify-center items-center text-white hover:bg-red-300"
      >
        <span className="text-sm">Join</span>
      </button>
      {showCreateModal ? (
        <CreateChannelModal
          toggleModal={toggleCreateModal}
          setChannels={props.setChannels}
        />
      ) : null}
      {showJoinModal ? (
        <JoinChannelModal
          toggleModal={toggleJoinModal}
          setChannels={props.setChannels}
        />
      ) : null}
    </div>
  );
};

const SelectNewFriend = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  return (
    <button className=" bg-accent_red flex w-full h-8 justify-center items-center text-white hover:bg-red-300">
      <span className="text-sm">New Chat</span>
    </button>
  );
};

const ChatSelector = (props: any) => {
  const [selected, setSelected] = useState(0);
  const handleSelect = (index: number) => {
    let selected;
    let unselected;

    if (index === 0) {
      selected = "friends";
      unselected = "channels";
    } else {
      selected = "channels";
      unselected = "friends";
    }

    document.getElementById(selected)?.classList.remove("text-white");
    document.getElementById(selected)?.classList.add("text-accent_red");
    document.getElementById(unselected)?.classList.remove("text-accent_red");
    document.getElementById(unselected)?.classList.add("text-white");
    setSelected(index);
  };
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    const searchTerm = event.target.value;
    //TODO Perform search operations based on the searchTerm
  };

  return (
    <div className="flex flex-col w-[200px] h-full bg-primary_blue">
      <div className="flex w-full h-10 mt-2 justify-center gap-5">
        <button onClick={() => handleSelect(0)}>
          <span id="friends" className="text-accent_red text-sm">
            Friends
          </span>
        </button>
        <button onClick={() => handleSelect(1)}>
          <span id="channels" className="text-white text-sm">
            Channels
          </span>
        </button>
      </div>
      <div className="flex justify-center items-center flex-col">
        <input
          id="search"
          type="text"
          placeholder="Search"
          className="my-5 text-white text-[10px] bg-transparent border-b focus:outline-none"
          onChange={handleSearch}
        />
      </div>
      {selected === 0 ? (
        <FriendsTab onChannelSelect={props.onChannelSelect} />
      ) : (
        <ChannelsTab
          onChannelSelect={props.onChannelSelect}
          channels={props.channels}
          setChannels={props.setChannels}
        />
      )}
      <div>
        {selected === 0 ? (
          <SelectNewFriend />
        ) : (
          <CreateChannel setChannels={props.setChannels} />
        )}
      </div>
    </div>
  );
};

export default ChatSelector;

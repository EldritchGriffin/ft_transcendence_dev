import { Channel } from "../(interfaces)/channelInterface";
import { postLeaveChannel } from "../(handlers)/requestHandler";
import { useState } from "react";
import { toast } from "react-toastify";
import { User } from "../(interfaces)/userInterface";

const deduceGrade = (
  ownerLogin: string,
  admins: User[],
  members: User[],
  currentUser: User
) => {
  if (currentUser.intraLogin === ownerLogin) return "owner";
  if (admins.some((admin: User) => admin.intraLogin === currentUser.intraLogin))
    return "admin";
  if (members.some((member: User) => member.intraLogin === currentUser.intraLogin))
    return "member";
  return "none";
};

const SettingsModal = (props: any) => {
  const channel: Channel = props.channel;
  const user: User = props.user;
  const userGrade = deduceGrade(
    channel.ownerLogin,
    channel.admins,
    channel.members,
    user
  );
  return (
    <div className="flex justify-center items-center fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm">
      <div className="flex flex-col bg-white rounded-lg shadow-lg p-4">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-xl">Settings</h1>
          <button onClick={() => props.toggleModal()} className="text-xl">
            &times;
          </button>
        </div>
        <div className="flex flex-col gap-3 h-96 w-80">
          
        </div>
      </div>
    </div>
  );
};

const ChannelHeader = (props: any) => {
  const selectedChannel: Channel = props.channel;
  const channels: Channel[] = props.channels;
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const handleLeave = async () => {
    try {
      await postLeaveChannel(selectedChannel.id);
      const newChannels = channels.filter(
        (channel: Channel) => channel.id !== selectedChannel.id
      );
      props.setChannels(newChannels);
      props.setSelectedChannel(null);
    } catch (error) {
      toast.error("Cannot leave a DM");
    }
  };
  if (selectedChannel === null)
    return (
      <div className="flex w-[32rem] mb-3 h-[12%] justify-center items-center bg-primary_blue">
        <span className="text-white text-lg">Select a chat</span>
      </div>
    );
  return (
    <div className="flex flex-row w-[32rem] mb-3 h-[12%] justify-between items-center bg-primary_blue">
      <div className="flex flex-row mx-10">
        <span className="text-white text-lg">{selectedChannel.title}</span>
      </div>
      <div className="flex flex-row gap-6 mx-10">
        <button
          onClick={() => handleLeave()}
          className="text-white text-sm hover:text-accent_red"
        >
          Leave
        </button>
        {selectedChannel.type == "Channel" ? (
          <button
            onClick={() => toggleModal()}
            className="text-white text-sm hover:text-accent_red"
          >
            Settings
          </button>
        ) : null}
        {showModal ? (
          <SettingsModal
            toggleModal={toggleModal}
            channel={selectedChannel}
            user={props.user}
          />
        ) : null}
      </div>
    </div>
  );
};
export default ChannelHeader;

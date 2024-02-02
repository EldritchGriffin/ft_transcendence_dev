import { Channel } from "../(interfaces)/channelInterface";
import { postLeaveChannel } from "../(handlers)/requestHandler";
import { use, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { User } from "../(interfaces)/userInterface";
import { SlArrowDown } from "react-icons/sl";
import { Socket } from "socket.io-client";
import { postChmod } from "../(handlers)/requestHandler";
import { postChangeTitle } from "../(handlers)/requestHandler";

const deduceGrade = (
  ownerLogin: string,
  admins: User[],
  members: User[],
  currentUser: User
) => {
  if (currentUser.intraLogin === ownerLogin) return "owner";
  if (admins.some((admin: User) => admin.intraLogin === currentUser.intraLogin))
    return "admin";
  if (
    members.some((member: User) => member.intraLogin === currentUser.intraLogin)
  )
    return "member";
  return "none";
};

const OwnerControls = (props: any) => {
  const channel = props.channel;
  const [access, setAccess] = useState(channel.access);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleChangeAccess = async () => {
    const access = document.getElementById("access") as HTMLSelectElement;
    const value = access.value;
    const data = {
      channel: channel.id,
      access: value,
    };
    try {
      await postChmod(data);
      toast.success("Access changed");
    } catch (error) {
      console.log(error);
      toast.error("Error changing access");
    }
  };
  const handleChangeTitle = async () => {
    const title = document.getElementById("title") as HTMLInputElement;
    const value = title.value;
    const data = {
      channel: channel.id,
      title: value,
    };
    try {
      await postChangeTitle(data);
      toast.success("Title changed");
    } catch (error) {
      toast.error("Error changing title");
    }
  };
  return (
    <div className="h-full w-80 mt-4 flex flex-col gap-4">
      <span className="text-xl mb-4">Owner controls</span>
      <div className="collapse bg-accent_red w-fit">
        <input type="checkbox" />
        <div className="collapse-title text-xl flex flex-row items-center">
          <span className="text-white w-52">Change title</span>
          <SlArrowDown className="text-sm ml-auto" />
        </div>
        <div className="collapse-content">
          <input
            className="bg-transparent border-b-2 mr-3 text-white focus:outline-none placeholder:text-white placeholder:opacity-30"
            type="text"
            placeholder="New title"
            id="title"
          />
          <button
            onClick={() => handleChangeTitle()}
            className="text-accent_red p-1 bg-white text-xs"
          >
            Submit
          </button>
        </div>
      </div>
      <div className="collapse bg-accent_red w-fit">
        <input type="checkbox" />
        <div className="collapse-title text-xl flex flex-row items-center">
          <span className="text-white w-52">Change access</span>
          <SlArrowDown className="text-sm ml-auto" />
        </div>
        <div className="collapse-content flex-row">
          <div className="flex flex-row">
            <select
              id="access"
              onChange={(e) => setAccess(e.target.value)}
              className="focus:outline-none bg-transparent text-white border-b-2 "
            >
              <option value="3">Public</option>
              <option value="1">Private</option>
              <option value="2">Protected</option>
            </select>
            <button
              onClick={() => handleChangeAccess()}
              className="text-accent_red p-1 bg-white text-xs ml-auto mr-3"
            >
              Submit
            </button>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-sm mt-4">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-b-2 bg-transparent w-full h-full px-4 mb-4 text-black focus:outline-none"
            />
            <span className="text-sm mt-4">Confirm Password</span>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border-b-2 bg-transparent w-full h-full px-4 mb-4 text-black focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const UserControls = (props: any) => {
  const member: User = props.member;
  return (
    <div className="flex gap-3">
      <button className="text-accent_red text-sm hover:text-red-300">
        Profile
      </button>
      <button className="text-accent_red text-sm hover:text-red-300">
        Play
      </button>
    </div>
  );
};

const AdminControls = (props: any) => {
  const userGrade = props.userGrade;
  const member: User = props.member;
  const channel: Channel = props.channel;
  const memberGrade = deduceGrade(
    channel.ownerLogin,
    channel.admins,
    channel.members,
    member
  );
  const value = memberGrade === "admin" ? "Demote" : "Promote";

  return (
    <div className="flex gap-3">
      <button className="text-accent_red text-sm hover:text-red-300">
        Kick
      </button>
      <button className="text-accent_red text-sm hover:text-red-300">
        Ban
      </button>
      <button className="text-accent_red text-sm hover:text-red-300">
        Mute
      </button>
      {userGrade === "owner" ? (
        <button className="text-accent_red text-sm hover:text-red-300">
          {value}
        </button>
      ) : null}
      <UserControls member={member} />
    </div>
  );
};

const MemberList = (props: any) => {
  const channel: Channel = props.channel;
  const user: User = props.user;
  const userGrade = props.userGrade;
  const [filteredMembers, setFilteredMembers] = useState<User[]>(
    channel.members
  );
  const handleSearch = () => {
    const input = document.getElementById("MemberSearch") as HTMLInputElement;
    const value = input.value.toLowerCase();
    if (value === "") setFilteredMembers(channel.members);
    else
      setFilteredMembers(
        channel.members.filter((friend: User) =>
          friend.intraLogin.toLowerCase().includes(value)
        )
      );
  };
  return (
    <div className="">
      <div className="flex flex-col justify-between items-center mb-8">
        <input
          id="MemberSearch"
          className="w-80 h-7 rounded-md border-b-2  mt-4 focus:outline-none"
          type="text"
          placeholder="Search"
          onChange={() => handleSearch()}
        />
      </div>
      <div className="w-80 h-80 flex flex-col gap-4 overflow-scroll custom-scrollbar">
        {filteredMembers.map((member: User, index) =>
          member.intraLogin === user.intraLogin ? null : (
            <div
              key={index}
              className="flex flex-row justify-between items-center "
            >
              <div className="collapse bg-base-200">
                <input type="checkbox" />
                <div className="collapse-title text-xl flex flex-row items-center">
                  <span className="">{member.intraLogin}</span>
                  <SlArrowDown className="text-sm ml-auto" />
                </div>
                <div className="collapse-content">
                  {userGrade != "member" ? (
                    <AdminControls
                      channel={channel}
                      userGrade={userGrade}
                      member={member}
                    />
                  ) : (
                    <UserControls member={member} />
                  )}
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
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
        <div className="flex flex-row">
          <div>
            {userGrade === "owner" ? <OwnerControls channel={channel} /> : null}
          </div>
          <div className="flex flex-col gap-3 h-96 w-80">
            <MemberList channel={channel} userGrade={userGrade} user={user} />
          </div>
        </div>
      </div>
    </div>
  );
};

const ChannelHeader = (props: any) => {
  const selectedChannel: Channel = props.channel;
  const channels: Channel[] = props.channels;
  const [showModal, setShowModal] = useState(false);
  const socket: Socket = props.socket;
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleLeave = async () => {
    try {
      await postLeaveChannel(selectedChannel.id);
    } catch (error) {
      toast.error("Cannot leave a DM");
    }
  };
  useEffect(() => {
    socket.on("changeTitle", (message: Channel) => {
      const newChannels = channels.map((channel: Channel) => {
        if (channel.id === message.id) {
          return (message.ownerLogin = channel.ownerLogin), message;
        }
        return channel;
      });
      const newChannel = newChannels.find(
        (channel: Channel) => channel.id === message.id
      );
      props.setSelectedChannel(newChannel);
      props.setChannels(newChannels);
    });
    socket.on("leftChannel", (message: Channel) => {
      const newChannels = channels.filter(
        (channel: Channel) => channel.id !== message.id
      );
      props.setChannels(newChannels);
      props.setSelectedChannel(null);
    });
    return () => {
      socket.off("leftChannel");
      socket.off("changeTitle");
    };
  }, [selectedChannel]);
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
            channels={channels}
            user={props.user}
          />
        ) : null}
      </div>
    </div>
  );
};
export default ChannelHeader;

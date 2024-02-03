import { Channel } from "../(interfaces)/channelInterface";
import {
  postBanUser,
  postKickUser,
  postLeaveChannel,
  postNewAdmin,
} from "../(handlers)/requestHandler";
import { use, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { User } from "../(interfaces)/userInterface";
import { SlArrowDown } from "react-icons/sl";
import { Socket } from "socket.io-client";
import { postChmod } from "../(handlers)/requestHandler";
import { postChangeTitle } from "../(handlers)/requestHandler";
import { verifyName, verifyPasswords } from "../(handlers)/inputHandlers";
import { useRouter } from "next/navigation";

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
    let data;
    if (value === "2") {
      try {
        verifyPasswords(password, confirmPassword);
      } catch (error) {
        toast.error("Invalid Password");
        return;
      }
      data = {
        channel: channel.id,
        access: value,
        password: password,
      };
    } else {
      data = {
        channel: channel.id,
        access: value,
      };
    }
    try {
      await postChmod(data);
      toast.success("Access changed");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.log(error);
      toast.error("Error changing access");
    }
  };
  const handleChangeTitle = async () => {
    const title = document.getElementById("title") as HTMLInputElement;
    const value = title.value;

    try {
      verifyName(value);
    } catch (error) {
      toast.error("Invalid name");
      return;
    }
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
          {access === "2" ? (
            <div className="flex flex-col gap-3">
              <span className="text-sm mt-4 text-white">Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-b-2 bg-transparent w-full h-full  mb-4 text-white focus:outline-none placeholder:text-white placeholder:opacity-30"
                placeholder="New password"
              />
              <span className="text-sm mt-4 text-white">Confirm Password</span>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border-b-2 bg-transparent w-full h-full  mb-4 text-white focus:outline-none placeholder:text-white placeholder:opacity-30"
                placeholder="Confirm password"
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

//TODO: check because it didnt work when the user wasnt an admin
const UserControls = (props: any) => {
  const router = useRouter();
  const member: User = props.member;
  const handleProfile = () => {
    router.push(`/profile/${member.intraLogin}`);
  };
  return (
    //TODO: add ability to invite a user to play a game
    <div className="flex gap-3">
      <button
        onClick={() => handleProfile()}
        className="text-accent_red text-sm hover:text-red-300"
      >
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
  const socket: Socket = props.socket;
  const [showModal, setShowModal] = useState(false);
  const [duration, setDuration] = useState("1");
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const memberGrade = deduceGrade(
    channel.ownerLogin,
    channel.admins,
    channel.members,
    member
  );
  const value = memberGrade === "admin" ? "Demote" : "Promote";
  const handlePromote = async () => {
    const data = {
      channel: channel.id,
      user: member.intraLogin,
    };
    try {
      await postNewAdmin(data);
      toast.success("User promoted");
    } catch (error) {
      toast.error("Error promoting user");
    }
  };
  //TODO: add demote functionality
  // const handleDemote = async () => {
  //   const data = {
  //     channel: channel.id,
  //     user: member.intraLogin,
  //   };
  // try {
  //     await postNewAdmin(data);
  //     toast.success("User demoted");
  //   } catch (error) {
  //     toast.error("Error demoting user");
  //   }
  // };

  const handleKick = async () => {
    const data = {
      channel: channel.id,
      user: member.intraLogin,
    };
    try {
      await postKickUser(data);
      toast.success("User kicked");
    } catch (error) {
      console.log(error);
      toast.error("Error kicking user");
    }
  };

  const handleBan = async () => {
    const data = {
      channel: channel.id,
      user: member.intraLogin,
    };
    try {
      await postBanUser(data);
      toast.success("User banned");
    } catch (error) {
      console.log(error);
      toast.error("Error banning user");
    }
  };
  const handleMute = (value: number) => {
    const data = {
      channelId: channel.id,
      toMuteLogin: member.intraLogin,
      mutePeriod: value,
    };
    socket.emit("mute", data, (payload: any) => {
      if (payload.error) {
        toast.error(payload.error);
      } else {
        toast.success("User muted");
      }
    });
  };
  return (
    <>
      <div className="flex gap-3">
        <button
          onClick={() => handleKick()}
          className="text-accent_red text-sm hover:text-red-300"
        >
          Kick
        </button>
        <button
          onClick={() => handleBan()}
          className="text-accent_red text-sm hover:text-red-300"
        >
          Ban
        </button>
        <button
          onClick={() => toggleModal()}
          className="text-accent_red text-sm hover:text-red-300"
        >
          Mute
        </button>
        {userGrade === "owner" ? (
          <button
            onClick={() => handlePromote()}
            className="text-accent_red text-sm hover:text-red-300"
          >
            {value}
          </button>
        ) : null}
        <UserControls member={member} />
      </div>
      {showModal ? (
        <div className="mt-4 flex">
          <select
            className="bg-transparent border-b-2 text-sm focus:outline-none"
            onChange={(e) => setDuration(e.target.value)}
            id="mute"
          >
            <option value="1">1 Minute</option>
            <option value="2">1 Hour</option>
            <option value="3">1 Day</option>
          </select>
          <button
            onClick={() => handleMute(parseInt(duration))}
            className="text-accent_red text-sm hover:text-red-300 ml-10"
          >
            save
          </button>
          <button
            onClick={() => toggleModal()}
            className="text-accent_red text-sm hover:text-red-300 ml-10"
          >
            close
          </button>
        </div>
      ) : null}
    </>
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
                      socket={props.socket}
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
            <MemberList
              channel={channel}
              userGrade={userGrade}
              user={user}
              socket={props.socket}
            />
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
    socket.on(
      "leftChannel",
      (message: { targetChannel: Channel; leavingUser: string }) => {
        if (message.leavingUser === props.user.intraLogin) {
          const newChannels = channels.filter(
            (channel: Channel) => channel.id !== message.targetChannel.id
          );
          props.setChannels(newChannels);
          props.setSelectedChannel(null);
          setShowModal(false);
        } else if (
          selectedChannel &&
          message.targetChannel.id === selectedChannel.id
        ) {
          const newChannels = channels.map((channel: Channel) => {
            if (channel.id === message.targetChannel.id) {
              return message.targetChannel;
            }
            return channel;
          });
          props.setChannels(newChannels);
          props.setSelectedChannel(message.targetChannel);
        } else {
          const newChannels = channels.map((channel: Channel) => {
            if (channel.id === message.targetChannel.id) {
              return message.targetChannel;
            }
            return channel;
          });
          props.setChannels(newChannels);
        }
      }
    );
    socket.on(
      "joinedChannel",
      (message: { joinedChannel: Channel; newUser: User }) => {
        if (message.newUser.intraLogin !== props.user.intraLogin) {
          if (
            selectedChannel &&
            message.joinedChannel.id === selectedChannel.id
          ) {
            props.setSelectedChannel(message.joinedChannel);
          }
          const newChannels = channels.map((channel: Channel) => {
            if (channel.id === message.joinedChannel.id) {
              return message.joinedChannel;
            }
            return channel;
          });
          props.setChannels(newChannels);
        }
      }
    );
    socket.on(
      "newOwner",
      (message: { currChannel: Channel; newOwner: string }) => {
        if (selectedChannel && message.currChannel.id === selectedChannel.id) {
          const newChannels = channels.map((channel: Channel) => {
            if (channel.id === message.currChannel.id) {
              return message.currChannel;
            }
            return channel;
          });
          props.setChannels(newChannels);
          props.setSelectedChannel(message.currChannel);
        } else {
          const newChannels = channels.map((channel: Channel) => {
            if (channel.id === message.currChannel.id) {
              return message.currChannel;
            }
            return channel;
          });
          props.setChannels(newChannels);
        }
      }
    );
    return () => {
      socket.off("leftChannel");
      socket.off("changeTitle");
      socket.off("joinedChannel");
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
        {selectedChannel.type == "Channel" ? (
          <>
            <button
              onClick={() => handleLeave()}
              className="text-white text-sm hover:text-accent_red"
            >
              Leave
            </button>
            <button
              onClick={() => toggleModal()}
              className="text-white text-sm hover:text-accent_red"
            >
              Settings
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => {
                console.log("clicked on profile button");
              }}
              className="text-white text-sm hover:text-accent_red"
            >
              Profile
            </button>
            <button
              onClick={() => {
                console.log("clicked play button");
              }}
              className="text-white text-sm hover:text-accent_red"
            >
              <span className="text-white text-sm">Play</span>
            </button>
          </>
        )}
        {showModal ? (
          <SettingsModal
            key={selectedChannel.members.length}
            toggleModal={toggleModal}
            channel={selectedChannel}
            channels={channels}
            user={props.user}
            socket={socket}
          />
        ) : null}
      </div>
    </div>
  );
};
export default ChannelHeader;

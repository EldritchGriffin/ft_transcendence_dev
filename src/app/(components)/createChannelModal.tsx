import React, { useState } from "react";
import { Channel } from "../(interfaces)/channelInterface";
import { postNewChannel } from "../(handlers)/requestHandler";

//TODO add validation for name and password length and characters allowed
const checkName = (name: string) => {
  if (name.length < 3) return false;
  return true;
};

const checkPassword = (password: string, confirmPassword: string) => {
  if (password.length < 8) return false;
  if (password !== confirmPassword) return false;
  return true;
};

const CreateChannelModal = (props: any) => {
  const [name, setName] = useState("");
  const [access, setAccess] = useState("Public");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const createChannel = async () => {
    if (!checkName(name)) return;
    if (access !== "Public")
    {
      if (!checkPassword(password, confirmPassword)) //TODO implement proper error handling
        return; 
    }
    const newChannel = {
      title: name,
      description: "doesn't really matter",
      access: access,
      password: access !== "Public" ? password : undefined,
    };
    console.log(newChannel);
    await postNewChannel(newChannel);
    props.toggleModal();
  };

  return (
    <div className="flex justify-center items-center fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm">
      <div className="flex flex-col bg-white rounded-lg shadow-lg p-4">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-xl">Create a new channel</h1>
          <button onClick={() => props.toggleModal()} className="text-xl">
            &times;
          </button>
        </div>
        <div className="flex flex-col gap-3">
          <span className="text-sm mt-4">Name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-b-2 bg-transparent w-full h-full px-4 text-black focus:outline-none"
          />
          <select
            value={access}
            onChange={(e) => setAccess(e.target.value)}
            className="m-4 focus:outline-none"
          >
            <option value="Public">Public</option>
            <option value="Private">Private</option>
            <option value="Protected">Protected</option>
          </select>
          {access !== "Public" && (
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
          )}
        </div>
        <div className="flex flex-row justify-end gap-3">
          <button
            onClick={() => props.toggleModal()}
            className="bg-accent_red flex w-full h-8 justify-center items-center text-white hover:bg-red-300"
          >
            <span className="text-sm">Cancel</span>
          </button>
          <button
            onClick={() => createChannel()}
            className="bg-accent_red flex w-full h-8 justify-center items-center text-white hover:bg-red-300"
          >
            <span className="text-sm">Create</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateChannelModal;

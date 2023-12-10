import { useParams } from "next/navigation";
import axios from "axios";
import React, { use, useEffect, useState } from "react";

const UpdateProfile = ({ update_nick_name }: any) => {
  const [nickname, setNickname] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nickname", nickname);
    formData.append("description", description);

    // if (file) {
    //   formData.append("file", file);
    // }

    // try {
    //   const response = await axios.put("", formData);
    //   console.log(response.data);
    // } catch (error) {
    //   console.error(error);
    // }
  };
  return (
    <div>
      <button
        className="btn border-none hover:bg-white rounded-none fontzabi bg-costumwhite"
        onClick={() => {
          const modal = document.getElementById(
            "my_modal_1"
          ) as HTMLDialogElement | null;
          if (modal) {
            modal.showModal();
          }
        }}
      >
        <a className="text-costumblack">EDIT PROFILE</a>
      </button>
      <dialog
        id="my_modal_1"
        className="modal bg-gradient-to-t  from-customblue to-customblue/10 backdrop-opacity-20"
      >
        <div className="modal-box bg-costumblack space-y-8">
          <h3 className="font-bold text-lg">Update information</h3>
          <div>
            <p className="text-sm text-gray-600">
              Please enter your new nickname
            </p>
            <input
              type="text"
              name="name"
              className="input input-bordered rounded-none"
              placeholder="Nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              required
              minLength={3}
              maxLength={10}
            />
          </div>
          <div>
            <p className="text-sm text-gray-600">
              Please enter your new description
            </p>
            <input
              type="text"
              className="input input-bordered rounded-none"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              minLength={3}
              maxLength={10}
            />
          </div>
          <div>
            <input
              type="file"
              className="file-input file-input-bordered rounded-none bg-customRed w-full max-w-xs"
              onChange={(e) => {
                const file = e.target.files?.[0];
              }}
            />
          </div>
          <div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span className="ms-3 text-xs font-medium fontzabi text-gray-900 dark:text-gray-300">
                Two Factor Authentication
              </span>
            </label>
          </div>
          <div className="modal-action">
            <form method="dialog" onSubmit={handleSubmit}>
              {/* if there is a button in form, it will close the modal */}
              <button className="btn rounded-none">Close</button>
              <button
                className="btn bg-customRed rounded-none"
                type="submit"
                onClick={() => update_nick_name(description)}
              >
                Update
                {/* update_nick_name */}
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default UpdateProfile;

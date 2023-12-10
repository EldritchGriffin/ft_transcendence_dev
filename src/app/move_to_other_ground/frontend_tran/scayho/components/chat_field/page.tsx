'use client'
import React, { useState, useRef } from 'react';
import './styles.css';
import {Add_channel_compo , Add_channel_promt} from '@/app/move_to_other_ground/frontend_tran/scayho/components/channel_list/add_channel/page';

const Chat_field = ({ show, setshow}:any) => {
  const [count, setcount] = useState(0);
  const [user_name, setuser_name] = useState("scayho");
  const [target_channel, settarget_channel] = useState("JAHAD");
  const [message, setmessage] = useState("");
  const [messageid, setmessageid] = useState("");
  const [target_id, settarget_id] = useState("1");
  const [chat_record, setchat_record] = useState<{
    user_name: string;
    target_channel: string;
    message: string;
    target_id: string;
  }[]>([]);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const sendmessage = (message: string) => {
    if (message.trim() !== "") {
      setcount(count + 1);
      console.log("sendmessage has been called:", count);
      console.log("Before clearing message:", message);

      const newMessage = {
        user_name,
        target_channel,
        message,
        target_id,
        chat_record,
      };

      setchat_record([...chat_record, newMessage]);
      console.log("messages:", newMessage);
      console.log("record of messages:", chat_record);

      setmessage("");

      // Clear the input field using the ref
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setmessage(event.target.value);
  };
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && message.trim() !== "") {
      sendmessage(message);
    }
  };
  return (
    <div className='Chat_field_css overflow-y-auto '>
      <div className="message_tables_chat overflow-y-auto ">
        {chat_record.map((item, index) => (
          <p key={index} className="listingchat  overflow-x-auto text-sm h-fit">
            {item.message}
          </p>
        ))}
      </div>
      <div className="chat_inpute_field bg-white  flex justify-center items-center">
        <input
          ref={inputRef}
          className="input_msg flex justify-start items-start "
          type="text"
          placeholder="JAHAD TRUE KING !"
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
        />
        <button
          className="submit_button_chat_field "
          onClick={() => {
            sendmessage(message);
          }}
        ></button>
      </div>
              {/* {show ? <Add_channel_promt 
          clicko={setshow}
          data={show}
          post_issam={null}
        /> : null} */}
    </div>
  );
};

export default Chat_field;
// 'use client'
// import React, { useState } from 'react'
// import './styles.css';

// // function sendmessage(ok:string) {
// // }





// const Chat_field = () => {
//     const [count, setcount] = useState(0);
//     const [user_name, setuser_name] = useState("scayho");
//     const [target_channel, settarget_channel] = useState("JAHAD");
//     const [message, setmessage] = useState("");
//     const [messageid, setmessageid] = useState("");
//     const [target_id, settarget_id] = useState("1");
//     const [chat_record, setchat_record] = useState<{
//     user_name: string;
//     target_channel: string;
//     message: string;
//     target_id: string;
//     }[]>([]);
//     const sendmessage = (message:string) => {
//         if (message != "")
//         {
//               if (message.trim() !== "") {
//                 // setcount(count + 1);
//                 console.log("sendmessage has been called:", count);
//                 console.log("Before clearing message:", message);}
//             setcount(count + 1);
//             console.log("sendmessage has ben called :", count);
//             const newMessage = {
//                 user_name,
//                 target_channel,
//                 message,
//                 target_id,
//                 chat_record,
//             };
//             setchat_record([...chat_record, newMessage]);
//             console.log("messages :", newMessage);
//             console.log("record of messages :", chat_record);
//             setmessage("");
//         }
//     };
//     const clear_input_babe = (event:any) => {
//         event.target.value = "";
//     };
//     const handleInputChange = (event:any) => {
//         setmessage(event.target.value);
//     };
//     const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
//         if (event.key === 'Enter' && message != "") {
//         sendmessage(message);
//         setmessage("");
//         }
//   };
//   return (
//       <div className='Chat_field_css red'>
//             {chat_record.map((item, index) => (
//                 <p className="listingchat"> {item.message} </p>
//             ))}
//             <div className="chat_inpute_field ">
//                 <input className="input_msg" type="text"  placeholder="JAHAD TURE KING !" onChange={handleInputChange} onKeyDown={handleKeyPress}/>
//                 <button className="submit_button_chat_field " onClick={() => {sendmessage(message)}} ></button>
//             </div>
//     </div>
//   )
// }

// export default Chat_field
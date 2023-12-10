import React from 'react'
import './styles.css';

const Friend_chat_combo = ( {friend_params}: {friend_params: {
  id:number;
  name:string;
}} ) => {
  console.log("hello im been called for :", friend_params.id);
  return (
      <div className='channel_chat_parent'>
      <div className="chat_channel_list"></div>
      {/* <p className="chat_channel_name_list truncate">{kacem.name}</p> truncate for long channel names */}
      <p className="chat_friend_name_list jahad_border_text">{friend_params.name} & {friend_params.id}</p>
      {/* <p className="jahad_border_text">{kacem.name}</p> */}
      {/* <p className="chat_channel_name_list">{kacem.name} salam</p> */}
    </div>
  )
}

export default Friend_chat_combo
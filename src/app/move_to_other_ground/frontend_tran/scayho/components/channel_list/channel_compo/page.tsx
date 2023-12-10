// 'use client'
// import React, { useState } from 'react';
import React from 'react';
import './styles.css';
import Link from 'next/link';
// import { Props } from 'next/script';

type Props = {
  key:number,
  data:string,
  active:number
}

const Channel_chat_combo = ( {channel_params}: {channel_params: {
  id : number;
  key : number;
  data : string;
  active : boolean;
  onClick : any;
 }} ) => {
  // console.log("men wast l component:");
  // console.log("men wast l component:", active,  " | ", data, " | " ,  key, " | " ,  id);
  //   if (!channel_params) {
  //     console.log("tra chi mochkil f data  [Channel_chat_combo]");
  //   return null; // or handle the case when channel_params is undefined
  // }
      console.log("id hwa :", {channel_params});
  return (
    <div className='channel_chat_parent'>
          <button className="chat_channel_name_list" style={{ backgroundColor: channel_params.active ? '#30475E' : '#DDDDDD' }} onClick={ () => channel_params.onClick(channel_params.id) }>
            {channel_params.data} {channel_params.key} {channel_params.active} 
          </button>
           {/* <button className="chat_channel_name_list" style={{ backgroundColor: buttonColor }} onClick={handleButtonClick}>{kacem.name}</button> */}
           {/* <button className="chat_channel_name_list"> {data} </button> */}
    </div>
  )
}

export default Channel_chat_combo




// 'use client'
// import React, { useState } from 'react';
// import './styles.css';
// import Link from 'next/link';


// const Channel_chat_combo = ({ kacem } ) => {
//   const finhwakacem = "/app/move_to_other_ground/frontend_tran/scayho/Profile/" + kacem.name;
//     const [buttonColor, setButtonColor] = useState('#DDDDDD'); // Set initialColor to the default color

//   const handleButtonClick = () => {
//     if (buttonColor == '#DDDDDD')
//       setButtonColor('#30475E');
//     else
//       setButtonColor('#DDDDDD');
//   };

//   return (
//     // <div className="channel_border">
//     <div className='channel_chat_parent'>
//           <button className="chat_channel_name_list" style={{ backgroundColor: active ? '#DDDDDD' : '#30475E' }} onClick={() => onClick(name)}>{kacem.name}</button>
//           {/* <button className="chat_channel_name_list" style={{ backgroundColor: buttonColor }} onClick={handleButtonClick}>{kacem.name}</button> */}
//     </div>
//     // </div>
//   )
// }

// export default Channel_chat_combo

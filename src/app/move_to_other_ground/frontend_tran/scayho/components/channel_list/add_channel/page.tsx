// 'use client'
import React, { useState } from 'react';
import './styles.css';
import Link from 'next/link';
// import Add_channel_promt from '@/app/move_to_other_ground/frontend_tran/scayho/components/channel_list/add_channel/add_channel'
function Create_channel_drop_bar( clicko:any, clickato:any ) {

  return (
    <div className="drop_bar_combo flex justify-between">
      
      <button id='channel_name_submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded channel_option_dropbar_promt" onClick={() => { clicko("public"); clickato(false); }}> public </button>
      <button id='channel_option_submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded " onClick={() => { clicko("protected"); clickato(false); }}> protected </button>
      <button id='channel_password_submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded " onClick={() => { clicko("privet"); clickato(false); }}> privet </button>
    </div>
  )
}
function submit_create_channel(chan_name:any, chan_option:any, chan_password:any, data:any, post_issam:any) {
  
  
  console.log("channel name is ", chan_name);
  console.log("channel option is ", chan_option);
  console.log("channel password is ", chan_password);
  const nu:number = data.length;
  console.log("length of data before insertion :", {nu});
  console.log("length of data after0 insertion :", {nu});
  post_issam()
}

function submit_join_channel(chan_name:string, chan_password:string) {
  console.log("join submit :", chan_name, " with the password ", chan_password);
}

function Add_chan_promt( {clicko}:any ) {
    
    const [channelName, setChannelName] = useState('');
    const [channelPassword, setChannelPassword] = useState('');

    return (
      <div className="add_chan_promt_option">
        <p className="join_channel_title"> JOIN CHANNEL</p>
        <input type="text" className="channel_name_to_join" placeholder='NAME' value={channelName} onChange={(e) => setChannelName(e.target.value)}/>
        <input type="password" className="channel_password_to_join" placeholder='PASSWORD' value={channelPassword} onChange={(e) => setChannelPassword(e.target.value)}/>
        <button className="submit_join_channel" onClick={() => submit_join_channel(channelName, channelPassword) }> SUBMIT </button>
      </div>
    )
 }

 function Create_chan_promt( props:{clicko:any , data:any, post_issam:any} ) {
  const [channel_prob, setchannel_prob] = useState("public");
  const [show, setshow] = useState(false);
  const [channelName, setChannelName] = useState('');
  const [channelPassword, setChannelPassword] = useState('');
    return (
      <div className="create_chan_promt_option green">
        <p className="create_channel_title">CREATE CHANNEL</p>
        <input type="text" className="create_channel_name_input" placeholder=' NAME '  value={channelName} onChange={(e) => setChannelName(e.target.value)}/>
        <button className="create_chanel_dropbar" onClick={() => setshow(!show)} > {channel_prob} 
          {show ? <Create_channel_drop_bar clicko={setchannel_prob} clickato={setshow} /> : null}
        </button>
        <input value={channelPassword} type="password" className="create_channel_password_input" placeholder=' Password ' onChange={(e) => setChannelPassword(e.target.value)} />
        <button className="submit_create_channel" onClick={() => submit_create_channel(channelName, channel_prob, channelPassword, props.data, props.post_issam)}> SUBMIT </button>
      </div>
    )
}

export function Add_channel_promt( props:{clicko:any, data:any, post_issam:any} ) {
  const [show_create, setshow_create] = useState(true);
  return(
        // <div className="add_channel_promt w-[400px] h-[500px]  flex justify-start items-start red">
        <div className="add_channel_promt w-[400px] h-[500px]  ">
         {/* <div className="add_channel_promt  red"> */}
          <button className='create_channel black' onClick={() => setshow_create(true)} > CREATE </button>
          <button className='add_channel' onClick={() => setshow_create(false)} > ADD </button>
          <div className="add_create_chan_option">
          { show_create ? < Create_chan_promt clicko={setshow_create} data={props.data}   post_issam={props.post_issam}/> : <Add_chan_promt clicko={setshow_create} />}
          </div>
          <button className='exit_button ' onClick={() => props.clicko(false)}></button>
    </div>
  );
};

export const Add_channel_compo = ( props: {data:any, post_issam:any, setshow:any, show:any} ) => {
  console.log("salam add channel");
    return (
      // <div className='green add_channel_compo h-full w-full  flex justify-center'>
      <div className='green add_channel_compo  flex justify-center '>
          {/* <button className="add_ch " onClick={() => setshow(!show)}>ADD CHANNEL</button> */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <button className="add_ch   flex justify-center text-sm items-center rounded " onClick={() => props.setshow(!props.show)}>{props.show ? "Hide" : "Show"} ADD CHANNEL</button>
          </div>
           {/* <Add_channel_promt /> */}
      </div>
  );
};
// <div className="add_channel_promt">
//   <button onClick={() => setshow(!show)}>
//     {show ? "Hide" : "Show"} 
//   </button>
//   {show ? <Add_channel_promt /> : null}
// </div>

// export default Add_channel_compo

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

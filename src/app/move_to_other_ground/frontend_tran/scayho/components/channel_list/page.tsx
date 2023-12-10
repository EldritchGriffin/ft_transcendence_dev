'use client'

// import React from 'react'
import React, { useEffect, useState } from 'react';
import getData from '@/abderazakgetdata';
import { useQuery } from "react-query";
// import { useClient } from 'next/react-server';
// import Style from './components/main.module.css'
// import style from '@/app/components/main.module.css';
// import style from './main.module.css'; 
// import style from '@/app/components/main.module.css';
import './styles.css';
import { Client } from '@/providers/QueryProvider';
// import { GetStaticProps } from 'next';

import ProfileCard from '@/app/move_to_other_ground/frontend_tran/scayho/components/page';
import Play_compo from '@/app/move_to_other_ground/frontend_tran/scayho/Profile/Profile_componenets/play_component/page';
import Channel_chat_combo from '@/app/move_to_other_ground/frontend_tran/scayho/components/channel_list/channel_compo/page';
import {Add_channel_compo , Add_channel_promt} from '@/app/move_to_other_ground/frontend_tran/scayho/components/channel_list/add_channel/page';
// import { createContext, useContext, Dispatch, SetStateAction } from "react";
// import { useGlobalContext } from '../../../../UserContext';
import Friend_chat_combo from '@/app/move_to_other_ground/frontend_tran/scayho/components/friend_list/friend_compo/page';

interface UserData {
  id: number;
  name: string;
  password: string;
  role: number;
}

export default  function Channel_list( { show, setshow}:any ) {
  const [data, setmyData] = useState<any>([]);
        const fetchGetData = async () => {
          try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            const result = await response.json();
            console.log("====>", result);
            setmyData(result);
          } catch (error) {
            console.error('Error posting data:', error);
          }
        }
// ###################################
    const fetchPostData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: 'issam',
            body: 'scayho',
            userId: 1,
          }),
        });
        // setissam_l_likwad(!issam_l_likwad);
        const result = await response.json();
        console.log("-->>>", result);
        // setPostData(result);
      } catch (error) {
        console.error('Error posting data:', error);
      }
    };

 console.log("lalalalala", data);
   fetchGetData();
  const [activeButton, setActiveButton] = useState(null);
  const handleButtonClick = (value:any) => {
    console.log("3ad ja djaj l ensemble bache ytayboh fl ghda", value)
    setActiveButton(value);
  };
    // const [show, setshow] = useState(false);
  return (
    // <div className="">
     <div className="chat_chan_ground flex flex-col">
        <div className="channels_ground blue">
            <p className='channels_name jahad_border_text '> CHANNELS </p> 
            <div className="flex flex-col  channels_field  overflow-y-auto py-8">
              {/* <>
                {data?.map((item:any, index:any) => (
                  <div id='channel_button_color' className="channel_element text-sm" key={index}>
                    <Channel_chat_combo 
                    channel_params={{id:item.id,
                      key:item.id,
                      data:item.name,
                      active:item.id === activeButton,
                      onClick:handleButtonClick}} />
                  </div>
              ))}
              </> */}
            </div>
            <div className="flex h-[90px] items-end  text-sm ">
              <Add_channel_compo data={data}  post_issam={fetchPostData} setshow={setshow} show={show}/>
            </div>
                      {/* <div className="flex justify-center items-start"> */}
                        {/* {show ? <Add_channel_promt data={data}
                          post_issam={fetchPostData}
                          clicko={setshow}
                        /> : null} */}
                      {/* </div> */}
        </div>
    </div>
  )
}

// function setButtonColor() {
//   const koko = document.getElementById("channel_button_color");
//   console.log("salam");
//   //  koko?.attributes.
// }


// export default Channel_list





// import Image from 'next/image'
// import Link from 'next/link'
// import Channel_list from '@/app/move_to_other_ground/frontend_tran/scayho/components/channel_list/page';
// import ProfileCard from '@/app/move_to_other_ground/frontend_tran//scayho/components/page';






// 'use client'

// import React, { useState } from 'react';
// // import React from 'react';

// // import Style from './components/main.module.css'
// // import style from '@/app/components/main.module.css';
// // import style from './main.module.css'; 
// // import style from '@/app/components/main.module.css';
// import './styles.css';
// import { GetStaticProps } from 'next';

// import ProfileCard from '@/app/move_to_other_ground/frontend_tran/scayho/components/page';
// import Play_compo from '@/app/move_to_other_ground/frontend_tran/scayho/Profile/Profile_componenets/play_component/page';
// import Channel_chat_combo from '@/app/move_to_other_ground/frontend_tran/scayho/components/channel_list/channel_compo/page';
// import { createContext, useContext, Dispatch, SetStateAction } from "react";
// import { useGlobalContext } from '../../../../UserContext';
// import Friend_chat_combo from '@/app/move_to_other_ground/frontend_tran/scayho/components/friend_list/friend_compo/page';

// async function getData() {
//   const res = await fetch('https://jsonplaceholder.typicode.com/users');

//   if (!res.ok) {
//     throw new Error('Failed to fetch data');
//   }

//   return res.json();
// }

// // export default async function Page({ ninjas }) 

// // const Channel_list = ( props:any ) => {
// export default async function Channel_list({ ninjas }) {
//   // const pp = useContext(useGlobalContext);
//   // const _name = "scayho";
//   const values = ["JAHAD_ARMY", "FUG_TROOPS", "WOLHAIKSONK","PO BIDAU_FAMILY", "WLAD L97ab", "S7AB LMA3DA", "ALBAWASIR"];
//   const data = await getData();
//   // const data = getData();
//   const first_user = data[0];
//   console.log("salam:", first_user.address.geo);
//   //  const [activeButton, setActiveButton] = useState(null);
//   //   const handleButtonClick = (data) => {
//   //   // Update the active button
//   //   setActiveButton(buttonId);
//   // };

//     return (
//     <div className="chat_chan_ground">
//             <div className="channels_ground ">
//                 <p className='channels_name jahad_border_text '>CHANNELS</p> 
//                 <div className="flex flex-col  channels_field  overflow-y-auto">
//                   <>
//                       {values.map(id => (
//                     <div id='channel_button_color' className="channel_element" key={id}>
//                       <Channel_chat_combo name={id} 
//                         // key={id}
//                         // active={buttonId === activeButton}
//                         // onClick={handleButtonClick}
//                       />
//                     </div>
//                   ))}
//                   </>
//                 </div>
//                 <button className="add_ch ">ADD CHANNEL</button>
//             </div>
//     </div>
//   )
// }

// function setButtonColor() {
//   const koko = document.getElementById("channel_button_color");
//   console.log("salam");
//   //  koko?.attributes.
// }


// // export default Channel_list





// // import Image from 'next/image'
// // import Link from 'next/link'
// // import Channel_list from '@/app/move_to_other_ground/frontend_tran/scayho/components/channel_list/page';
// // import ProfileCard from '@/app/move_to_other_ground/frontend_tran//scayho/components/page';






'use client'
// import React, { useState } from 'react';
import React, { useEffect, useState } from 'react';

import { useGlobalContext } from './move_to_other_ground/UserContext';

import Image from 'next/image'
import Link from 'next/link'
import Friend_list from '@/app/move_to_other_ground/frontend_tran/scayho/components/friend_list/page';
import Channel_list from '@/app/move_to_other_ground/frontend_tran/scayho/components/channel_list/page';
import ProfileCard from '@/app/move_to_other_ground/frontend_tran/scayho/components/page';
import { createContext, useContext, Dispatch, SetStateAction } from "react";
import Play_compo from '@/app/move_to_other_ground/frontend_tran/scayho/Profile/Profile_componenets/play_component/page';

import Chat_field from './move_to_other_ground/frontend_tran/scayho/components/chat_field/page';
import {Add_channel_compo , Add_channel_promt} from '@/app/move_to_other_ground/frontend_tran/scayho/components/channel_list/add_channel/page';
import io from 'socket.io-client';





interface User {
    name: string;
    sockeId: string;
    bannedUsers: string [];
    channels: string [];
    mutedUsers: string [];
    status: UserStatus;
}

export enum    UserStatus{
    IN_GAME = 'IN_GAME',
    CHATING = 'CHATING',
    OFFLINE = 'OFFLINE',
}

interface Channel {
  name: string;
  Users: string [];
  Admins: string[];
  owner: string;
  bannedUsers: string [];
  mutedUsers: string [];
}

interface data{
    user: User;
    channel: Channel;
}


export default function Home(dat:any) {
  const [show_chat_list, setshow_chat_list] = useState(0);
  const [test_socket, settest_socket] = useState(0);
  const [test_sockets, settest_sockets] = useState(0);
  // const [userdata, setuserdata] = useState<User[]>();
  useEffect(() => {
    // settest_sockets(test_sockets + 1);
    // const socket = new WebSocket('ws://10.13.4.11');
    const socket = io('http://localhost:3001');
    socket.on('connect', () => {
      console.log('WebSocket connection opened');
    });
    socket.on('createMessage', (data) => {
      console.log('griffin al mi9wad fi alora al arabiya\n');
      console.log("griffin said :", data, "with the counter :", test_sockets);

    });
    // socket.on('createMessage', (data) => {
    //   console.log('griffin al mi9wad fi alora al arabiya\n');
    //   console.log("JAHAD SAID :", data, "with the counter :", test_sockets);
    // });
    // return () => {
    //   socket.close();
    // };
  }, []);
  // }, [test_socket]);
  // settest_socket(1);
  // const handlechatlist = (value:number) => {
  //   if (value === show_chat_list)
  //     setshow_chat_list(0);
  //   else
  //     setshow_chat_list(value);
  //   console.log(value, " | " , show_chat_list);
  // }

  // const [windowDimensions, setWindowDimensions] = useState<{ width: number | null; height: number | null }>({ width: null, height: null });

  // useEffect(() => {
  //   function handleResize() {
  //     setWindowDimensions({
  //       width: window.innerWidth,
  //       height: window.innerHeight,
  //     });
  //   }
  //   window.addEventListener('resize', handleResize);
  //   handleResize();
  //   return () => window.removeEventListener('resize', handleResize);
  // }, []); // Empty array ensures that effect is only run on mount and unmount

  // console.log("width :", windowDimensions.width,  "heigth :" , windowDimensions.height);
  //   const [show, setshow] = useState(false);

  return (
    <div className="flex flex-col 2xl:page_content h-full">
      {/* <div className="red h-[250px] flex justify-center"></div>

      <div className="h-[900px] pt-10  bg-chatcolor flex flex-col justify-center green">
               {(windowDimensions.width && windowDimensions.width < 1800)?   <div className="flex flex-row justify-between px-4 ">
            <button className="friend_show_icon" onClick={() => {handlechatlist(2)}}>
              </button>
                <button className="channel_show_icon " onClick={() => {handlechatlist(1)}}>
              </button>
        </div> : null}
        <div className="flex justify-center w-[60%] h-full green">
                    {show ?
                    <div className="w-fit h-fit green flex  justify-center">
                      <Add_channel_promt
                      clicko={setshow}
                      data={show}
                      post_issam={null}
                      />
                    </div>
                     : null}
            <Chat_field show={show} setshow={setshow} />
        {show_chat_list === 2 || (windowDimensions.width && windowDimensions.width > 1800)? 
          <div className="friend_list_ground  2xl:channel_list_ground_large 2xl:w-[500px] 2xl:h-[880px] 2xl:left-0 xl:top-[250px] 2xl:flex 2xl:flex-row 2xl:justify-between pink"> */}
            {/* <Friend_list /> */}
          {/* </div>
          : null}
          {show_chat_list === 1 || (windowDimensions.width && windowDimensions.width > 1800)? 
            <div className="channel_list_ground 2xl:channel_list_ground_large 2xl:w-[500px] 2xl:h-[880px] 2xl:right-0 xl:top-[250px] 2xl:flex 2xl:flex-row 2xl:justify-between pink"> */}
              {/* <Channel_list  show={show} setshow={setshow} /> */}
            {/* </div>
          : null}
        </div> */}
      {/* </div> */}
      {/* <div className="bottom_bar">
          <Play_compo />
      </div> */}
  </div>
  );
}

// /Users/abelahce/Desktop/scayho_tran/src/app/move_to_other_ground/components/page.tsx
// /Users/abelahce/Desktop/scayho_tran/src/app/move_to_other_ground/components/page.tsx

// /Users/abelahce/Desktop/scayho_tran/src/app/move_to_other_ground/frontend_tran






// export const getStaticProps = async () => {
//   const res = await fetch('https://jsonplaceholder.typicode.com/users');
//   const data = await res.json();
//   return {
//     props : {dat: data}
//   }
// }

// export default function Home({ dat }: { dat: any }) {
//   const _name = 'bsela';
//   return (
//     <div className='something_'>
//       {/* Other components and elements */}
//       {dat.map((value: any) => (
//         <div key={value.id}>
//           <a>
//             <h3>{value.name}</h3>
//           </a>
//         </div>
//       ))}
//     </div>
//   );
// }




// import React from 'react';
// import { GetStaticProps } from 'next';
// // import FetchData from '@/utils/fetchData';

// interface PageProps {
//   data: any;
// }

// const Page: React.FC<PageProps> = ({ data }) => {
//   return (
//     <div>
//       <h1>Page in App Folder</h1>
//       <p>Data fetched at build time:</p>
//       <pre>{JSON.stringify(data, null, 2)}</pre>
//     </div>
//   );
// };

// export const getStaticProps: GetStaticProps<PageProps> = async () => {
//   const data = await FetchData();

//   return {
//     props: {
//       data,
//     },
//   };
// };

// export default Page;




// yowazee_alfarha_wayodawi_aljarha
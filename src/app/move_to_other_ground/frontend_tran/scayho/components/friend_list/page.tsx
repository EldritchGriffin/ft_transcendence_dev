import React, { useEffect, useState } from 'react';


// import Style from './components/main.module.css'
// import style from '@/app/components/main.module.css';
// import style from './main.module.css'; 
// import style from '@/app/components/main.module.css';
import './styles.css';
import { GetStaticProps } from 'next';

import ProfileCard from '@/app/move_to_other_ground/frontend_tran/scayho/components/page';
import Play_compo from '@/app/move_to_other_ground/frontend_tran/scayho/Profile/Profile_componenets/play_component/page';
import Channel_chat_combo from '@/app/move_to_other_ground/frontend_tran/scayho/components/channel_list/channel_compo/page';
import { createContext, useContext, Dispatch, SetStateAction } from "react";
import { useGlobalContext } from '../../../../UserContext';
import Friend_chat_combo from '@/app/move_to_other_ground/frontend_tran/scayho/components/friend_list/friend_compo/page';

export default function friend_list() {
  console.log("friend_list has been called");
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
  fetchGetData();
  return (
    <div className="chat_ground ">
      <div className="friend_ground overflow-y-auto">
          <p className='friend_name jahad_border_text'>FRIENDS</p>
          <>
            {data.map((item: { address: { city: any; }; id:any}, index:any) => (
              <div className="friend_element" key={index}>
                <Friend_chat_combo friend_params={{
                  name:item.address.city,
                  id:item.id
                }}/>
              </div>
            ))}
          </>
      </div>
    </div>
  )
}


// export default friend_list





// import Image from 'next/image'
// import Link from 'next/link'
// import friend_list from '@/app/move_to_other_ground/frontend_tran/scayho/components/friend_list/page';
// import ProfileCard from '@/app/move_to_other_ground/frontend_tran//scayho/components/page';





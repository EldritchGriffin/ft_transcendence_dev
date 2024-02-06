import React from 'react'
import { AiFillNotification } from 'react-icons/ai'
import { useState ,useEffect} from 'react'
import { toast } from 'react-toastify';
import { io } from 'socket.io-client';
import { fetchCurrentUser } from '../(handlers)/requestHandler';
import Cookies from "js-cookie";
import { Socket } from 'socket.io-client/debug';
import { useRouter } from 'next/navigation';
import { BiSolidNotification } from 'react-icons/bi';
export default function Notif(props:any) {
  const router = useRouter();
  const user_data = props.data;
const handleRemoveItem = (idToRemove: any) => {
  const updatedArray = props.data.filter(
    (item: any) => item.id !== idToRemove.id
    );
    // console.log("thats the sender :" , props.data.filter((item:any) => item.id === idToRemove.id)[0].sender.intraLogin);
  router.push(`/profile/${props.data.filter((item:any) => item.id === idToRemove.id)[0].sender.intraLogin}`);
  props.setData(updatedArray);
};
// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const user: any = await fetchCurrentUser();
//       setUser(user);
//     } catch (error:any) {
//     toast.error(error.response.data.message);
//     }
//   };

  return (

  <div className="">
    <BiSolidNotification size={35} tabIndex={0} className="text-white" />
    <div className="flex flex-col">

    <ul
      tabIndex={0}
      className="dropdown-content z-[1] menu p-2 shadow bg-primary_blue rounded-box overflow-y-auto custom-scrollbar h-[350px] w-[350px]"
      // className="dropdown-content z-[1] menu p-2 shadow bg-primary_blue rounded-box   h-[350px] w-[350px]"
      >
        <li >
        <button className='flex justify-center items-end'  onClick={()=> props.setData([])}>
          Clear
        </button>
        {user_data?.map((item:any, index:number) => (
          <a key={index} onClick={()=> {
            handleRemoveItem(item);
            console.log()
          }}>
            <div className='w-[320px] bg-white rounded-full flex flex-row space-y-5 '>
              <div className="flex w-full space-x-12 items-center">
                <img src={item.sender.avatarLink} alt="" className='w-16 h-16 rounded-full  ' />
                <div className="">
                  {item.sender.intraLogin} {" "} 
                </div>
                <div className="">
                  {item.action}
                </div>
              </div>
            </div>
          </a>
        ))}
        </li>
    </ul>
        </div>
  </div>
  )
}


import React from 'react'
import { AiFillNotification } from 'react-icons/ai'
import { useState ,useEffect} from 'react'
import { toast } from 'react-toastify';
import { io } from 'socket.io-client';
import { fetchCurrentUser } from '../(handlers)/requestHandler';
import Cookies from "js-cookie";
import { Socket } from 'socket.io-client/debug';
export default function Notif(props:any) {

  const socket: Socket = props.socket
    console.log("******************************** ",socket);
    console.log("======= :",props.data);
const [user, setUser] = useState<any>(null);
// const [socket, setSocket] = useState<any>(props.socket);

const [user_data, setUser_data] = useState<any>(props.data);
const handleRemoveItem = (idToRemove: any) => {
  const updatedArray = user_data.filter(
    (item: any) => item.id !== idToRemove
  );
  setUser_data(updatedArray);
};

useEffect(() => {
  const fetchData = async () => {
    try {
      const user: any = await fetchCurrentUser();
      setUser(user);
    } catch (error) {
      console.log(error);
    }
  };
  fetchData();
  // if (!socket) {
  //   const token = Cookies.get("token");
  //   const newSocket = io("http://localhost:3001/channels", {
  //     extraHeaders: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  //   setSocket(newSocket);
  //   return () => {
  //     newSocket.disconnect();
  //   };
  // }


  // socket.on("friendRequest", (data: any) => {
  //   console.log("===========>socket ",data);
  //   setUser_data((prev: any) => {
  //     return [...prev, data];
  //   });
  // }
  // );
}, []);



  return (

  <div className="">
    <AiFillNotification size={35} tabIndex={0} className="text-white" />
    <ul
      tabIndex={0}
      // className="dropdown-content z-[1] menu p-2 shadow bg-primary_blue rounded-box overflow-y-auto custom-scrollbar h-[350px] w-[350px]"
      className="dropdown-content z-[1] menu p-2 shadow bg-primary_blue rounded-box   h-[350px] w-[350px]"
    >
        <li >
        {user_data?.map((item:any, index:number) => (
          <a key={index} onClick={()=> {
            // toast.success(item.id);
            // handleRemoveItem(item.id);
          }}>
            <div className='w-[300px] flex flex-row space-y-5 '>
              <div className="flex w-full justify-between items-center">
                {/* <img src={item.image} alt="" className='w-16 h-16' /> */}
                <div className="">
                  {/* {item.sender} {" "} {item.id} */}
                  {item.sender} {" "} 
                </div>
                <div className="">
                  {item.action}
                </div>
                <div className="">
                  {item.reciever}
                </div>
              </div>
            </div>
          </a>
        ))}
        </li>
    </ul>
  </div>
  )
}


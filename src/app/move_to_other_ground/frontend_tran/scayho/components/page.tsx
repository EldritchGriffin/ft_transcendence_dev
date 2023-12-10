import React from 'react'
// import Style from './components/main.module.css'
// import style from '@/app/components/main.module.css';
// import style from './main.module.css'; 
// import style from '@/app/components/main.module.css';
import './styles.css';
import Link from 'next/link';
import { createContext, useContext, Dispatch, SetStateAction } from "react";
import { useGlobalContext } from '../../../UserContext';

// import 'tailwindcss/base.css';

// import 'tailwindcss/components.css';
const ProfileCard = ( props:any ) => {
  // const pp = useContext(useGlobalContext);

  const path = '/move_to_other_ground/frontend_tran/scayho/Profile/' + props.name
  return (
    <div className="oo">
        {/* <Link
  href={{
    pathname: path,
    // query: { id:  props.name},
  }}
> */}
            {/* <div className="user_info_dropdown ms:user_info_dropdowns ms:blue md:user_info_dropdown_md ms:green"> */}
            <div className="user_info_dropdown">
                <p className='name_prof jahad_border_text blue'>{props.name} in </p>
                <div className="image-container blue" ></div>
            </div>
          {/* </Link>  */}
    </div>

)
}

export default ProfileCard

// {/* <div className="w-1/5 h-full relative border-2 border-black left-40">
//     <div class="bg-url('/pictures/jahad.jpeg')">
//   </div>
// </div> */}

// chatSocket.emit('message', obj)


// rest{rules for routs api}
// socketchat.subscribe('message', () => {
  
// })
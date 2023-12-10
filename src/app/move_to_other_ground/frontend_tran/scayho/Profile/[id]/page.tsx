// import Image from "next/image"
import style from'../[id]/lwan.module.css'
import Link from 'next/link';
import { useRouter } from 'next/router';
// import Play_compo from '../Profile_componenets/play_component/Play_compo'; 
import Play_compo from '@/app/move_to_other_ground/frontend_tran/scayho/Profile/Profile_componenets/play_component/page';

// import Play_compo from '@/app/move_to_other_ground/Profile/Profile_componenets/play_component/page';
import Search_compo from '../Profile_componenets/search_component/page';
import Setting_compo from '../Profile_componenets/setting_component/page';
import User_data_compo from '../Profile_componenets/user_data_component/page';

const Profilepage = ( {params}:any ) => 
{
    const myVariable = "Hello from my variable!";
    const user_pro = {
        id : 'scayho',
        myVariable : 'zebi kebir',
    };
    return (
        // <div className="profile_screen_css">
        <div>
              <div className='rec_play_button'>
                <div className='profile_rakita red'></div>
                <Search_compo kk={params.id} />
                <Play_compo /> 
                <Setting_compo />
            </div> 
            <div className="user_profile">
            </div>
                <p><Link href="/Profile/scayho/stats">
             <button className="image2">
                </button> </Link></p> 
        </div>
    );
}

{/* // import React from 'react';
// import ReactDOM from 'react-dom';

// const App = () => {
//   return <h1>Hello, React!</h1>;
// };

// ReactDOM.render(<App />, document.getElementById('root')); */}

export default Profilepage 
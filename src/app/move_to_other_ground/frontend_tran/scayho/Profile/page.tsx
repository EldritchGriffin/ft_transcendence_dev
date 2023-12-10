// import Image from "next/image"
import style from'../[id]/lwan.module.css'

const Profilepage = ( {params} ) => 
{
    return (
        <div className="ayman">
             <p className="backk">
                salam ana hwa wa khona {params.id} 
                </p>
        </div>
    );
}

export default Profilepage
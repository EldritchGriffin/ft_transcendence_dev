// import Image from "next/image"
import style from'../[id]/lwan.module.css'
import { useRouter } from 'next/navigation';
function ProductDetails({params}) {
    // const router = useRouter();
  
    return (
      <div>
        <h1>Product Details</h1>
        <p>Product ID: {params.id}</p>
        <p>Details: {params.stats}</p>
      </div>
    );
  }
  
export default ProductDetails;

// const Statspage = ( {params} ) => 
// {
//     return (
//         // <>
//         <div>
//             <img src="/pictures/download.jpeg" width="100%" height="100%"></img>
//         </div>
//     // {/* </> */}
//     );
// }

// export default Statspage
// MyComponent.js (or MyComponent.tsx for TypeScript)
import React from 'react';
import Link from 'next/link';




const Setting_compo = () => {
  return (
    <div>
        <Link href={`/Profile/scayho/stats`}>
                    <button className='settings_button red' > 
                    </button>
          </Link> 
    </div>
  );
}

export default Setting_compo;
 
import React from 'react'


const searchbar = () => {

  return (
    <div className='py-5 px-5 flex flex-row '>
          <input type="text" placeholder="Search" className="h-9 boxshadow bg-costumwhite   w-full max-w-xs" />
      <div>
        <button>
              <img className="h-9 w-9 flex-none" src="/Bell.png" alt="" />
        </button>
        <button>
              <img className="h-9 w-9 flex-none" src="/Chat.png" alt="" />
        </button>
      </div>
    </div>
  )
}

export default searchbar
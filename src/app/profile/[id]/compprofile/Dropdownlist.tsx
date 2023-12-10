import React from 'react'

const Dropdownlist = () => {
  return (
    <div className="dropdown dropdown-end">
    <label tabIndex={0} className="btn bg-customRed rounded-full hover:bg-customRed border-none btn-active shadow-none m-1">...</label>
    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-costumblack bg-opacity-50 rounded-non w-52">
        <li><a>View Profile</a></li>
        <li><a>Invite Game</a></li>
        <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" />
                    <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    <span className="ms-3 text-xs font-medium fontzabi text-gray-900 dark:text-gray-300">
                      Block
                    </span>
        </label>
    </ul>
    </div>
  )
}

export default Dropdownlist
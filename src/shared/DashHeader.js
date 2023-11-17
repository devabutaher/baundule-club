"use client"

import { AuthContext } from '@/components/context/UserContext';
import Image from 'next/image';
import { useContext } from 'react';

const DashHeader = () => {
  const { user, logOut } = useContext(AuthContext)
  return (
    <div className=''>
      <div className="fixed w-full flex items-center justify-between h-16 bg-gray-800 text-white z-10">
        <div className="flex items-center justify-start pl-3 border-none">
          <Image className="w-10 h-10 mr-2 rounded-md overflow-hidden" src={user?.photoURL} alt='' width={500} height={500} />
          <div className=''>
            <p>{user?.displayName}</p>
            <div
              class="inline-flex items-center justify-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-emerald-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="-ms-1 me-1.5 h-4 w-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p class="whitespace-nowrap text-[10px]">ADMIN</p>
            </div>
          </div>
        </div>
        <button onClick={logOut} className="flex items-center mr-4 hover:text-blue-100">
          <span className="inline-flex mr-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
          </span>
          Logout
        </button>
      </div>
    </div >
  );
};

export default DashHeader;
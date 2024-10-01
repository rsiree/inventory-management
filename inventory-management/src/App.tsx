import React, { useState } from 'react';
import './App.css';
import { TbLogout } from "react-icons/tb";

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  return (
    <div className="container py-3">
      <div className='flex justify-end gap-10 items-center'>
        <div className='flex gap-1 items-center'>
          <p className='text-sm'>admin</p>
          <div className='w-9 h-4 rounded-2xl relative bg-gray-400'>
            <div className={`${isAdmin ? 'left-0' : 'right-0'} 
            ' absolute w-5 h-5 top-1/2 -translate-y-1/2 bg-primary rounded-full cursor-pointer'
            `}
              onClick={() => setIsAdmin(!isAdmin)}
            >
            </div>
          </div>
          <p className='text-sm'>user</p>
        </div>
        <TbLogout className='w-7 h-7' />
      </div>
    </div>
  );
}

export default App;

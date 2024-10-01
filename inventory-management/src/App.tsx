import React, { useState } from 'react';
import './App.css';
import { TbLogout } from "react-icons/tb";
import { FaShoppingCart } from "react-icons/fa";
import { RiExchangeDollarLine } from "react-icons/ri";
import { MdRemoveShoppingCart, MdCategory, MdDelete, MdEdit } from "react-icons/md";
import { IoEyeSharp } from "react-icons/io5";

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div className="container py-3">

      {/* navigation */}
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

      {/* inventory stats */}
      <div className='max-w-7xl m-auto'>
        <h2 className='text-2xl text-primary m-4 mb-6'>Inventory Stats</h2>
        <div className='grid grid-cols-4 gap-4'>
          <div className='bg-inventory-card-background p-4 items-center rounded-md flex gap-4 align-top'>
            <FaShoppingCart className='w-8 h-8' />
            <div className='flex flex-col items-start'>
              <p className='text-sm'>Total Product</p>
              <p className='text-2xl font-medium'>9</p>
            </div>
          </div>
          <div className='bg-inventory-card-background p-3 rounded-md flex gap-4 align-top min-h-24'>
            <RiExchangeDollarLine className='w-8 h-8' />
            <div className='flex flex-col items-start'>
              <p className='text-sm'>Total Store Value</p>
              <p className='text-2xl font-medium'>9</p>
            </div>
          </div>
          <div className='bg-inventory-card-background p-3 rounded-md flex gap-4 align-top min-h-24'>
            <MdRemoveShoppingCart className='w-8 h-8' />
            <div className='flex flex-col items-start'>
              <p className='text-sm'>Out of Stocks</p>
              <p className='text-2xl font-medium'>9</p>
            </div>
          </div>
          <div className='bg-inventory-card-background p-3 rounded-md flex gap-4 align-top min-h-24'>
            <MdCategory className='w-8 h-8' />
            <div className='flex flex-col items-start'>
              <p className='text-sm'>No of Category</p>
              <p className='text-2xl font-medium'>9</p>
            </div>
          </div>
        </div>
      </div>

      {/* data mapping */}
      <table className='bg-table-background w-full max-w-screen-xl m-auto mt-7 rounded-md'>
        <thead className='w-full'>
          <tr>
            <th className=' text-table-title text-sm p-4 font-normal '><div className='w-fit h-fit bg-background rounded-lg p-2 py-1'>Name</div></th>
            <th className='text-table-title text-sm p-4 font-normal '><div className='w-fit h-fit bg-background rounded-lg p-2 py-1'>Category</div></th>
            <th className='text-table-title text-sm p-4 font-normal '><div className='w-fit h-fit bg-background rounded-lg p-2 py-1'>Price</div></th>
            <th className='text-table-title text-sm p-4 font-normal '><div className='w-fit h-fit bg-background rounded-lg p-2 py-1'>Quantity</div></th>
            <th className='text-table-title text-sm p-4 font-normal '><div className='w-fit h-fit bg-background rounded-lg p-2 py-1'>Value</div></th>
            <th className='text-table-title text-sm p-4 font-normal '><div className='w-fit h-fit bg-background rounded-lg p-2 py-1'>Actions</div></th>
          </tr>
        </thead>
        <tbody className='min-h-96 w-full border-t-slate-200 border-t-[1px]'>
          <tr className='mt-2'>
            <td className='text-base pt-2'>Bluetooth</td>
            <td className="text-base">Electronic</td>
            <td className="text-base">50</td>
            <td className="text-base">1</td>
            <td className="text-base">1</td>
            <td className="text-base flex gap-1">
              <MdEdit className='text-green-800' />
              <IoEyeSharp className='text-purple-500' />
              <MdDelete className='text-red-600' />
            </td>
          </tr>
        </tbody>
      </table>

    </div>
  );
}

export default App;

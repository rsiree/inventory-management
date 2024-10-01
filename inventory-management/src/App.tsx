import React, { useEffect, useState } from 'react';
import './App.css';
import { TbLogout } from "react-icons/tb";
import { FaShoppingCart } from "react-icons/fa";
import { RiExchangeDollarLine } from "react-icons/ri";
import { MdRemoveShoppingCart, MdCategory, MdDelete, MdEdit } from "react-icons/md";
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, disableProduct, fetchData } from './redux/slices/data';

function App() {

  const dispatch = useDispatch<any>();
  const { data, isLoading, categoryData, outOfStock, totalStoreValue } = useSelector((state: any) => state.dataReducer);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleDeleteProduct = ({ index, item }: any) => {
    console.log(item, 'delete click')
    dispatch(deleteProduct({ item, index }))
  }

  const handleEditProduct = () => {
    console.log("hi")
  }

  const handleDisableProduct = ({ index, isDisabled }: any) => {
    dispatch(disableProduct({ index, isDisabled }))
  }

  console.log(data, categoryData, outOfStock, totalStoreValue)
  useEffect(() => {
    dispatch(fetchData())
  }, []);

  if (isLoading) return <div className='text-2xl m-auto text-center'>Loading ...</div>

  return (
    <div className="max-w-7xl py-3 px-4">

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
      <div className='m-auto'>
        <h2 className='text-2xl text-primary m-4 mb-6'>Inventory Stats</h2>
        <div className='grid grid-cols-4 gap-4'>
          <div className='bg-inventory-card-background p-4 items-center rounded-md flex gap-4 align-top'>
            <FaShoppingCart className='w-8 h-8' />
            <div className='flex flex-col items-start'>
              <p className='text-sm'>Total Product</p>
              <p className='text-2xl font-medium'>{data?.length}</p>
            </div>
          </div>
          <div className='bg-inventory-card-background p-3 rounded-md flex gap-4 align-top min-h-24'>
            <RiExchangeDollarLine className='w-8 h-8' />
            <div className='flex flex-col items-start'>
              <p className='text-sm'>Total Store Value</p>
              <p className='text-2xl font-medium'>{totalStoreValue ?? 0}</p>
            </div>
          </div>
          <div className='bg-inventory-card-background p-3 rounded-md flex gap-4 align-top min-h-24'>
            <MdRemoveShoppingCart className='w-8 h-8' />
            <div className='flex flex-col items-start'>
              <p className='text-sm'>Out of Stocks</p>
              <p className='text-2xl font-medium'>{outOfStock ?? 0}</p>
            </div>
          </div>
          <div className='bg-inventory-card-background p-3 rounded-md flex gap-4 align-top min-h-24'>
            <MdCategory className='w-8 h-8' />
            <div className='flex flex-col items-start'>
              <p className='text-sm'>No of Category</p>
              <p className='text-2xl font-medium'>{categoryData ? Object.values(categoryData)?.filter((x: any) => x !== 0)?.length : 0}</p>
            </div>
          </div>
        </div>
      </div>

      {/* data mapping */}
      <table className='bg-table-background w-full m-auto mt-7 rounded-md'>
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
        <tbody className='w-full pb-2'>
          {data?.length === 0 ?
            <div className='w-full text-center text-xl p-4'>No Product Found</div>
            : data?.map((item: any, index: number) => (
              <tr className='mt-2' key={index}>
                <td className='text-base px-4 py-4 border-border border-t-[1px]'>{item?.name}</td>
                <td className='text-base px-4 py-4 border-border border-t-[1px]'>{item?.category}</td>
                <td className='text-base px-4 py-4 border-border border-t-[1px]'>{item?.price}</td>
                <td className='text-base px-4 py-4 border-border border-t-[1px]'>{item?.quantity}</td>
                <td className='text-base px-4 py-4 border-border border-t-[1px]'>{item?.value}</td>
                <td className="text-base px-4 py-5 border-border border-t-[1px]
               flex gap-1">
                  <MdEdit className='text-green-800' onClick={handleEditProduct} />
                  {item?.isDisabled ?
                    <IoEyeOffSharp className='text-purple-500' onClick={() => handleDisableProduct({ index, isDisabled: false })} />
                    :
                    <IoEyeSharp className='text-purple-500' onClick={() => handleDisableProduct({ index, isDisabled: true })} />
                  }
                  <MdDelete className='text-red-600' onClick={() => handleDeleteProduct({ item, index })} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>

    </div>
  );
}

export default App;

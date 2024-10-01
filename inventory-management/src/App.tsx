import React, { useEffect, useState } from 'react';
import './App.css';
import { TbLogout } from "react-icons/tb";
import { FaShoppingCart } from "react-icons/fa";
import { RiExchangeDollarLine } from "react-icons/ri";
import { MdRemoveShoppingCart, MdCategory, MdDelete, MdEdit } from "react-icons/md";
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, disableProduct, fetchData, updateProduct } from './redux/slices/data';

function App() {

  const dispatch = useDispatch<any>();
  const { data, isLoading, categoryData, outOfStock, totalStoreValue, totalProducts } = useSelector((state: any) => state.dataReducer);
  const [isAdmin, setIsAdmin] = useState<Boolean>(true);
  const [editProductData, setEditProductData] = useState<any>(null);


  const handleDeleteProduct = ({ index, item }: any) => {
    dispatch(deleteProduct({ item, index }))
  }

  const handleEditProduct = ({ item, index }: any) => {
    setEditProductData({ item, index })
  }

  const handleDisableProduct = ({ index, isDisabled, item }: any) => {
    dispatch(disableProduct({ index, isDisabled, item }))
  }

  const handleSaveUpdatedProduct = () => {
    dispatch(updateProduct(editProductData));
    setEditProductData({})
  }

  // console.log(data, categoryData, outOfStock, totalStoreValue)
  useEffect(() => {
    dispatch(fetchData())
  }, []);

  // console.log(editProductData)
  if (isLoading) return <div className='text-2xl m-auto text-center'>Loading ...</div>

  return (
    <div className={"max-w-7xl py-3 px-4 m-auto relative"}>

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
              <p className='text-2xl font-medium'>{totalProducts ?? 0}</p>
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
                  {isAdmin ?
                    <MdEdit className={item?.isDisabled ? 'text-border cursor-not-allowed' : 'text-green-800 cursor-pointer'} onClick={() => handleEditProduct({ item, index })} />
                    :
                    <MdEdit className='text-border cursor-not-allowed' />
                  }
                  {item?.isDisabled ?
                    <IoEyeOffSharp className={isAdmin ? 'text-purple-500 cursor-pointer' : 'text-border  cursor-not-allowed'} onClick={() => isAdmin ? handleDisableProduct({ index, isDisabled: false, item }) : ''} />
                    :
                    <IoEyeSharp className={isAdmin ? 'text-purple-500 cursor-pointer' : 'text-border  cursor-not-allowed'} onClick={() => isAdmin ? handleDisableProduct({ index, isDisabled: true, item }) : ''} />
                  }
                  <MdDelete className={isAdmin ? 'text-red-600 cursor-pointer' : 'text-border  cursor-not-allowed'} onClick={() => isAdmin ? handleDeleteProduct({ item, index }) : ''} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {editProductData?.item &&
        <div className='relative w-full h-full bg-red'>
          <div className='fixed z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3 w-5/12 h-1/2 rounded-xl p-6 bg-table-popup-background m-auto'>
            <div className='flex justify-between w-full gap-4 align-top'>
              <h2 className='text-2xl'>Edit Product</h2>
              <div className='flex justify-center items-center shadow-md rounded-sm w-9 h-9 cursor-pointer border-gray-400/10 border-[1px]' onClick={() => setEditProductData(null)}>
                <RxCross2 className='text-table-title text-xl' />
              </div>
            </div>
            <p className='text-base '>{editProductData?.item?.name}</p>
            <div className='grid grid-cols-2 gap-6 w-full mt-6'>
              <div className="flex flex-col gap-2 justify-start">
                <p className="text-xs">Category</p>
                <input type='text'
                  className='bg-[#46504f]  rounded-xl py-1 px-4'
                  value={editProductData?.item?.category}
                  onChange={(e: any) =>
                    setEditProductData({
                      item: { ...editProductData?.item, 'category': e.target.value },
                      index: editProductData?.index
                    })
                  } />
              </div>
              <div className="flex flex-col gap-2 justify-start">
                <p className="text-xs">Price</p>
                <input type='text'
                  className='bg-[#46504f]  rounded-xl py-1 px-4'
                  value={editProductData?.item?.price}
                  onChange={(e: any) =>
                    setEditProductData({
                      item: { ...editProductData?.item, 'price': e.target.value },
                      index: editProductData?.index
                    })
                  } />
              </div>
              <div className="flex flex-col gap-2 justify-start">
                <p className="text-xs">Quantity</p>
                <input type='text'
                  className='bg-[#46504f]  rounded-xl py-1 px-4'
                  value={editProductData?.item?.quantity}
                  onChange={(e: any) =>
                    setEditProductData({
                      item: { ...editProductData?.item, 'quantity': e.target.value },
                      index: editProductData?.index
                    })
                  } />
              </div>
              <div className="flex flex-col gap-2 justify-start">
                <p className="text-xs">Value</p>
                <input type='text'
                  className='bg-[#46504f]  rounded-xl py-1 px-4'
                  value={editProductData?.item?.value}
                  onChange={(e: any) =>
                    setEditProductData({
                      item: { ...editProductData?.item, 'value': e.target.value },
                      index: editProductData?.index
                    })
                  } />
              </div>
            </div>
            <div className='flex gap-4 justify-end mt-6'>
              <button className='text-sm text-table-title cursor-pointer'
                onClick={() => {
                  setEditProductData({})
                }}>Cancel</button>
              <button className='py-1 px-3 rounded-lg bg-[#46504f] text-sm cursor-pointer text-[#7fa9a4]'
                onClick={handleSaveUpdatedProduct}
              >Save</button>
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default App;

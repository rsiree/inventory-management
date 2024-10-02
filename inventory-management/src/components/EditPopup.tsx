import { RxCross2 } from "react-icons/rx";


export const EditPopup = (props: any) => {
    const { editProductData, setEditProductData, handleSaveUpdatedProduct } = props;
    return (
        <div className='relative w-full h-full bg-red'>
            <div className='fixed z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3 w-4/12 h-1/2 rounded-xl p-6 bg-table-popup-background m-auto'>
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
                            maxLength={100}
                            className='bg-[#46504f]  rounded-xl py-1 px-4'
                            value={editProductData?.item?.category}
                            onChange={(e: any) => {
                                e.target.value = e.target.value.replace(/[^a-zA-Z\s]/, "");
                                setEditProductData({
                                    item: { ...editProductData?.item, 'category': e.target.value },
                                    index: editProductData?.index
                                })
                            }} />
                    </div>
                    <div className="flex flex-col gap-2 justify-start">
                        <p className="text-xs">Price</p>
                        <input
                            type='text'
                            className='bg-[#46504f]  rounded-xl py-1 px-4'
                            value={`$${editProductData?.item?.price?.split("$")?.[1] || editProductData?.item?.price}`}
                            onChange={(e: any) => {
                                e.target.value = e.target.value.replace(/[^0-9]/g, "");
                                setEditProductData({
                                    item: { ...editProductData?.item, 'price': e.target.value },
                                    index: editProductData?.index
                                })
                            }} />
                    </div>
                    <div className="flex flex-col gap-2 justify-start">
                        <p className="text-xs">Quantity</p>
                        <input type='number'
                            min={0}
                            maxLength={5}
                            className='bg-[#46504f]  rounded-xl py-1 px-4'
                            defaultValue={editProductData?.item?.quantity}
                            value={editProductData?.item?.quantity}
                            onChange={(e: any) => {
                                setEditProductData({
                                    item: { ...editProductData?.item, 'quantity': Number(e.target.value) },
                                    index: editProductData?.index
                                })
                            }} />
                    </div>
                    <div className="flex flex-col gap-2 justify-start">
                        <p className="text-xs">Value</p>
                        <input type='text'
                            className='bg-[#46504f]  rounded-xl py-1 px-4 text-left'
                            disabled
                            value={`$${editProductData?.item?.quantity * Number(editProductData?.item?.price?.split("$")?.[1] || editProductData?.item?.price)}
                    `}
                        />
                    </div>
                </div>
                <div className='flex gap-4 justify-end mt-6'>
                    <button className='text-sm text-table-title cursor-pointer hover:font-medium'
                        onClick={() => {
                            setEditProductData({})
                        }}>Cancel</button>
                    <button className='py-1 px-3 rounded-lg bg-[#46504f] text-sm cursor-pointer text-[#7fa9a4] hover:text-table-title hover:font-medium'
                        onClick={handleSaveUpdatedProduct}
                    >Save</button>
                </div>
            </div>
        </div>
    )
}
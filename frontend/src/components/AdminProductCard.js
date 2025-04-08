import React, { useState } from 'react'
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import displayINRCurrency from '../helpers/displayCurrency';

const AdminProductCard = ({ data, fetchdata }) => {
  const [editProduct, setEditProduct] = useState(false)

  return (
    <div className='bg-white rounded '>
      <div className='w-52 flex flex-col justify-center items-center'>
        <div className='flex w-full h-52 justify-center'>
          <img src={data?.productImage[0]} className='object-cover' />
        </div>
        <div className='p-4'>
          <h1 className='text-ellipsis line-clamp-2'>{data.productName}</h1>

          <div className='flex flex-col justify-center items-center'>

            <div>
              <p className='font-semibold'>
                {
                  displayINRCurrency(data.sellingPrice)
                }
              </p>
            </div>

            <div className='w-fit p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer' onClick={() => setEditProduct(true)}>
              <MdModeEditOutline />
            </div>

          </div>
        </div>
      </div>

      {editProduct && (
        <AdminEditProduct 
          productData={data} 
          onClose={() => setEditProduct(false)} 
          fetchdata={fetchdata} 
        />
      )}
    </div>
  )
}

export default AdminProductCard;

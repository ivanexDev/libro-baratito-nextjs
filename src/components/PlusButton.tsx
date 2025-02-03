import React from 'react'
import { LuPlus } from 'react-icons/lu'
const PlusButton = () => {
  return (
    <button className='flex  justify-center items-center  text-white rounded-md bg-orange-primary h-[30px] w-[30px]'>
        <LuPlus/>
    </button>
  )
}

export default PlusButton
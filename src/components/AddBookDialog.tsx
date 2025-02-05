import React, { useState } from 'react'
import Button from './Button'
import {CircleX} from "lucide-react"
import {goScrap} from '@/app/api/scrap'
// import { createBook } from '@/app/actions'


interface AddBookDialogProps {
  handleDialog: (state:boolean)=>void
}

const AddBookDialog = ({handleDialog}:AddBookDialogProps) => {

  const [url, setUrl] = useState("")


  return (
    <div
    className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'
    >
      <div className=' p-3 bg-white min-w-[500px] rounded-md flex flex-col justify-center items-center gap-5 justify-between'>
        <button className='self-end' onClick={()=>{handleDialog(false)}}>
          <CircleX className='w-5 h-5'/>
        </button>
        <div className='flex content-between w-full'>
          <input className='w-full h-24px' type="text" placeholder='Agrega el url del libro de buscalibre' value={url} onChange={(e)=>setUrl(e.target.value)} />
          <Button onClick={()=>{
            goScrap(url);
            handleDialog(false)}} label='Agregar' />
        </div>
      </div>
    
    </div>
  )
}

export default AddBookDialog
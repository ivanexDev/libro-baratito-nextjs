import React from 'react'
import Image from 'next/image'
import { toCurrency } from '@/utils/toCurrency'

interface BookCardProps {
    name:string
    author: string
    image: string
    currrentPrice:number
}
const BookCard = ({name, author, image, currrentPrice} :BookCardProps) => {
    return (
    <div className='w-64'>
        <Image src={image} alt={name} height={300} width={243} className='object-contain h-[300px] w-[240px]'/>
        <div className='m-2'>
            <h3 className='font-bold text-sm h-11'>{name}</h3>
            <p>{author}</p>
            <p className='text-orange-primary font-bold text-xl'>{toCurrency(currrentPrice)}</p>
        </div>
    </div>
  )
}

export default BookCard
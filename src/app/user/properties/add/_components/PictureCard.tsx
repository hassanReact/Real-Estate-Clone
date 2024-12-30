import { TrashIcon } from '@heroicons/react/20/solid';
import { Card } from '@nextui-org/react';
import Image from 'next/image';
import React from 'react'

interface Props{
    src : string;
    index: number;
    onDelete: (index : number) => void;
}

const PictureCard = ({src, onDelete, index} : Props) => {
  return (
    <Card className='mt-3 flex flex-col items-center'>
      <Image width={500} height={500} src={src} alt='Provided Image'  className='w-36 h-36 object-contain' />
    <button onClick={() => onDelete(index)}>
    <TrashIcon  className='text-danger-400 mb-4 w-4'/>
    </button>
    </Card>
  )
}

export default PictureCard

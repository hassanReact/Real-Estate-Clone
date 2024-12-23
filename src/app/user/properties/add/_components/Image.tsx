import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/16/solid';
import { Button, Card, cn } from '@nextui-org/react';
import React from 'react'

interface Props {
    next : () => void;
    prev : () => void;
    className?: string;
}
const Image = (props:Props) => {
    const handleNext =() => props.next()
    const handlePrev = () => props.prev()
  return (
    <Card className={cn("p-2 grid grid-cols-1 md:grid-cols-2 gap-3", props.className)}>
        <div className='mt-3 flex justify-center col-span-2 gap-3'>
      <Button 
       onPress={handlePrev}
    startContent={<ChevronLeftIcon className='w-6'/>} 
      color='primary' 
      className='w-36'>
        Previous
      </Button>
      <Button onPress={handleNext} endContent={<ChevronRightIcon className='w-6'/>} 
       color='primary' className='w-36'>
        Next
      </Button>
    </div>
    </Card>
  )
}

export default Image

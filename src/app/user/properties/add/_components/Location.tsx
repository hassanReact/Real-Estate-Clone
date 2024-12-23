import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/16/solid'
import { Button, Card, cn, Textarea } from '@nextui-org/react'
import { Input } from '@nextui-org/react'
import React from 'react'

interface Props {
    next: () => void
    prev: () => void
    className?: string
}
const Location = (props : Props) => {
    const handleNexts =() => props.next()
    const handlePrevious = () => props.prev()
  return (
    <Card className={cn("p-2 grid grid-cols-1 md:grid-cols-2 gap-3",props.className)}>
      <Input label="Street Address" />
      <Input label="Zip/Postal Code" />
      <Input label="City" />
      <Input label="State" />
      <Input label="Region/Neighborhood" className='col-span-2' />
      <Textarea label="Landsmarks" className='col-span-2'/>
      <div className='flex justify-center col-span-2 gap-3'>
      <Button 
       onPress={handlePrevious}
    startContent={<ChevronLeftIcon className='w-6'/>} 
      color='primary' 
      className='w-36'>
        Previous
      </Button>
      <Button onPress={handleNexts} endContent={<ChevronRightIcon className='w-6'/>} 
       color='primary' className='w-36'>
        Next
      </Button>
    </div>
    </Card>
  )
}

export default Location

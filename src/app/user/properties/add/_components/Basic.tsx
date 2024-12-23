import { Button, Card, cn, Select, SelectItem, Textarea } from '@nextui-org/react';
import { PropertyStatus, PropertyType } from '@prisma/client';
import { Input } from '@nextui-org/react';
import React from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/16/solid';
interface Props {
  className?: string;
  statuses: PropertyStatus[];
  types: PropertyType[];
  next: () => void
}
const Basic = (props : Props) => {
  const handleNext = () => props.next()
  return (
    <Card className={cn("p-4 gap-3 grid grid-cols-1 md:grid-cols-3", props.className)}>
      <Input label="Name" className="md:col-span-3"  />
      <Textarea label='Description' className='md:col-span-3'/>
      <Select label='Type'>
      {props.types?.map((items) => (
        <SelectItem key={items.id} value={items.id}>
          {items.value}
        </SelectItem>
      ))}
      </Select>
      <Select label='Status'>
      {props.statuses?.map((items) => (
        <SelectItem key={items.id} value={items.id}>
          {items.value}
        </SelectItem>
      ))}
      </Select>
      <Input label='Price'/>
    <div className='flex justify-center col-span-3 gap-3'>
      <Button 
      isDisabled
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

export default Basic

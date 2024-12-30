import { Button, Card, cn, Select, SelectItem, Textarea } from '@nextui-org/react';
import { PropertyStatus, PropertyType } from '@prisma/client';
import { Input } from '@nextui-org/react';
import React from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/16/solid';
import { useFormContext } from 'react-hook-form';
import { AddPropertyInputType } from './AddPropertyForm';
interface Props {
  className?: string;
  statuses: PropertyStatus[];
  types: PropertyType[];
  next: () => void
}
const Basic = (props: Props) => {
  const {
    register,
    formState: { errors },
    trigger,
    getValues
  } = useFormContext<AddPropertyInputType>();
  
  const handleNext = async () => {
    if(await trigger(['name', 'description', 'typeId', 'statusId', 'price']))
    props.next()
  }
  return (
    <Card className={cn("p-4 gap-3 grid grid-cols-1 md:grid-cols-3", props.className)}>
      <Input {...register('name')} defaultValue={getValues().name} errorMessage={errors.name?.message} isInvalid={!!errors.name} label="Name" className="md:col-span-3" />
      <Textarea  {...register('description')} defaultValue={getValues().description} errorMessage={errors.description?.message} isInvalid={!!errors.description} label='Description' className='md:col-span-3' />
      <Select  {...register('typeId')} defaultSelectedKeys={[(getValues().typeId ?? "").toString()]} errorMessage={errors.typeId?.message} isInvalid={!!errors.typeId} label='Type'>
        {props.types?.map((items) => (
          <SelectItem key={items.id} value={items.id}>
            {items.value}
          </SelectItem>
        ))}
      </Select>
      <Select {...register('statusId')} defaultSelectedKeys={[(getValues().statusId ?? "").toString()]} errorMessage={errors.statusId?.message} isInvalid={!!errors.statusId} label='Status'>
        {props.statuses?.map((items) => (
          <SelectItem key={items.id} value={items.id}>
            {items.value}
          </SelectItem>
        ))}
      </Select>
      <Input  {...register('price')} defaultValue={(getValues().price ?? "").toString()} errorMessage={errors.price?.message} isInvalid={!!errors.price} label='Price' />
      <div className='flex justify-center col-span-3 gap-3'>
        <Button
          isDisabled
          startContent={<ChevronLeftIcon className='w-6' />}
          color='primary'
          className='w-36'>
          Previous
        </Button>
        <Button onPress={handleNext} endContent={<ChevronRightIcon className='w-6' />}
          color='primary' className='w-36'>
          Next
        </Button>
      </div>
    </Card>

  )
}

export default Basic

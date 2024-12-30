import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/16/solid'
import { Button, Card, cn, Textarea } from '@nextui-org/react'
import { Input } from '@nextui-org/react'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { AddPropertyInputType } from './AddPropertyForm'

interface Props {
  next: () => void
  prev: () => void
  className?: string
}
const Location = (props: Props) => {

  const {
    register,
    formState: { errors },
    trigger,
    getValues
  } = useFormContext<AddPropertyInputType>();


  const handleNext = async () => {
    if(await trigger(["location.streetAddress", "location.zip", "location.city", "location.state", "location.region", "location.landmark"]))
    props.next()
  }
    const handlePrevious = () => props.prev()
  return (
    <Card className={cn("p-2 grid grid-cols-1 md:grid-cols-2 gap-3", props.className)}>
      <Input
        {...register('location.streetAddress')}
        defaultValue={getValues().location?.streetAddress}
        errorMessage={errors.location?.streetAddress?.message}
        isInvalid={!!errors.location?.streetAddress} label="Street Address" />
      <Input {...register('location.zip')}
        defaultValue={getValues().location?.zip}
        errorMessage={errors.location?.zip?.message}
        isInvalid={!!errors.location?.zip} label="Zip/Postal Code" />
      <Input {...register('location.city')}
        defaultValue={getValues().location?.city}
        errorMessage={errors.location?.city?.message}
        isInvalid={!!errors.location?.city} label="City" />
      <Input {...register('location.state')}
        defaultValue={getValues().location?.state}
        errorMessage={errors.location?.state?.message}
        isInvalid={!!errors.location?.state} label="State" />
      <Input {...register('location.region')}
        defaultValue={getValues().location?.region}
        errorMessage={errors.location?.region?.message}
        isInvalid={!!errors.location?.region} label="Region/Neighborhood" className='col-span-2' />
      <Textarea {...register('location.landmark')}
        defaultValue={getValues().location?.landmark}
        errorMessage={errors.location?.landmark?.message}
        isInvalid={!!errors.location?.landmark} label="Landsmarks" className='col-span-2' />
      <div className='flex justify-center col-span-2 gap-3'>
        <Button
          onPress={handlePrevious}
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

export default Location

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/16/solid'
import { Button, Card, Checkbox, cn, Input } from '@nextui-org/react'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { AddPropertyInputType } from './AddPropertyForm'

interface Props {
    next: () => void
    prev: () => void
    className?: string
}
const Features = (props: Props) => {
    const {
        register,
        formState: { errors },
        trigger,
        getValues,
    } = useFormContext<AddPropertyInputType>();

    const handleNext = async () => {
        if(await trigger(['propertyFeature.bedrooms', 'propertyFeature.bathrooms', 'propertyFeature.parkingSpots', 'propertyFeature.area']))
        props.next()
      }   
      
      const handlePrev = () => props.prev()
    const defaultValues = getValues();

    return (
        <Card className={cn("p-2 grid grid-cols-1 md:grid-cols-2 gap-3", props.className)}>
            <Input {...register('propertyFeature.bedrooms')}
                defaultValue={defaultValues?.propertyFeature?.bedrooms?.toString()}
                errorMessage={errors?.propertyFeature?.bedrooms?.message}
                isInvalid={!!errors?.propertyFeature?.bedrooms} label="Bedrooms" />
            <Input {...register('propertyFeature.bathrooms')}
                defaultValue={defaultValues?.propertyFeature?.bathrooms?.toString()}
                errorMessage={errors?.propertyFeature?.bathrooms?.message}
                isInvalid={!!errors?.propertyFeature?.bathrooms} label="Bathrooms" />
            <Input {...register('propertyFeature.parkingSpots')}
                defaultValue={defaultValues?.propertyFeature?.parkingSpots?.toString()}
                errorMessage={errors?.propertyFeature?.parkingSpots?.message}
                isInvalid={!!errors?.propertyFeature?.parkingSpots} label="Parking Slots" />
            <Input {...register('propertyFeature.area')}
                defaultValue={defaultValues?.propertyFeature?.area?.toString()}
                errorMessage={errors?.propertyFeature?.area?.message}
                isInvalid={!!errors?.propertyFeature?.area} label="Area" />
            <div className='flex items-center justify-between'>
                <Checkbox {...register('propertyFeature.hasSwimmingPool')}
                    defaultValue={defaultValues?.propertyFeature?.hasSwimmingPool ? "true" : "false"}
                    isInvalid={!!errors?.propertyFeature?.hasSwimmingPool}>Has Swimming Pool</Checkbox>
                <Checkbox  {...register('propertyFeature.hasGardenYard')}
                    defaultValue={defaultValues?.propertyFeature?.hasGardenYard ? "true" : "false"}
                    isInvalid={!!errors?.propertyFeature?.hasGardenYard}>Has Gard/Yard</Checkbox>
                <Checkbox  {...register('propertyFeature.hasBalcony')}
                    defaultValue={defaultValues?.propertyFeature?.hasBalcony ? "true" : "false"} 
                    isInvalid={!!errors?.propertyFeature?.hasBalcony}>Has Balcony/Patio</Checkbox>
            </div>
            <div className='mt-3 flex justify-center col-span-2 gap-3'>
                <Button
                    onPress={handlePrev}
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

export default Features
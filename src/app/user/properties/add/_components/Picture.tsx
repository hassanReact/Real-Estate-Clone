import FileInput from '@/app/Components/fileUpload';
import { Button, Card, cn, image } from '@nextui-org/react';
import React from 'react'
import PictureCard from './PictureCard';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/16/solid';
import { PropertyImage } from '@prisma/client';

interface Props {
    next: () => void;
    prev: () => void;
    className?: string;
    images: File[];
    setImages: (images: File[]) => void;
    savedImagesUrl: PropertyImage[];
    setSavedImagesUrl: (propertyImages: PropertyImage[]) => void;
}
const Picture = (props: Props) => {
    const handleNext = () => props.next()
    const handlePrev = () => props.prev()
    return (
        <Card className={cn("p-3", props.className)}>
            <FileInput onSelect={(e) => props.setImages([(e as any).target.files[0], ...props.images])} />
            <div className='flex gap-3 flex-wrap'>
            {props.savedImagesUrl!! && props.savedImagesUrl.map((images, index) => {
                        return (
                            <PictureCard key={images.id} src={images.url} index={index} onDelete={(i) => {
                                props.setSavedImagesUrl!! && 
                                props.setSavedImagesUrl(props.savedImagesUrl!.filter((img) => img.id !== images.id))
                            }} />

                        )
                    })}

                    {props.images.map((images, index) => {
                        const srcUrl = URL.createObjectURL(images);
                        return (
                            <PictureCard key={srcUrl} src={srcUrl} index={index} onDelete={(i) => props.setImages([
                                ...props.images.slice(0, i), ...props.images.slice(i + 1)
                            ])} />
                        )
                    })}
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

export default Picture

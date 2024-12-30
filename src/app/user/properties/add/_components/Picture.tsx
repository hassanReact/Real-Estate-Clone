import FileInput from '@/app/Components/fileUpload';
import { Button, Card, cn } from '@nextui-org/react';
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
            <FileInput onSelect={(e: React.ChangeEvent<HTMLInputElement>) => props.setImages([...(e.target.files ? Array.from(e.target.files) : []), ...props.images])} />
            {props.savedImagesUrl && props.savedImagesUrl.map((image, index) => {
                return (
                    <PictureCard
                        key={image.id}
                        src={image.url}
                        index={index}
                        onDelete={() => {
                            if (props.setSavedImagesUrl) {
                                props.setSavedImagesUrl(props.savedImagesUrl.filter((img) => img.id !== image.id));
                            }
                        }}
                    />
                );
            })}


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

'use client'
import React, { useState } from 'react'
import Stepper from './Stepper'
import Basic from './Basic'
import { Prisma, PropertyImage, PropertyStatus, PropertyType } from '@prisma/client'
import { cn } from '@nextui-org/react'
import Location from './Location'
import Features from './Features'
import Picture from './Picture'
import Contact from './Contact'
import { AddPropertyFormSchema } from '@/lib/zodSchema'
import z from 'zod'
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { uploadImages } from '@/lib/upload'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { redirect, useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { editProperty, saveProperty } from '@/lib/actions/property'

interface Props {
    types: PropertyType[];
    statuses: PropertyStatus[];
    property?: Prisma.PropertyGetPayload<{
        include: {
            location: true;
            feature: true;
            contact: true;
            images: true;
        }
    }>;
    isEdit?: boolean;
}

const steps = [
    { label: "Basic" },
    { label: "Location" },
    { label: "Features" },
    { label: "Pictures" },
    { label: "Contact" }
]

export type AddPropertyInputType = z.infer<typeof AddPropertyFormSchema>

const AddPropertyForm = ({ isEdit=false , ...props}: Props) => {
    const router = useRouter()
    const methods = useForm<AddPropertyInputType>({
        resolver: zodResolver(AddPropertyFormSchema),
        defaultValues:{
            contact: props.property?.contact ?? undefined,
            description: props.property?.description ?? undefined,
            location: props.property?.location ?? undefined,
            name: props.property?.name ?? undefined,
            price: props.property?.price ?? undefined,
            propertyFeature: props.property?.feature ?? undefined,
            statusId: props.property?.statusId ?? undefined,
            typeId: props.property?.typeId ?? undefined,
        }

    })

    const [step, setStep] = useState(0)
    const { user } = useKindeBrowserClient()
    const [images, setImages] = useState<File[]>([])
    const [savedImagesUrl, setSavedImagesUrl] = useState<PropertyImage[]>(
        props.property?.images ?? []
    )

    const onsubmit: SubmitHandler<AddPropertyInputType> = async (data) => {
        console.log({ data });
        const imageUrls = await uploadImages(images);



        console.log({ imageUrls });
    
        try {
            if(isEdit && props.property){
                const deleteImagesIDs = props.property?.images.filter((item) =>
                     !savedImagesUrl.includes(item)).map(
                     (item) => item.id)

                await editProperty(props.property.id, data, imageUrls, deleteImagesIDs);
                toast.success("Property updated successfully");
            } else { 
                await saveProperty(data, imageUrls, user?.id!);
                toast.success("Property added successfully");
            }  
        } catch (error) {
            console.error("Error saving property:", error);
            toast.error("Failed to add property. Please try again.");
        }finally{
        router.push("/user/properties");
    }
    };
    
    return (
        <div>
            <Stepper items={steps} activeItem={step} setActiveItem={setStep} />
            <FormProvider {...methods}>
                <form className='mt-3 p-3' onSubmit={methods.handleSubmit(onsubmit, (error) => { console.log({ error }) })}>
                    <Basic className={cn({ "hidden": step !== 0 })} statuses={props.statuses} types={props.types} next={() => setStep((prev) => prev + 1)} />
                    <Location next={() => setStep(prev => prev + 1)} prev={() => setStep(prev => prev - 1)} className={cn({ "hidden": step !== 1 })} />
                    <Features next={() => setStep(prev => prev + 1)} prev={() => setStep(prev => prev - 1)} className={cn({ "hidden": step !== 2 })} />
                    <Picture {...(props.property!! && {
                        savedImagesUrl: savedImagesUrl,
                        setSavedImagesUrl: setSavedImagesUrl
                    })} images={images} setImages={setImages} next={() => setStep(prev => prev + 1)} prev={() => setStep(prev => prev - 1)} className={cn({ "hidden": step !== 3 })} />
                    <Contact prev={() => setStep(prev => prev - 1)} className={cn({ "hidden": step !== 4 })} />
                </form>
            </FormProvider>
        </div>
    )
}

export default AddPropertyForm
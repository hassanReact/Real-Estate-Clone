'use client'
import React, { useState } from 'react'
import Stepper from './Stepper'
import Basic from './Basic'
import { PropertyStatus, PropertyType } from '@prisma/client'
import { cn } from '@nextui-org/react'
import Location from './Location'
import Features from './Features'


interface Props{
    types: PropertyType[];
    statuses: PropertyStatus[];
}
const steps = [
    {
        label : "Basic",
    },
    {
        label : "Location",
    },
    {
        label : "Features",
    },
    {
        label : "Pictures",
    },
    {
        label : "Contact",
    }
]

const AddPropertyForm = (props : Props) => {
    const [step, setStep] = useState(0)
  return (
    <div>
      <Stepper items={steps} activeItem={step} setActiveItem={setStep}/>
      <form className='mt-3 p-3'>
      <Basic className={cn({"hidden":step !== 0})} statuses={props.statuses} types={props.types} next={() => setStep((prev) => prev + 1)} />
      <Location next={() => setStep(prev => prev +1)} prev={() => setStep(prev => prev-1)} className={cn({"hidden":step !== 1})}/>
      <Features next={() => setStep(prev => prev +1)} prev={() => setStep(prev => prev-1)} className={cn({"hidden":step !== 2})}/>
      </form>
    </div>

  )
}

export default AddPropertyForm

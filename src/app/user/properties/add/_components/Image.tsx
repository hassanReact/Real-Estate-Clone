import { Card, cn } from '@nextui-org/react';
import React from 'react'

interface Props {
    next : () => void;
    prev : () => void;
    className?: string;
}
const Image = (props:Props) => {
    const handleNexts =() => props.next()
    const handlePrevious = () => props.prev()
  return (
    <Card className={cn("p-2 grid grid-cols-1 md:grid-cols-2 gap-3", props.className)}>
      
    </Card>
  )
}

export default Image

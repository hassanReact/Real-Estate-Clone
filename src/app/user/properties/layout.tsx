import { Button, Link } from '@nextui-org/react'
import React, { ReactNode } from 'react'

interface Props {
    children: ReactNode
    modalDelete?: ReactNode
}

const PropertyLayout = ({ children, modalDelete }: Props) => {
    return (
        <div >
            <div className='bg-primary-400 flex  justify-between items-center p-2'>
                <h2 className='text-white text-xl font-semibold px-2'>User Property</h2>
                
                <Button color='secondary'>
                    <Link href='/user/properties/add' className='text-white'>Add Property</Link>
                </Button>
            </div>
            {children}
            {modalDelete}
        </div>
    )
}

export default PropertyLayout

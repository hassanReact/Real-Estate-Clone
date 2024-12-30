import { NoSymbolIcon } from '@heroicons/react/16/solid'
import React from 'react'

const UnAuthorizePage = () => {
  return (
    <div className='h-screen flex flex-col justify-center items-center'>
      <p className='capitalize'>You are not Authorized to do this action</p>
      <NoSymbolIcon className='w-36 text-red-500'/>
    </div>
  )
}

export default UnAuthorizePage

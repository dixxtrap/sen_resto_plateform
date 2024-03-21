import { CheckBadgeIcon } from '@heroicons/react/24/solid'
import React from 'react'

export const SuccessRequete = () => {
  return (
    <div className='flex flex-col items-center  justify-center h-screen'>
        <CheckBadgeIcon className='h-24 text-secondary-400'></CheckBadgeIcon>
        <span className='font-bold text-xl'>Titre</span>
        <span>Message de no succes</span>
    </div>
  )
}

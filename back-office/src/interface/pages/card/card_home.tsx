import { Tab } from '@headlessui/react'
import React from 'react'
import { CardList } from './card_list'
import { CardCreate } from './card_create'
import { CardAllocationList } from '../card_allocation/card_allocation_list'

export const CardHome = () => {
  return (
    <Tab.Group as='div' className='  divide-y darkDivider'>
    <Tab.List className={'max-w-4xl  self-center flex justify-start pb-5 gap-5'}>
    {['Gestions des Cartes','Gestions des Allocations','Emettre de nouveaux cartes'].map(e=>  <Tab>
      {({ selected }) => (
            /* Use the `selected` state to conditionally style the selected tab. */
            <button
              className={
                selected ? ' button primary' : ''
              }
            >
              {e}
            </button>
          )}
        </Tab>)}
    
    
     
    </Tab.List>
    
    <Tab.Panels>
      <Tab.Panel><CardList/></Tab.Panel>
      <Tab.Panel><CardAllocationList/></Tab.Panel>
      <Tab.Panel><CardCreate/></Tab.Panel>
    </Tab.Panels>
  </Tab.Group>

  )
}

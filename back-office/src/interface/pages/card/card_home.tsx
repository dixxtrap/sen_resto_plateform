
import { CardList } from './card_list'
import { CardCreate } from './card_create'
import { CardAllocationList } from '../card_allocation/card_allocation_list'
import { Tabs } from '@mantine/core'

export const CardHome = () => {
  return (
    <Tabs defaultValue="card">
    <Tabs.List>
      <Tabs.Tab value="card" >
        Gallery
      </Tabs.Tab>
      <Tabs.Tab value="allocation" >
        Messages
      </Tabs.Tab>
      <Tabs.Tab value="emission" >
        Settings
      </Tabs.Tab>
    </Tabs.List>

    <Tabs.Panel value="card">
    <CardList/>
    </Tabs.Panel>

    <Tabs.Panel value="allocation">
    <CardAllocationList/>
    </Tabs.Panel>

    <Tabs.Panel value="emission">
    <CardCreate/>
    </Tabs.Panel>
  </Tabs>

  )
}

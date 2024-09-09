import { useState } from "react"
import { cityApi } from "../../../core/features/city.slice"
import { initPagination } from "../../../core/features/pagination"
import { TablePagination } from "../../components/table/table"
import { Modal, Select, Table, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import {  TableActionItemFonction } from "../../components/table/action_item"
import { useDisclosure } from "@mantine/hooks"
import { City } from "../../../core/models/city.dto"
import { SetLatLng } from "./widget/set_lat_lng"

export const CityList = () => {
    const [pagination, setPagination]=useState(initPagination)
    const [current, setCurrent]=useState<City>();
    const [opened, {open, close}]=useDisclosure();
    const region=cityApi.useGetRegionQuery("")
    const city=cityApi.useGetQuery(pagination)
    const form= useForm()
    const openModal=({city}:{city:City})=>{
setCurrent(city);
open()
    }
  return (
    <>
    <Modal title={<div>{`${current?.parent?.parent?.name}>> ${current?.parent?.name} >> ${current?.name}`}</div>}opened={opened} onClose={close}>
<SetLatLng city={current!}/>
    </Modal>
   <TablePagination
   title="L ensemble des commune"
    header={<div className="flex justify-between gap-3 my-6  text-left">
 
 <Select {...form.getInputProps("cityId")} searchable data={region.data?.data.map(r=>({label:r.name!,value:`${r.id}`}))} label="Region"/>
 <TextInput label="Rechercher"/>
   </div>} totalPage={city.data?.totalPage} isPaginated pagination={[pagination, setPagination]} {...city} th={['Region', "Departement","Arrondissement","Commune","Lat", "long",""]}
   trs={city.data?.data.map(e=><Table.Tr key={e.id}>
    <Table.Td>{e.parent?.parent?.parent?.name} </Table.Td>
    <Table.Td>{e.parent?.parent?.name} </Table.Td>
    <Table.Td>{e.parent?.name} </Table.Td>
    <Table.Td>{e?.name} </Table.Td>
    <Table.Td>{e?.latitude} </Table.Td>
    <Table.Td>{e?.longitude} </Table.Td>
  
    <Table.Td><TableActionItemFonction label="Geolocalisation" onClick={()=>
        openModal({city:e})
    }></TableActionItemFonction></Table.Td>
   </Table.Tr>)}
   ></TablePagination>
   </>
  )
}


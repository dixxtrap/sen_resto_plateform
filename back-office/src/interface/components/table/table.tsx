import cx, { clsx } from 'clsx';
import { FC, ReactNode, useState } from 'react';
import { Table, ScrollArea, Title, Pagination, Select, Button, TextInput } from '@mantine/core';
import classes from './table.module.css';
import { Link } from 'react-router-dom';
import {  PlusIcon } from '@heroicons/react/24/outline';
import { PaginationDto } from '../../../core/features/pagination';
import { DateInput } from '@mantine/dates';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import {  poppoverStyle } from '../form/custom_styles';
import { Alert } from '../alert_success';
import { getWsMessage } from '../../../core/features/error_transformer';

type TablePaginationProps = {
  th?: string[];
  trs?: ReactNode;
  title?: string;
  totalPage?: number ;
  subtitle?: string;
  createPath?: string;
  isPaginated?: boolean;
  createTitle?:string,
  isLoading?:boolean,
  isError?:boolean,
  isSuccess?:boolean,
  error?:any,
  pagination?:[PaginationDto, React.Dispatch<React.SetStateAction<PaginationDto>>]

};
export const  TablePagination:FC<TablePaginationProps>=({trs, title,th, createPath, totalPage, pagination,isError,error, isSuccess, isLoading, isPaginated})=> {
  const [scrolled, setScrolled] = useState(false);


  return (
    <div className='flex flex-col app_table'>
      <div className='pb-3 flex  justify-between  items-baseline'>
      <Title  className='leading-3' order={1}>{title}</Title>
      
     {createPath&& <Link to={createPath!}>
          <Button   color='primary.4' >
            Ajouter
        <PlusIcon className='text-white'/>
      </Button>
      </Link>}
      </div >
      <div className='flex  text-left justify-between my-3'>
        <TextInput placeholder="Rechercher" leftSection={ <MagnifyingGlassIcon className='size-6'/>} />
        <DateInput  popoverProps={poppoverStyle}  styles={{section:{backgroundColor:'red'},calendarHeaderLevel:{color:'white',background:'var(--mantine-color-primary-4)'}}} placeholder="A partire de"/>
      </div>
{  isSuccess&&  <ScrollArea h={{sm:400, lg:'70vh'}}  className={clsx(' bg_table  ring-1 ring-slate-400/30  rounded-md',classes.body)}  onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
      <Table miw={600}  className='table border-none' >
        <Table.Thead className={cx(classes.header,' bg-primary-500  z-50 ', { [classes.scrolled]: scrolled })}>
          <Table.Tr className='h-12 text-md ring-1  ring-slate-400/30'>
      {th?.map((e, i)=> <Table.Th  className={clsx('font-bold text-white  dark:text-white' ,{'text-right':i==th.length-1})} key={`th_${e}`}>{e}</Table.Th>)}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody >{trs}</Table.Tbody>
      </Table>
    </ScrollArea>}
   {isPaginated&& <div className='py-2 flex justify-between'>
    <Select
    onChange={(val)=>pagination?.[1](prev=>({...prev,perPage: Number(val), page:1}))}
      className='w-24'
          placeholder="Pick value"
        
      defaultValue={'20'}
      data={['20', '30', '40', '50', '100']}
    />
    <Pagination  
    withEdges
     total={totalPage??1}  siblings={1} defaultValue={1} value={pagination?.[0].page}  
    onChange={(va)=>pagination?.[1](prev=>({...prev,page: va}))}
    onNextPage={()=>{pagination![1](prev=>({...prev,page: (prev.page??0)+1}))}}
    onPreviousPage={()=>{pagination![1](prev=>({...prev,page: (prev.page??0)-1}))}} />
    </div>}
     {isError&& <Alert isOpen={isError} type="faillure" title="Ooops!" message={ getWsMessage(error)}  onClose={()=>{}} />}
    { isLoading&&<Alert isOpen={isLoading} type="loading" title="Traitement..."   onClose={()=>{}} message="Patientez un moment "/>}
 

    </div>
  );
}
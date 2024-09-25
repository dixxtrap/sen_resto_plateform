import { Paper, Image, Title,Text, Box, Flex, Center, Avatar } from '@mantine/core';
import classes from '../styles/banner_item.module.css'
import { BannerDto } from '../../../../cores/models/banner.dto';
import clsx from 'clsx';

export const BannerItem=({banner}:{banner:BannerDto})=> {
  return (
    <div   className={clsx(classes.card,'relative p-1  h-full pr-3 rounded-md ')}>
      <div className='grid grid-cols-12 grid-rows-1 bg-secondary-500/5 ring-1 ring-gray-300 rounded-md overflow-hidden  w-full h-full'>
        <div   className=' col-span-4 p-0  hidden md:flex  align-middle content-center  justify-center  bg-red-500/0    '>

         
           
        <Image radius={0} src={banner.imageUrl} p={0} m={0}   className='h-full   w-auto mx-auto' />
     
       
        {/* </div> */}
        </div>
        <div className='flex flex-col col-span-12 md:col-span-8'>
          <Flex justify={"left"} gap={5} align={"center"} p={{base:10}}>
          <Image src={banner.imageUrl} display={{base:"block", md:"none"}} w={{base:40,}} className='w-[200px]  rounded-md  h-auto' />
          <Title className='text-lg'>{banner.title}</Title>
          </Flex>
          <Box h={{base:300}} p={3} w={{md:"100%"}}>
          <Text truncate="end" className='text-wrap text-xs md:text-base  md:line-clamp-6 line-clamp-6' >{banner.description}</Text>
          </Box>
        </div>
      </div>
       
    
    </div>
  );
}
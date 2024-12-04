import {  Image, Title,Text, Box, Flex } from '@mantine/core';
import classes from '../styles/banner_item.module.css'
import { BannerDto } from '../../../../cores/models/banner.dto';
import clsx from 'clsx';

export const BannerItem=({banner}:{banner:BannerDto})=> {
  return (
    <div   className={clsx(classes.card,'relative p-1  h-full pr-3 rounded-md ')}>
      <div className=' flex  bg-secondary-500/5 ring-1 ring-gray-300 rounded-md overflow-hidden  w-full h-full'>
        

         
           
        <Image radius={0} src={banner.imageUrl} p={0} m={0} fit='contain'  className='size-20 lg:size-32 mx-auto' />
     
       
        {/* </div> */}
        
        <div className='flex flex-col grow '>
          <Flex justify={"left"} gap={{base:3, md:5}} align={"center"} p={{base:1}}>
          <Image src={banner.imageUrl} display={{base:"block", md:"none"}} w={{base:40,}} className='w-[200px]  rounded-md  h-auto' />
          <Title className='text-lg'>{banner.title}</Title>
          </Flex>
          <Box h={{base:300}} p={3} w={{md:"100%"}}>
          <Text truncate="end" className='text-wrap  text-xs md:text-base   line-clamp-4' >{banner.description}</Text>
          </Box>
        </div>
      </div>
       
    
    </div>
  );
}
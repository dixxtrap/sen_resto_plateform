import { Paper, Image, Title, Box, Flex } from '@mantine/core';
import classes from '../styles/banner_item.module.css'
import { BannerDto } from '../../../../cores/models/banner.dto';
import clsx from 'clsx';

export const BannerItem=({banner}:{banner:BannerDto})=> {
  return (
    <Paper shadow="md" p="0" h={{base:200}}   radius="lg"  className={clsx(classes.card,'relative overflow-hidden')}>
      <div className='flex w-full h-full'>
        <Box  display={{base:"none",md:"block"}} w={{base:100, sm:200, lg:180}} className='h-full grow  px-4 content-center'>
        <Image src={banner.imageUrl} className='w-full m-auto rounded-md  h-auto' />
        </Box>
        <div className='flex flex-col'>
          <Flex justify={"left"} gap={5} align={"center"} p={{base:10}}>
          <Image src={banner.imageUrl} display={{base:"block", md:"none"}} w={{base:40,}} className='w-[200px]  rounded-md  h-auto' />
          <Title className='text-lg'>{banner.title}</Title>
          </Flex>
          <span className=' max-w-lg p-2'>{banner.description}</span>
        </div>
      </div>
       
    
    </Paper>
  );
}
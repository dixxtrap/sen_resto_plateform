import { Paper, Image, Title, Box } from '@mantine/core';
import classes from '../styles/banner_item.module.css'
import { BannerDto } from '../../../../cores/models/banner.dto';
import clsx from 'clsx';

export const BannerItem=({banner}:{banner:BannerDto})=> {
  return (
    <Paper shadow="md" p="0" h={{base:200}}   radius="lg"  className={clsx(classes.card,'relative overflow-hidden')}>
      <div className='flex w-full h-full'>
        <Box  w={{base:100, sm:120, lg:180}} className='h-full w-[200px] px-4 content-center'>
        <Image src={banner.imageUrl} w={{base:80, sm:100, lg:150}} className='w-[200px] m-auto rounded-md  h-auto' />
        </Box>
        <div className='flex flex-col'>
          <Title className='text-lg'>{banner.title}</Title>
          <span className='min-w-min max-w-lg'>{banner.description}</span>
        </div>
      </div>
       
    
    </Paper>
  );
}
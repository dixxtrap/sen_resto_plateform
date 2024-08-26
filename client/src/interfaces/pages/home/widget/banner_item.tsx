import { Paper, Text, Title, Button, Overlay, Avatar } from '@mantine/core';
import classes from '../styles/banner_item.module.css'
import { BannerDto } from '../../../../cores/models/banner.dto';
import clsx from 'clsx';

export const BannerItem=({banner}:{banner:BannerDto})=> {
  return (
    <Paper shadow="md" p="xs" h={{base:400}}  w={{base:400}} radius="lg"   style={{backgroundImage:`url(${banner.imageUrl})`}} className={clsx(classes.card,'relative overflow-hidden')}>
        <Overlay color="#0000" zIndex={1} className='bg-gradient-to-t z-[10!important] from-slate-900/90 via-transparent to-slate-900/80' backgroundOpacity={0.05} />
      <div className='z-[1000]'>
       
        <Title order={3} className={classes.title}>
         {banner.title}
        </Title>
      </div>
      <div className='z-[1000] '>
      {/* <Avatar size={"lg"}/> */}
      <Text  className='text-white line-clamp-2'>{banner.description } </Text>
      </div>
    
    </Paper>
  );
}
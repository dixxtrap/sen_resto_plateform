import { Paper, Text, Title, Overlay } from '@mantine/core';
import classes from '../styles/banner_item.module.css'
import { BannerDto } from '../../../../cores/models/banner.dto';
import clsx from 'clsx';

export const BannerItem=({banner}:{banner:BannerDto})=> {
  return (
    <Paper shadow="md" p="0" h={{base:400}}   radius="lg"   style={{backgroundImage:`url(${banner.imageUrl})`}} className={clsx(classes.card,'relative overflow-hidden')}>
        <Overlay color="#0000"  zIndex={1} className='w-auto' backgroundOpacity={0.05} >
          <div className='flex h-[400px] backdrop-blur-lg'>
        <img className='w-[400px] h-auto m-auto' src={banner.imageUrl}/>
        </div>
        </Overlay>
      <div className='z-[1000] w-full bg-gradient-to-b  p-2 from-slate-900/70 to-transparent via-slate-900/40'>
       
        <Title order={3} className={classes.title}>
         {banner.title}
        </Title>
      </div>
      <div className='z-[1000]  w-full bg-gradient-to-t  p-2 from-slate-900/70 to-transparent via-slate-900/40 '>
      {/* <Avatar size={"lg"}/> */}
      <Text  className='text-white line-clamp-2'>{banner.description } </Text>
      </div>
    
    </Paper>
  );
}
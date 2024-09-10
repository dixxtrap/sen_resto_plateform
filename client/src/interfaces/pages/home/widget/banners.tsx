
import { useGetBannerQuery } from '../../../../cores/apis/api'
import { headerBgImg } from '../../../../cores/constantes/img'
import { Fetchingdata } from '../../../components/fetching_data'
import { BannerItem } from './banner_item'
import { Carousel } from '@mantine/carousel'

export const Banners = () => {
    const banners=useGetBannerQuery('')
  return (
   <Fetchingdata {...banners}>
{banners.data?.data?.length!>0&&<div style={{background:`url(${headerBgImg})`, backgroundSize:'100%'}} className='bg-white/30'>
<div className='bg-white/20 backdrop-blur-sm '>
<Carousel
      withIndicators
      height={""}
      p={10}
      pt={20}
      classNames={{indicator:"bg-secondary-400 mt-10 bottom-0", }}
     className='bg-transparent '
      slideSize={{base:'100%', sm:200, lg:600}}
      slideGap="lg"
      
     
      align="start"
      slidesToScroll={1}
      
      
    >
    {banners.data?.data.map(banner=><Carousel.Slide><BannerItem banner={banner}/></Carousel.Slide>
    )}
    </Carousel>
    </div>
</div>}
   </Fetchingdata>
  )
}

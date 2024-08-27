
import { useGetBannerQuery } from '../../../../cores/apis/api'
import { headerBgImg } from '../../../../cores/constantes/img'
import { Fetchingdata } from '../../../components/fetching_data'
import { BannerItem } from './banner_item'
import { Carousel } from '@mantine/carousel'

export const Banners = () => {
    const banners=useGetBannerQuery('')
  return (
   <Fetchingdata {...banners}>
<div style={{background:`url(${headerBgImg})`, backgroundSize:'100%'}} className='bg-white/30'>
<div className='bg-white/20 backdrop-blur-md py-10'>
<Carousel
      withIndicators
      height={400}
      p={10}
      pt={20}
     className='bg-transparent'
      slideSize={{base:'400'}}
      slideGap="lg"
      
     
      align="start"
      slidesToScroll={1}
      
      
    >
    {banners.data?.data.map(banner=><Carousel.Slide><BannerItem banner={banner}/></Carousel.Slide>
    )}
    </Carousel>
    </div>
</div>
   </Fetchingdata>
  )
}

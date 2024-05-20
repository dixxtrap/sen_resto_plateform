
import { HomeCompany } from './widget/home_company'
import { AfterHeader } from '../../components/header/after-header';
import { FastDeliver } from '../../components/fast_deliver';
import { SafePaid } from '../../components/safe-paid';
import { Services } from './widget/service';
import { ProductDiscountedWidget } from './widget/product_discounted';

const Home = () => {
  console.log("------------------------ coordonner -----------------",navigator.geolocation.getCurrentPosition((position)=>{console.log(position.coords)}));
  return (
    <div className='relative'>
   <AfterHeader/>
  <Services/>
  <FastDeliver/>
   
   <div className='bg-white '>
      <HomeCompany />
      </div>
      {/* <HomeRestaurant/> */}
     
       <SafePaid/>
      <div className='bg-white min-h-[20px]'>
      
      <ProductDiscountedWidget/>
      </div>
      <div className='bg-white h-40'></div>

    </div>
  )
}

export default Home
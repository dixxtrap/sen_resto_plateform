
import { HomeCompany } from './widget/home_company'
import { FastDeliver } from './widget/fast_deliver';
import { SafePaid } from './widget/safe-paid';
import { Banners } from './widget/banners';
import { Story } from './widget/story';
import { AfterHeader } from '../../components/header/after-header';

const Home = () => {
  console.log("------------------------ coordonner -----------------",navigator.geolocation.getCurrentPosition((position)=>{console.log(position.coords)}));
  return (
    <div className="relative">
      <AfterHeader />
      <Story/>
      <Banners/>

      <FastDeliver />

      <div className="bg-white ">
        <HomeCompany />
      </div>
      {/* <HomeRestaurant/> */}

      <SafePaid />
      {/* <div className="bg-white min-h-[20px]">
        <ProductDiscountedWidget />
      </div> */}
      <div className="bg-white h-40"></div>
    </div>
  );
}

export default Home
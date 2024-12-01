import { HomeCompany } from "./widget/home_company";
import { FastDeliver } from "./widget/fast_deliver";
import { SafePaid } from "./widget/safe-paid";
import { Banners } from "./widget/banners";
import { Story } from "./widget/story";
import { AfterHeader } from "../../components/header/after-header";
import { MapView } from "../map/map_view";
import {useDocumentTitle, useFavicon} from '@mantine/hooks'

import { logoIco } from "../../../utils/constant";
const Home = () => {
  console.log("------------------------ coordonner -----------------");
  useDocumentTitle(import.meta.env.VITE_APP_NAME);
  useFavicon(logoIco)


  return (
    <div className="relative">
      <AfterHeader />
      <Story />
      <Banners />

      
      <div className="bg-white ">
        <HomeCompany />
      </div>
      <SafePaid />
      {/* <HomeRestaurant/> */}
      <div className="hidden md:block ">
        <MapView />
      </div>
      <div className="h-20"></div>
      
      <FastDeliver />

      {/* <div className="bg-white min-h-[20px]">
        <ProductDiscountedWidget />
      </div> */}
      <div className="bg-white h-40"></div>
    </div>
  );
};

export default Home;

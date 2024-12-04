import { HomeCompany } from "./widget/home_company";
import { FastDeliver } from "./widget/fast_deliver";
import { SafePaid } from "./widget/safe-paid";
import { Banners } from "./widget/banners";
import { Story } from "./widget/story";
import { AfterHeader } from "../../components/header/after-header";
import { MapView } from "../map/map_view";
import {useDocumentTitle, useFavicon} from '@mantine/hooks'

import { logoIco } from "../../../utils/constant";
import { AllYouNeed } from "./widget/all_you_need";
const Home = () => {
  console.log("------------------------ coordonner -----------------");
  useDocumentTitle(import.meta.env.VITE_APP_NAME);
  useFavicon(logoIco)


  return (
    <div className="relative">
          <div className="absolute inset-0 -z-10 h-full w-full bg-slate-50 dark:bg-transparent dark:bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>

      <AfterHeader />
      <div className="md:h-10 h-4"></div>
      <Story />
      <div className="md:h-10 h-4"></div>
      <Banners />
      <div className="md:h-10 h-4"></div>

      
      <div className="bg-slate-100/10 ">
        <HomeCompany />
      </div>
      <SafePaid />
      {/* <HomeRestaurant/> */}
      <div className="hidden md:block ">
        <MapView />
      </div>
     

      <AllYouNeed/>
      <div className="md:h-10 h-4"></div>
      
      <FastDeliver />

      {/* <div className="bg-white min-h-[20px]">
        <ProductDiscountedWidget />
      </div> */}
      <div className=" h-40"></div>
    </div>
  );
};

export default Home;

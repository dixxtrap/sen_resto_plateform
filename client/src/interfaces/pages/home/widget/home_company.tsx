
import { Grid } from '@mantine/core';
import {  baseApi} from "../../../../cores/apis/api";

import { HomeCompanyItem } from "./home_company_item";
export const HomeCompany = () => {
  const { data:ets, isLoading, isSuccess } = baseApi.useGetEtsCompanyQuery("");
  return (
    <div className="py-8 lg:px-10">
  
      {isLoading && <span>Chargement....</span>}
      {ets && isSuccess && (<div className='flex flex-col gap-8 '>
      
         { 
          ets.data.map(et=>
            <div className='flex flex-col mt-5'>
              <div className='flex my-4 items-center gap-2'>
              {/* <Image className='h-20 w-auto' src={et.imagePath}/> */}
              <span className='text-3xl  font-bold'>{et.name}</span>
              </div>
          <div className="  grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-12 px-2 gap-y-8  ">
            {et.company.slice(0, 8).map((item, ) => (
             
            <HomeCompanyItem company={item}/>
           
            ))}
          </div>
          </div>)}
          </div>
      )}
    </div>
  );
};

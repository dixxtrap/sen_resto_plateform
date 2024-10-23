import { useParams } from "react-router-dom";
import { baseApi } from "../../../cores/apis/api"
import { HomeCompanyItem } from "../home/widget/home_company_item"
import {Image, Text} from '@mantine/core'
import { useEffect } from "react";
export const Company = () => {
  const {id}=useParams();
  const companyApi = baseApi.useGetEtsCompanyByIdQuery(id!);
  useEffect(() => {
    companyApi.refetch()
  }, [id])
  
  return (
    <>
    <div className="-mt-16 pb-16">
    <div className="h-[200px] content-center md:h-[400px] relative w-full  mb-12 md:mb-14 bg-amber-400">
          <div className="w-full text-center   ">
            <div className="max-w-3xl mx-auto">
            <span className="md:text-3xl ">  {companyApi.data?.data.description}</span>
            </div>
          
          </div>
          <div className="-bottom-10 absolute flex items-end gap-3 md:-bottom-12  left-2 md:left-8">
            <div className="md:size-24 size-20  bg-white rounded-full content-center ring p-4 ring-gray-500  ">
              <Image src={companyApi.data?.data.imagePath} className="" />

            </div>
            <Text className="font-serif md:text-3xl">{companyApi.data?.data.name} </Text>
          </div>


        </div>

    </div>
    <div className="grid grid-cols-2 gap-3  md:gap-8   sm:grid-cols-2 px-3 md:grid-cols-3 lg:grid-cols-4">
        {companyApi.data?.data.company.map((e)=><HomeCompanyItem  key={`/company/details/${e.id}`} company={e}/>)}
    </div>
    </>
  )
}

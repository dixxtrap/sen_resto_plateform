import { baseApi } from "../../../../cores/apis/api";

import { HomeCompanyItem } from "./home_company_item";
export const HomeCompany = () => {
  const { data: ets, isLoading, isSuccess } = baseApi.useGetEtsCompanyQuery("");
  return (
    <div className="md:py-1 lg:px-10">
      {isLoading && <span>Chargement....</span>}
      {ets && isSuccess && (
        <div className="flex flex-col md:gap-8 ">
          {ets.data.map((et) => (
            <div className="flex flex-col mt-1 md:mt-5">
              <div className="flex md:my-4 my-1 mt-2 items-center gap-2">
                {/* <Image className='h-20 w-auto' src={et.imagePath}/> */}
                <span className="md:text-3xl ml-3 text-lg font-bold">{et.name}</span>
              </div>
              <div className="  grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-12 px-2 gap-y-8  ">
                {et.company.slice(0, 8).map((item) => (
                  <HomeCompanyItem company={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

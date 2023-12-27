import React from "react";
import { useGetCompanyAndParticularRestaurantQuery, useGetCompanyQuery } from "../../cores/apis/api";
import clsx from "clsx";
import { constant } from "../../utils/constant";
import { CompanyEnum } from "../../cores/models/company.dto";

export const HomeCompany = () => {
  const { data = [], isLoading, isSuccess } = useGetCompanyAndParticularRestaurantQuery("");
  return (
    <>
      {isLoading && <span>Chargement....</span>}
      {data && isSuccess && (
        <div className="">
          <dl className="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:px-2 xl:px-0 ">
            {data.map((item, ) => (
              <div
                key={item.name}
                className={clsx(
              
                  "grid grid-cols-2 gap-y-2 gap-x-4 px-4 py-10 sm:px-6  xl:px-8 ring-1 ring-slate-200"
                )}
              >
                            <div className="">
                                    <img src={`${constant.filePath}/${item.profile?.id}`}  className="h-20 w-auto"/>
                </div>
                <div className="flex flex-col">
                  <dt className="text-sm font-medium leading-6 text-gray-500">
                 {item.type===CompanyEnum.MASTER?"Company":"Particulier"}
                  </dt>
                  <dd
                    className={clsx(
                      item.isActive ? "text-rose-600" : "text-gray-700",
                      "text-xs font-medium"
                    )}
                  >
                  
                  </dd>
                  <dd className="w-full flex-none text-xl font-medium leading-10 tracking-tight text-gray-900">
                  {item.name}
                  </dd>
                  <dd
                    className={clsx(
                      item.isActive ? "text-rose-600" : "text-gray-700",
                      "text-xs font-medium"
                    )}
                  >
                  {item.openingTime} / {item.closingTime}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      )}
    </>
  );
};

import React from "react";
import { useGetCompanyQuery } from "../../cores/apis/api";
import clsx from "clsx";
import { constant } from "../../utils/constant";

export const HomeCompany = () => {
  const { data = [], isLoading, isSuccess } = useGetCompanyQuery("");
  return (
    <>
      {isLoading && <span>Chargement....</span>}
      {data && isSuccess && (
        <div className="border-b border-b-gray-900/10 lg:border-t lg:border-t-gray-900/5">
          <dl className="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:px-2 xl:px-0">
            {data.map((item, itemIdx) => (
              <div
                key={item.name}
                className={clsx(
                  itemIdx % 2 === 1
                    ? "sm:border-l"
                    : itemIdx === 2
                    ? "lg:border-l"
                    : "",
                  "grid grid-cols-2 gap-y-2 gap-x-4 border-t border-gray-900/5 px-4 py-10 sm:px-6 lg:border-t-0 xl:px-8"
                )}
              >
                            <div className="">
                                    <img src={`${constant.filePath}/${item.profile?.id}`}  className="h-20 w-auto"/>
                </div>
                <div className="flex flex-col">
                  <dt className="text-sm font-medium leading-6 text-gray-500">
                    {item.name}
                  </dt>
                  <dd
                    className={clsx(
                      item.isActive ? "text-rose-600" : "text-gray-700",
                      "text-xs font-medium"
                    )}
                  >
                  
                  </dd>
                  <dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">
                  {item.restaurantLength ?? item.restaurants?.length} Restaurant
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

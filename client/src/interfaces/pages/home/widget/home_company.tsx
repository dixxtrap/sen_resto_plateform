
import {  useGetCompanyQuery } from "../../../../cores/apis/api";
import clsx from "clsx";
import { Str } from "../../../../cores/constantes/str";
export const HomeCompany = () => {
  const { data:company, isLoading, isSuccess } = useGetCompanyQuery("");
  return (
    <div className="py-8 ">
    <div className="mx-auto text-center">
      <span className="title1 ">{Str.ourCompany}</span>
    </div>
      {isLoading && <span>Chargement....</span>}
      {company && isSuccess && (
        <div className="">
          <dl className="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:px-2 xl:px-0 gap-4 ">
            {company.data.map((item, ) => (
              <div
                key={item.name}
                className={clsx(
                " hover:bg-gray-500/10 ",
                  " flex flex-col ring-1 ring-slate-200 bg-gray-50 rounded-md rounded-t-2xl  mt-32"
                )}
              >
                            <div className=" ">
                                    <img title="img" src={`${item.imagePath}`}  className="h-40 -mt-20 mx-auto w-auto rounded-md"/>
                </div>
                <div className="flex flex-col py-10 items-center">
               
                 
                 
                  <div className=" text-3xl font-medium leading-10  text-gray-900">
                  {item.shortname}
                  </div>
                  <span
                    className={clsx(
                      item.isActive ? "text-rose-600" : "text-gray-700",
                      "text-xs font-medium"
                    )}
                  >
                     <span className="text-sm font-medium leading-6 text-gray-500">
                 {item.name}
                  </span>
                  
                  </span>
                  <span
                    className={clsx(
                      item.isActive ? "text-rose-600" : "text-gray-700",
                      "text-xs font-medium leading-6"
                    )}
                  >
                  {item.openingTime} / {item.closingTime}
                  </span>
                </div>
              </div>
            ))}
          </dl>
        </div>
      )}
    </div>
  );
};


import {  useGetCompanyQuery } from "../../../../cores/apis/api";
import clsx from "clsx";
import { Str } from "../../../../cores/constantes/str";
import { HomeCompanyItem } from "./home_company_item";
export const HomeCompany = () => {
  const { data:company, isLoading, isSuccess } = useGetCompanyQuery("");
  return (
    <div className="py-8 lg:px-10">
    <div className="mx-auto text-left">
      <span className="title1 pl-2">{Str.ourCompany}</span>
    </div>
      {isLoading && <span>Chargement....</span>}
      {company && isSuccess && (
        <div className="px-2">
          <dl className="mx-auto grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3  gap-4  ">
            {company.data.slice(0, 6).map((item, ) => (
            <HomeCompanyItem company={item}/>
            ))}
          </dl>
        </div>
      )}
    </div>
  );
};

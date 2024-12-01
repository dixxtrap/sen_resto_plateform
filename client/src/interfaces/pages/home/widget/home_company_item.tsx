import { Link } from "react-router-dom";
import { CompanyDto } from "../../../../cores/models/company.dto";
import {  Image, Text } from "@mantine/core";
import clsx from "clsx";

export const HomeCompanyItem = ({ company }: { company: CompanyDto }) => {
  return (
    <Link className=" " to={`/company/details/${company.id}`}>
      <div className="flex gap-3  flex-col  group h-full w-full">
        <div className="h-24 sm:h-36 md:h-52 lg:h-52 w-full ring-1  overflow-clip  rounded-md ring-gray-800">
          <Image
            className="h-full w-full transform transition-transform duration-500 ease-in-out group-hover:scale-105  mx-auto rounded-md "
            fallbackSrc={company.imagePath}
            src={company.backgroundPath}
          />
        </div>
        <div className="flex gap-1.5 md:gap-3 flex-col">
          <div className="flex gap-0 items-center  md:gap-2 relative justify-between">
           
              <Image src={company.imagePath} fit="contain" className="w-6 h-6 rounded-sm"/>
           
            <Text className=" md:text-xl line-clamp-1 text-sm  text-ellipsis break-words font-normal pl-1 md:font-bold ">
              {company.shortname}
            </Text>
            <div className="grow"></div>
            <div
             
              className={clsx('size-2 md:h-auto absolute ring-1  right-0 ring-slate-900 md:relative md:px-1  md:w-auto rounded-sm ',
                company.isOpen ? "bg-secondary-500/20" : "bg-primary-500/20"
              )}
            >
              <span className="hidden text-xs  md:block">{company.isOpen ? "Ouvert" : "Fermer"}</span>
            </div>
          </div>
          <Text dangerouslySetInnerHTML={{__html:company.description!}} className="text-xs pt-1 md:text-base line-clamp-2  ">
            
          </Text>
          {/* {company.description} */}
        </div>
      </div>
    </Link>
  );
};

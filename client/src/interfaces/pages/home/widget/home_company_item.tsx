import { Link } from "react-router-dom";
import { CompanyDto } from "../../../../cores/models/company.dto";
import { Pill, Image, Text } from "@mantine/core";
import clsx from "clsx";

export const HomeCompanyItem = ({ company }: { company: CompanyDto }) => {
  return (
    <Link className=" " to={`/company/details/${company.id}`}>
      <div className="flex gap-3  flex-col  group h-full w-full">
        <div className="h-20 sm:h-36 md:h-52 lg:h-52 w-full ring-1  overflow-clip  rounded-md ring-gray-800">
          <Image
            className="h-full w-full transform transition-transform duration-500 ease-in-out group-hover:scale-105  mx-auto rounded-md "
            fallbackSrc={company.imagePath}
            src={company.backgroundPath}
          />
        </div>
        <div className="flex gap-3 flex-col">
          <div className="flex  gap-2 justify-between">
            <div className="h-5">
              <Image src={company.imagePath} className="w-8"/>
            </div>
            <Text className="text-base md:text-xl leading-3 text-nowrap text-ellipsis break-words font-bold ">
              {company.shortname}
            </Text>
            <div className="grow"></div>
            <Pill
              c={"white"}
              radius={3}
              className={clsx(
                company.isOpen ? "bg-secondary-500" : "bg-primary-500"
              )}
            >
              <span className="hidden md:block">{company.isOpen ? "Ouvert" : "Fermer"}</span>
            </Pill>
          </div>
          <Text dangerouslySetInnerHTML={{__html:company.description!}} className="text-sm md:text-base line-clamp-2  ">
            
          </Text>
          {/* {company.description} */}
        </div>
      </div>
    </Link>
  );
};

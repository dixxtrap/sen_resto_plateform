import { Link } from "react-router-dom";
import { CompanyDto } from "../../../../cores/models/company.dto";
import { Pill, Image, Text } from "@mantine/core";
import clsx from "clsx";

export const HomeCompanyItem = ({ company }: { company: CompanyDto }) => {
  return (
    <Link className=" " to={`/company/details/${company.id}`}>
      <div className="flex gap-3  flex-col  group h-full w-full">
        <div className="h-36 md:h-44 w-full ring overflow-hidden rounded-md ring-gray-300">
          <Image className="h-full w-ful transform transition-transform duration-500 ease-in-out group-hover:scale-125  mx-auto rounded-md " fallbackSrc={company.imagePath} src={company.backgroundPath} />
        </div>
        <div>
          <div className="flex justify-between">
          <Text className="text-base md:text-xl font-bold ">{company.shortname}</Text>
<Pill c={"white"} radius={3} className={clsx(company.isOpen?"bg-secondary-500":"bg-primary-500")}>{company.isOpen?"Ouvert":"Fermer"}</Pill>
          </div>
          <Text className="text-sm md:text-base line-clamp-2  ">{company.description}</Text>
        </div>
      </div>
    </Link>
  );
};

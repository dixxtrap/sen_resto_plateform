import { Link } from "react-router-dom";
import { CompanyDto } from "../../../../cores/models/company.dto";
import { Card, Image, Text, Space, BackgroundImage, Box } from "@mantine/core";

export const HomeCompanyItem = ({ company }: { company: CompanyDto }) => {
  return (
    <Link className=" " to={`/company/details/${company.id}`}>
      <div className="flex gap-3  flex-col   h-full w-full">
        <div className="h-36 w-full ring rounded-md ring-gray-300">
          <Image className="h-full w-full mx-auto rounded-md " fallbackSrc={company.imagePath} src={company.backgroundPath} />
        </div>
        <div>
          <Text className="text-base md:text-xl font-bold ">{company.shortname}</Text>
          <Text className="text-sm md:text-base line-clamp-2  ">{company.description}</Text>
        </div>
      </div>
    </Link>
  );
};

import { useParams } from "react-router-dom";
import { baseApi } from "../../../cores/apis/api";
import { Fetchingdata } from "../../components/fetching_data";
import {
  Avatar,
  Image,
  Container,
  Group,
  Title,
  Alert,
  Box,
  TextInput,
  Text,
  Pill,
  Spoiler,
  SimpleGrid,
} from "@mantine/core";
import { ProductItem } from "../product/widget/product_item";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useDisclosure } from "@mantine/hooks";
import clsx from "clsx";
import CompanyProduct from "./widget/company_product_item";

export const CompanyDetails = () => {
  const { id } = useParams();
  const company = baseApi.useGetCompanyDetailsQuery(id!);

  console.log(company)
  return (
    <Fetchingdata {...company}>
      <div className=" ">
        <div className="h-[200px] md:h-[400px] relative w-full  mb-12 md:mb-14 bg-amber-500">
          <Image src={company.data?.data.backgroundPath} w={"100%"} className="h-full w-full  overflow-hidden" />
          <div className="-bottom-10 absolute flex items-end gap-3 md:-bottom-12  left-2 md:left-8">
            <div className="md:size-24 size-20  bg-white rounded-full content-center ring p-4 ring-gray-500  ">
              <Image src={company.data?.data.imagePath} className="" />

            </div>
            <Text className="font-serif md:text-3xl">{company.data?.data.shortname} / {company.data?.data.phone} </Text>
          </div>


        </div>
        {/* FIXME: Company Detail */}
        <div className="flex flex-col mx-2 p-2  md:mx-8 ring-1 rounded-md ring-gray-400">
          <div className="flex w-full justify-between">
            <Text className="font-bold md:text-2xl">{company.data?.data.name}</Text>
            <Pill variant="default" className={clsx("ring-1  ", company.data?.data.isOpen?"ring-secondary-400 bg-secondary-100":"ring-primary-400 bg-primary-100 ")} c={"primary"}>
              <Text className="">{`${company.data?.data.openingTime?.slice(0, 5)}/${company.data?.data.closingTime?.slice(0, 5)}`}</Text>
            </Pill>
          </div>
          <Spoiler hideLabel={"voir plus"} showLabel={"voir moins"}>
            <Text fw={400} className={clsx(" text-xs overflow-hidden leading-5 text-gray-700  text-ellipsis md:text-base",)}>{company.data?.data.description}</Text>
          </Spoiler>
         
        </div>
        {/* TODO: filter */}


       <CompanyProduct category={company.data?.data.category!} />



        {company.data?.data.productManagement?.length === 0 && (
          <Alert
            title="Information"
            color="yellow"
            className="my-10 sm:mx-10 font-bold"
          >
            Il n'y a pas de produits pour l'instant.
          </Alert>
        )}
      </div>
    </Fetchingdata>
  );
};

import { useParams } from "react-router-dom";
import { baseApi } from "../../../cores/apis/api";
import { Fetchingdata } from "../../components/fetching_data";
import { Image, Alert, Text, Spoiler } from "@mantine/core";
import CompanyProduct from "./widget/company_product_item";
import { useEffect, useState } from "react";
import { useDocumentTitle, useFavicon } from "@mantine/hooks";
import { logoIco } from "../../../utils/constant";
import { ShowHtml } from "../../components/show_html";
import clsx from "clsx";

export const CompanyDetails = () => {
  const { id } = useParams();
  const company = baseApi.useGetCompanyDetailsQuery(id!);
  const [ico, setIco] = useState(logoIco);
  const [title, setTitle] = useState(import.meta.env.VITE_APP_NAME);
  console.log(company);

  useEffect(() => {
    if (company.isSuccess) {
      setIco(company.data?.data.imagePath!);
      setTitle(company.data?.data.name!);
    }
  }, [company.isSuccess]);
  useDocumentTitle(title);
  useFavicon(ico);
  return (
    <Fetchingdata {...company}>
      <div className=" m-2 rounded-md pb-10">
        <div className="h-[170px] md:h-[400px]  ring-1 rounded-md ring-slate-700 relative w-full  mb-8 md:mb-14">
          <Image
            src={company.data?.data.backgroundPath}
            w={"100%"}
            className="h-full w-full rounded-md overflow-hidden"
          />
          <div className="top-[150px] md:top-[355px] absolute flex items-start gap-3 md:-bottom-12  left-4 md:left-8">
            <div className="md:size-24 size-12  bg-white rounded-full content-center ring p-0.5 md:p-4 ring-secondary-500  ">
              <Image src={company.data?.data.imagePath} fit="contain" className="rounded-sm size-full " />
            </div>
            <div className="mt-3">
            <Text className="font-serif pt-3 md:pt-12 md:text-3xl">
              {company.data?.data.shortname} / {company.data?.data.phone}{" "}
            </Text>
            </div>
            
          </div>
        </div>
        {/* FIXME: Company Detail */}
        <div className="h-1"></div>
        <div className="flex flex-col   p-2   items-start jus  ring-1 rounded-md ring-gray-600">
          <div className="flex w-full items-center justify-between">
            <Text className="font-bold md:text-2xl">
              {company.data?.data.name}
            </Text>
            <div
             className={clsx("ring-1 ring-slate-600 px-2 rounded-sm p-0 text-xs", company?.data?.data.isOpen?'bg-secondary-500/20':'bg-primary-500/20')}
            >
              <Text className="text-xs">{`${company.data?.data.openingTime?.slice(
                0,
                5
              )}/${company.data?.data.closingTime?.slice(0, 5)}`}</Text>
            </div>
          </div>
          <Spoiler fw={'none'}  classNames={{content:'text-xs'}} showLabel={<span className="text-xs">voir plus</span>} hideLabel={<span className="text-xs">voir moins</span>}>
          <ShowHtml
              
              content={company.data?.data.description!}
              className="text-xs leading-5"
            />
              
          </Spoiler>
          
        </div>
        {/* TODO: filter */}

        <CompanyProduct category={company.data?.data.category!} />
        <div className="h-20 "></div>

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

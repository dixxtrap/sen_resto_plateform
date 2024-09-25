import { useParams } from "react-router-dom";
import { baseApi } from "../../../cores/apis/api";
import { Fetchingdata } from "../../components/fetching_data";
import {
  Avatar,
  Text,
  Container,
  Group,
  Title,
  Alert,
  Box,
  TextInput,
} from "@mantine/core";
import { ProductItem } from "../product/widget/product_item";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export const CompanyDetails = () => {
  const { id } = useParams();
  const company = baseApi.useGetCompanyDetailsQuery(id!);

  return (
    <Fetchingdata {...company}>
      <div className=" -mt-20">
        <Container
          size={""}
          w={"100vw"}
          m={0}
          className="bg-no-repeat bg-cover backdrop-blur-3xl   items-center justify-center relative flex   p-0 w-full"
          style={{
            backgroundPosition: "center",
            backgroundOrigin: "padding-box",
            backgroundSize: "100% 200%",
            backgroundImage: `url(${company.data?.data.backgroundPath??company.data?.data.imagePath})`,
          }}
        >
          <Group className="backdrop-blur-[10px] pt-20 bg-white/50 flex flex-col items-center justify-center   h-full w-full">
            <div className="flex flex-col text-center w-full h-full  items-center  md:gap-5  py-10  px-10">
              <Title>{company.data?.data.shortname}</Title>
              <Title size={"md"}>{company.data?.data.name}</Title>
              <div className="grow"></div>

              <Text className="text-wrap text-center max-w-lg line-clamp-2">
                {company.data?.data.description}
              </Text>
              <div className="grow"></div>
              <Text className="text-wrap max-w-lg text-3xl ">
                {company.data?.data.openingTime?.slice(0, 5)} /{" "}
                {company.data?.data.closingTime?.slice(0, 5)}
              </Text>
            </div>
            <div className="deco-top h-10 grow -mb-2 bg-white  w-full deco-bottom"></div>
          </Group>
          <Box
          w={{base:100, md:140}}
            bottom={{
              base: -30,

              md: -50,
            }}
            className="absolute  right-2  md:right-10"
          >
            <Avatar
              
              className="w-full h-auto  rounded-md"
              src={company.data?.data.imagePath}
            />
          </Box>
          <Box className="dec-top dec-bottom h-20"></Box>
        </Container>
        <Box
          h={{
            base: 10,

            md: 50,
          }}
          className=""
        ></Box>
        <div>
          <div className="flex p-2">
            <TextInput
              rightSection={<MagnifyingGlassIcon className="size-4" />}
              placeholder="search"
            />
          </div>
          <Group
            display={"grid"}
            className=" p-1 gap-1 md:gap-4  grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 my-10  sm:mx-10"
          >
            {company.data?.data.productManagement?.map((e) => {
              return (
                <ProductItem
                  product={{
                    ...e.product!,
                    id: e.productId,
                    parentId: company.data?.data.id,
                    parent: {
                      id: company.data?.data.id,
                      imagePath: company.data?.data.imagePath!,
                      shortname: company.data?.data.shortname!,
                    },
                  }}
                />
              );
            })}
          </Group>
        </div>

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

import { useParams } from "react-router-dom";
import { baseApi } from "../../../cores/apis/api";
import { Fetchingdata } from "../../components/fetching_data";
import { Avatar, Text, Container, Group, Title, Alert } from "@mantine/core";
import { ProductItem } from "../product/widget/product_item";

export const CompanyDetails = () => {
  const { id } = useParams();
  const company = baseApi.useGetCompanyDetailsQuery(id!);

  return (
    <Fetchingdata {...company}>
      <div>
        <Container
          h={{ base: 300 }}
          size={""}
          w={"100vw"}
          m={0}
          className="bg-no-repeat bg-cover relative flex   p-0 w-full"
          style={{
            backgroundPosition: "center",
            backgroundOrigin: "padding-box",
            backgroundSize: "100% 200%",
            backgroundImage: `url(${company.data?.data.imagePath})`,
          }}
        >
          <Group
            style={{ blur: "20px" }}
            className="backdrop-blur-[100px]  bg-slate-50/20  gap-3 p-4  h-full w-full"
          >
            <div className="flex flex-col h-full  px-10">
              <Title>{company.data?.data.shortname}</Title>
              <Title size={"md"}>{company.data?.data.name}</Title>
              <div className="grow"></div>

              <Text className="text-wrap max-w-lg line-clamp-2">
                {company.data?.data.description}
              </Text>
              <div className="grow"></div>
              <Text className="text-wrap max-w-lg text-3xl ">
                {company.data?.data.openingTime} /{" "}
                {company.data?.data.closingTime}
              </Text>
            </div>
          </Group>
          <div className="absolute -bottom-[100px] right-10">
            <Avatar
              radius={2}
              className="w-auto  size-[200px] rounded-md"
              src={company.data?.data.imagePath}
            />
          </div>
        </Container>
        <div className="h-[100px]"></div>
        <Group
          display={"grid"}
          className=" grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 my-10  sm:mx-10"
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

        {company.data?.data.productManagement?.length === 0 && (
          <Alert title="Information" color="yellow" className="my-10 sm:mx-10 font-bold">
            Il n'y a pas de produits pour l'instant.
          </Alert>
        )}
      </div>
    </Fetchingdata>
  );
};

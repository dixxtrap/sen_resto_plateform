import { TablePagination } from "../../components/table/table";
import { productApi } from "../../../core/features/product.slice";

import { Status } from "../../components/status";
import { Table, Image } from "@mantine/core";
import {
  TableActionItemDetails,
  TableActionItemEdit,
} from "../../components/table/action_item";

export const PlateList = () => {
  const products = productApi.useGetProductQuery(``);
  console.log(products.data);
  return (
    <TablePagination
      isPaginated
      title="Prduits"
      {...products}
      createPath="/product/create"
      createTitle="Creer un nouveau Produit"
      th={[
        "Nom",
        "Préparation",
        "Prix",
        "Reduction",
        "Categorie",
        // ...day?.map(e=>e.name?.slice(0,3)!),
        "Status",

        "",
      ]}
      thMobile={["Produits"]}
      trsMobile={
        <>
          {products.data?.data.map((product) => (
            <Table.Tr key={`plate_${product?.id}`}>
              <Table.Td className="mobile">
                <div className="flex gap-2 flex-col w-full">
                  <div className="flex w-full items-start gap-x-0">
                    <div className="ring-2 ring-primary-400 flex-shrink-0 w-20 mr-2">
                      <Image
                        alt="img"
                        title="image"
                        src={`${product.file![0]?.path ?? ""}`}
                        className="w-20 "
                      />
                      {/* <Img
                            hasImg={true}
                            icon={<BuildingStorefrontIcon className="h-7" />}
                            className="h-8 rounded-md aspect-square"
                            imgId={ e.plate?.file?.length!>0? e.plate?.file![0].photoId! : 1}
                          /> */}
                    </div>
                    <div className="flex   flex-shrink-0 content-start flex-col items-start">
                      <div className="font-semibold w-36  text-left truncate">
                        {product.name}
                      </div>
                      <div className="font-semibold w-36  text-left truncate">
                        {product.companyCategory?.name}
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full   justify-between">
                    <TableActionItemDetails
                      label="voir details"
                      path={`/product/details/${product.id}`}
                    />
                    <TableActionItemEdit
                      label="Modifier le Produit"
                      path={`/product/edit/${product.id}`}
                    />
                  </div>
                </div>
              </Table.Td>
            </Table.Tr>
          ))}
        </>
      }
      trs={
        <>
          {products.data?.data.map((product) => (
            <Table.Tr key={`plate_${product?.id}`}>
              <Table.Td className="">
                <div className="flex items-center gap-x-0">
                  <div className=" flex-shrink-0 w-10 mr-2">
                    <Image
                      alt="img"
                      title="image"
                      src={`${product.file![0]?.path ?? ""}`}
                      className="h-7 rounded-md"
                    />
                    {/* <Img
                            hasImg={true}
                            icon={<BuildingStorefrontIcon className="h-7" />}
                            className="h-8 rounded-md aspect-square"
                            imgId={ e.plate?.file?.length!>0? e.plate?.file![0].photoId! : 1}
                          /> */}
                  </div>
                  <div className="flex flex-shrink-0 flex-col">
                    <div className="font-semibold w-36 truncate">
                      {product.name}
                    </div>
                  </div>
                </div>
              </Table.Td>
              <Table.Td className="">{product.cookingTime} min</Table.Td>
              <Table.Td className="">{product.price} F CFA</Table.Td>
              <Table.Td className=""> {product.reduction} %</Table.Td>
              <Table.Td className="">{product.companyCategory?.name}</Table.Td>
              <Table.Td>
                <Status status={product.isActive === true} />
              </Table.Td>
              <Table.Td className="relative whitespace-nowrap py-3 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                <TableActionItemDetails
                  label="voir details"
                  path={`/product/details/${product.id}`}
                />
                <TableActionItemEdit
                  label="Modifier le Produit"
                  path={`/product/edit/${product.id}`}
                />
              </Table.Td>
            </Table.Tr>
          ))}
        </>
      }
      subtitle="Liste des Produits"
    />
  );
};

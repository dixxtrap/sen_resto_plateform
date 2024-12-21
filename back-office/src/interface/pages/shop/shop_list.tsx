import { shopApi } from "../../../core/features/shop.slice";
import { Status } from "../../components/status";
import { formatDate } from "../../utils/date_format";
import {
  PermisisionTypeEnum,
  ProtecterPage,
} from "../../components/protecter_page";
import { TablePagination } from "../../components/table/table";
import { Image, Table } from "@mantine/core";
import {
  TableActionItemDetails,
  TableActionItemEdit,
} from "../../components/table/action_item";

import { ShopAddProduct } from "./shop_add_product";
import { PERMISSSION_CODE } from "../../utils/permission_code";

export const ShopList = () => {
  const { data: shops, ...state } = shopApi.useGetShopQuery("");
  return (
    <div>
      <TablePagination
        thMobile={["Boutique"]}
        {...state}
        title="Restaurant"
        createPath="/shop/create"
        subtitle="Liste des Restaurants"
        th={[
          "Nom",
          "Adresse",
          "Téléphone",
          "Ouv/Ferm",
          "Date de création",
          "Status",
          "",
        ]}
        trsMobile={
          <>
            {shops?.data.map((shop) => (
              <Table.Tr key={shop.name} className=" ">
                <Table.Td className="mobile">
                  {/* <ImgPreview  name={`img_${restaurant.id}`} img={ restaurant.company.short_name=="SR" ? restaurant.profile!:restaurant.company.profile!}/> */}
                  <div className="flex flex-col w-full ">
                    <div className="flex gap-4 items-center">
                      <div>
                        <Image
                          className="size-20"
                          fallbackSrc=""
                          src={shop.backgroundPath}
                        />
                      </div>
                      <div className="  flex flex-col items-start">
                        <span> {shop.name}</span>
                        <span> {shop.phone}</span>
                        <div className="max-w-40">
                          <span className="text-ellipsis truncate break-words line-clamp-1">
                            {" "}
                            {shop.address}
                          </span>
                        </div>
                      </div>
                      {/* <div className="mt-1 text-gray-500">{company.email}</div> */}
                    </div>
                    <div className="flex justify-between   w-full mt-2 ">
                     
                      <TableActionItemDetails
                        label="voir details"
                        path={`/shop/details/${shop.id}`}
                      />
                       <ProtecterPage
                        isPage={false}
                        permissions={[
                          {
                            code: PERMISSSION_CODE.PRODUCT_MANAGEMENT,
                            type: PermisisionTypeEnum.ALL,
                          },
                        ]}
                      >
                        <ShopAddProduct shopId={`${shop.id}`} />
                      </ProtecterPage>
                      <TableActionItemEdit
                        label="Modifier le Produit"
                        path={`/shop/edit/${shop.id}`}
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
            {shops?.data.map((shop) => (
              <>
                <Table.Tr key={shop.name} className="">
                  <Table.Td className="">
                    {/* <ImgPreview  name={`img_${restaurant.id}`} img={ restaurant.company.short_name=="SR" ? restaurant.profile!:restaurant.company.profile!}/> */}

                    <div className="flex gap-4 items-center">
                      <div>
                        <Image
                          className="size-8"
                          fallbackSrc=""
                          src={shop.backgroundPath}
                        />
                      </div>
                      <div className="font-medium ">{shop.name}</div>
                      {/* <div className="mt-1 text-gray-500">{company.email}</div> */}
                    </div>
                  </Table.Td>

                  <Table.Td className="">{shop.address}</Table.Td>
                  <Table.Td className="">{shop.phone!}</Table.Td>
                  <Table.Td className="">
                    {shop.openingTime!}/{shop.closingTime!}
                  </Table.Td>

                  <Table.Td>{formatDate(shop.details?.createdAt!)}</Table.Td>
                  <Table.Td className="">
                    <Status status={shop.isActive!} />
                  </Table.Td>

                  <Table.Td className="last_td_container">
                    <ProtecterPage
                      isPage={false}
                      permissions={[
                        {
                          code: PERMISSSION_CODE.PRODUCT_MANAGEMENT,
                          type: PermisisionTypeEnum.ALL,
                        },
                      ]}
                    >
                      <ShopAddProduct shopId={`${shop.id}`} />
                    </ProtecterPage>
                    <TableActionItemDetails
                      label="voir details"
                      path={`/shop/details/${shop.id}`}
                    />
                    <TableActionItemEdit
                      label="Modifier le Produit"
                      path={`/shop/edit/${shop.id}`}
                    />
                  </Table.Td>
                </Table.Tr>
              </>
            ))}
          </>
        }
      />
    </div>
  );
};

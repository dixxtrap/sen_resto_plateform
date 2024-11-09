import { shopApi } from "../../../core/features/shop.slice";
import { Status } from "../../components/status";
import { formatDate } from "../../utils/date_format";
import { ProtecterPage } from "../../components/protecter_page";
import { TablePagination } from "../../components/table/table";
import {  Image, Table } from "@mantine/core";
import {
  TableActionItemDetails,
  TableActionItemEdit,
} from "../../components/table/action_item";
import { PermissionCode } from "../../utils/per;ission_code";
import { ShopAddProduct } from "./shop_add_product";

export const ShopList = () => {
  const { data: shops, ...state } = shopApi.useGetShopQuery("");
  console.log(shops);
  return (
    <div>
      <TablePagination
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
        trs={
          <>
            {shops?.data.map((shop) => (
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
                <Table.Td className="">{shop.openingTime!}/{shop.closingTime!}</Table.Td>
             
                

                <Table.Td>{formatDate(shop.details?.createdAt!)}</Table.Td>
                <Table.Td className="">
                  <Status status={shop.isActive!} />
                </Table.Td>

                <Table.Td className="last_td_container">
                  <ProtecterPage
                    isPage={false}
                    permissions={[
                      {
                        code: PermissionCode.PRODUCT_MANAGEMENT,
                        type: "CREATE",
                      },
                    ]}
                  >
                   <ShopAddProduct shopId={`${shop.id}`}/>
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
            ))}
          </>
        }
      />
    </div>
  );
};

import { TablePagination } from "../../components/table/table";
import { useGetPaymentTypeQuery } from "../../../core/features/payment_type.slice";
import { Status } from "../../components/status";
import { formatDate } from "../../utils/date_format";
import { Img } from "../../components/image_updatable";
import { BanknotesIcon } from "@heroicons/react/24/outline";
import { Table } from "@mantine/core";
import { TableActionItemDetails, TableActionItemEdit } from "../../components/table/action_item";

export const PaymentTypeList = () => {
  const { data: paymentType  } = useGetPaymentTypeQuery("");
  return (
    <>
      <TablePagination
        title="Methode de Paiement"
        th={[
          "Nom",
          "Telephone",
          "email",
          "frais",
          "frais Operateur",
          "date de Création",
          "status",
          "",
        ]}
        createPath="/payment_type/create"
        isPaginated={false}
        trs={paymentType?.data.map((e) => (
          <Table.Tr className="whitespace-nowrap  max-w-xs text-sm text-gray-500 py-2">
            <Table.Td>
              <div className="flex gap-x-3 items-center " >
                <Img
                  imgPath={e.imagePath}

                  className="w-8 rounded-md"
                  icon={<BanknotesIcon className="h-7 mx-1 text-primary-600 bg" />} hasImg={e.imagePath!==null}                />
                <span className="font-bold">{e.name}</span>
              </div>
            </Table.Td>
            <Table.Td>{e.phone}</Table.Td>
            <Table.Td>{e.email }</Table.Td>
            <Table.Td>{e.fees} %</Table.Td>
            <Table.Td>{e.invertFees} %</Table.Td>
            <Table.Td>{formatDate(e.details?.createdAt!)} </Table.Td>
            <Table.Td>
              <Status
                status={e.isActive!}
                activeText="Actif"
                inactiveText="Inactif"
              />
            </Table.Td>
            <Table.Td className="relative whitespace-nowrap py-3 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
            <TableActionItemDetails label='voir details' path={`/payment_type/details/${e.id}`}/>
            <TableActionItemEdit label='voir details' path={`/payment_type/edit/${e.id}`}/>
            
              
            </Table.Td>
          </Table.Tr>
        ))}
      />
    </>
  );
};

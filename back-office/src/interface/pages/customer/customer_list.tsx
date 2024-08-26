import { useGetCustomerQuery } from "../../../core/features/customer.slice";
import { TablePagination } from "../../components/table/table";
import { Status } from "../../components/status";
import { formatDate } from "../../utils/date_format";
import { Table } from "@mantine/core";
import { TableActionItemDetails, TableActionItemEdit } from "../../components/table/action_item";

export const CustomerList = () => {
  const {
    data: customers,
    isLoading,
    isError,
    isSuccess,
    error
  } = useGetCustomerQuery("");
 
  return (
    <>

      
      <TablePagination
        isError={isError}
        isLoading={isLoading}
        isSuccess={isSuccess}
        error={error}
        title="Clients"
        th={[
          "Nom Complet",
          "Téléphone",
          "Adresse",
          "Date Inscription",
          "Status",
          "Verification",
          "",
        ]}
        subtitle="Liste des Clients"
        trs={
          <>
            {customers?.data.map((customer) => (
              <Table.Tr className=" whitespace-nowrap text-sm text-slate-500 ">
                <Table.Td className=" ">{customer!.firstname} {customer!.lastname}</Table.Td>
                <Table.Td className="">{customer!.phone}</Table.Td>
                <Table.Td className="">{customer!.address?.streetAddress}</Table.Td>
                <Table.Td className="">{formatDate(customer!.details?.createdAt!)}</Table.Td>
                <Table.Td className="">
                  <Status
                    status={customer.isActive!}
                    inactiveText="Inactif"
                    activeText="Actif"
                  />
                </Table.Td>
                <Table.Td className="">
                  <Status
                    status={customer.isPhoneVeirified!}
                    inactiveText="Non Verifié"
                    activeText="Verifié"
                  />
                </Table.Td>
                <Table.Td className="relative whitespace-nowrap py-3 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                <TableActionItemDetails label='voir details' path={`/customer/details/${customer.id}`}/>
                <TableActionItemEdit label='voir details' path={`/customer/edit/${customer.id}`}/>
                </Table.Td>
              </Table.Tr>
            ))}
          </>
        }
      />
    </>
  );
};

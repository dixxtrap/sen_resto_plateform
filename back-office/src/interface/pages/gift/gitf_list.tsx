import { Table } from "@mantine/core";
import { TablePagination } from "../../components/table/table";
import { useGetGiftQuery } from "../../../core/features/gift.slice";
import { Status } from "../../components/status";
import { formatDate } from "../../utils/date_format";
export const GiftList = () => {
  const { data: gifts, ...state } = useGetGiftQuery("");
  console.log(gifts);
  return (
    <div>
      
      <TablePagination
        {...state}
        title="Gifts"
        createPath="/gift/create"
        subtitle="Liste des Remises"
        th={["Description", "Remise","Date", "Status", ""]}
        trs={
          <>
            {gifts?.data?.history?.map((gift:any) => (
              <Table.Tr key={gift.id} className="">
                <Table.Td className="">{gift.description}</Table.Td>
                <Table.Td className="">{gift.discount} %</Table.Td>
                <Table.Td>{formatDate(gift.createdAt!)}</Table.Td>
                <Table.Td className="">
                  <Status status={gift.isActive!} />
                </Table.Td>

                <Table.Td className="last_td_container"></Table.Td>
              </Table.Tr>
            ))}
          </>
        }
      />
    </div>
  );
};

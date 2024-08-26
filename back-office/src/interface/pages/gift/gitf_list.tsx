import { Table } from "@mantine/core";
import { TablePagination } from "../../components/table/table";
export const GiftList = () => {
  return (
    <div>
      <TablePagination
        title="Gifts"
        createPath="/gift/create"
        subtitle="Liste des Gifts"
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
            <Table.Tr className="">
              <Table.Td className="">
                
              <div className="flex items-center">
                        <div className=" pl-2 flex-shrink-0  w-16 mr-2 content-center flex  justify-start ">

                        </div>
                       
                          <div className="font-medium "></div>
                      
                      </div>  
              </Table.Td>
            </Table.Tr>
          </>
        }
      />
    </div>
  );
};

import {  TableTd , TableTr} from "@mantine/core";
import { seatingApi } from "../../../core/features/seating.slice";
import { TablePagination } from "../../components/table/table";
import { SeatingCreate } from "./seating_create";
import { Status } from "../../components/status";
import { SeatingEdit } from "./seating_edit";

export const SeatingList = () => {
  const { data: seatings, ...state } = seatingApi.useGetSeatingQuery();
  return (
    <TablePagination
      th={["Nom","shop","capacite","Status" ,""]}
      {...state}
      creaBtn={<SeatingCreate/>}
      trs={
        <>
          {seatings?.data.map((e) => (
            <TableTr>
              <TableTd>{e.name}</TableTd>
              <TableTd>{e.shop?.name}</TableTd>
              <TableTd>{e.capacity}</TableTd>
              <TableTd>  
                <Status status={e.isActive!} />
              </TableTd>

             
              <TableTd><SeatingEdit {...e}/></TableTd>
            </TableTr>
          ))}
        </>
      }
    />
  );
};

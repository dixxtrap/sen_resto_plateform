import { Image, TableTd, TableTr } from "@mantine/core";
import { iconApi } from "../../../core/features/icon.slice";
import { TablePagination } from "../../components/table/table";
import { AppIconCreate } from "./app_icon_create";
import { AppIconUpdate } from "./app_icon_update";

export const AppIconList = () => {
  const { data, ...dataState } = iconApi.useGetAllQuery("");
  return (
    <div>
      <TablePagination
        title="Icons"
        {...dataState}
        creaBtn={<AppIconCreate />}
        th={['Icon',"Titre", "Code", "Description", ""]}
        trs={
          <>
            {data?.data.map((e) => (
              <TableTr className="">
                <TableTd>
                  <div>
                    <Image className="size-8" src={e.imagePath!} />
                  </div>
                </TableTd>
                <TableTd>{e.name}</TableTd>
                <TableTd>{e.code}</TableTd>
                <TableTd>{e.description}</TableTd>
                <TableTd>
                  <AppIconUpdate icon={e}/>
                </TableTd>
              </TableTr>
            ))}
          </>
        }
      />
    </div>
  );
};

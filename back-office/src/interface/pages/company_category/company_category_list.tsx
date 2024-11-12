import { TableTd, TableTr, Text } from "@mantine/core";
import { companyCategoryApi } from "../../../core/features/company_category.slice";
import { TablePagination } from "../../components/table/table";
import { CompanyCategoryCreate } from "./company_category_create";
import { Status } from "../../components/status";
import { CompanyCategoryEdit } from "./company_category_edit";

export const CompanyCategoryList = () => {
  const companyCategories = companyCategoryApi.useGetQuery();
  console.table(companyCategories.data?.data);
  return (
    <TablePagination
      title="Liste des Categories"
      thMobile={["Categories"]}
      th={["name", "description", "priorité", "status", ""]}
      {...companyCategories}
      creaBtn={<CompanyCategoryCreate />}
      trsMobile={<>{companyCategories.data?.data?.map(e=>( <TableTr className="md:hidden">
        <TableTd className="mobile">
            <div className="flex w-full justify-between">
           <span> {e.name}</span>
           <CompanyCategoryEdit cat={e} />
            </div>
        </TableTd>
      </TableTr>))}</>}
      trs={
        <>
          {companyCategories.data?.data?.map((e) => (
            <>
              <TableTr >
                <TableTd>{e.name}</TableTd>
                <TableTd>
                  <div className="max-w-[200px]">
                    <Text truncate="end" className=" w-full   ">
                      {" "}
                      {e.description}
                    </Text>
                  </div>
                </TableTd>
                <TableTd>{e.priority}</TableTd>

                <TableTd>
                  <Status status={e.isActive!} />
                </TableTd>
                <TableTd>
                  <CompanyCategoryEdit cat={e} />
                </TableTd>
              </TableTr>
             
            </>
          ))}
        </>
      }
    ></TablePagination>
  );
};

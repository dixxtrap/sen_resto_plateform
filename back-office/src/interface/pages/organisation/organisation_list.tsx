import { useGetCompanyQuery } from "../../../core/features/company.slice";
import { TablePagination } from "../../components/table/table";
import { Status } from "../../components/status";
import { Table, Image, Text } from "@mantine/core";
import {
  TableActionItemDetails,
  TableActionItemEdit,
} from "../../components/table/action_item";
import { DEFAULT_IMG } from "../../components/defaul_img";
// import { BuildingOfficeIcon } from '@heroicons/react/24/outline';
export const OrganisationList = () => {
  const companies = useGetCompanyQuery("");
  return (
    <TablePagination
      {...companies}
      thMobile={["Compagnies"]}
      th={["Nom", "Email", "Addresse", "Phone", "Solde", "Type", "Status", ""]}
     
      createPath="/organisation/create"
      trsMobile={
        <>
          {companies.data?.data.map((company) => (
            <Table.Tr className="  " key={company.id! + company.name!}>
              <Table.Td className=" mobile flex-col">
                <div className="flex f items-start justify-start">
                  <div className=" pl-2 flex-shrink-0  w-32 mr-2 content-center flex  justify-start ">
                    <Image
                      fallbackSrc={DEFAULT_IMG}
                      src={`${company.imagePath!}`}
                      className="h-20 rounded-md"
                      alt=""
                    />
                  </div>

                  <div className="flex flex-col content-start justify-start items-start ">
                    <div className="font-medium ">{company.name}</div>
                    <div className=" ">{company.phone}</div>
                    <div className=" ">{company.email}</div>
                  </div>
                  {/* <div className="mt-1 text-gray-500">{company.email}</div> */}
                </div>
                <div className="flex justify-between w-full ">
                  <TableActionItemDetails
                    label="voir details"
                    path={`/organisation/details/${company.id}`}
                  />
                  <TableActionItemEdit
                    label="voir details"
                    path={`/organisation/edit/${company.id}`}
                  />
                </div>
              </Table.Td>
            </Table.Tr>
          ))}
        </>
      }
      title="Organisation"
      subtitle="List des oraganisations  et status "
      trs={
        <>
          {companies.data?.data.map((company) => (
            <>
              <Table.Tr className=" " key={company.id! + company.name!}>
                <Table.Td className="">
                  <div className="flex items-center">
                    <div className=" pl-2 flex-shrink-0  h-16 mr-2 content-center  ">
                      <Image
                        src={`${company.imagePath!}`}
                        className="w-10 h-auto rounded-md"
                        alt=""
                      />
                    </div>

                    <div className="font-medium ">{company.name}</div>
                    {/* <div className="mt-1 text-gray-500">{company.email}</div> */}
                  </div>
                </Table.Td>
                <Table.Td className="">{company.email}</Table.Td>

                <Table.Td className="">
                  <div className="max-w-[200px]">
                    <Text truncate="end" className=" w-full   ">
                      {" "}
                      {company.address}
                    </Text>
                  </div>
                </Table.Td>
                <Table.Td className="">{company.phone}</Table.Td>
                <Table.Td className="font-bold">
                  {company.balance} Fcfa
                </Table.Td>
                <Table.Td>{company.establishmentType?.name}</Table.Td>

                <Table.Td className="">
                  <Status
                    status={company.isActive!}
                    inactiveText="Inactif"
                    activeText="Actif"
                  />
                </Table.Td>
                <Table.Td className="last_td_container">
                  <TableActionItemDetails
                    label="voir details"
                    path={`/organisation/details/${company.id}`}
                  />
                  <TableActionItemEdit
                    label="voir details"
                    path={`/organisation/edit/${company.id}`}
                  />
                </Table.Td>
              </Table.Tr>
              {/* TR mobile */}
            </>
          ))}
        </>
      }
    />
  );
};

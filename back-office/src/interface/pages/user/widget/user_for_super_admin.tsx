import { Table } from "@mantine/core";
import { userApi } from "../../../../core/features/auth.slice";
import { TablePagination } from "../../../components/table/table";
import { Status } from "../../../components/status";
import {
  TableActionItemDetails,
  TableActionItemEdit,
} from "../../../components/table/action_item";

export const UserForSuperAdmin = () => {
  const users = userApi.useGetUserForAdminQuery("");

  return (
    <div>
      <TablePagination
        {...users}
        title="Agents"
        isPaginated
        subtitle="Liste des Agents"
        createPath="/user/create"
        th={[
          "Nom & Prenom",
          "Email",
          "Role",
          "Adresse",
          "Téléphone",
          "Company",

          "status",
          "",
        ]}
        trs={
          <>
            {users.data?.data.map((user) => (
              <Table.Tr key={user.email + "_" + user.id}>
                <Table.Td className="">
                  <div className="flex items-center">
                    {/* <ImgPreview  name={`img_${user.id}`} img={ user.company.short_name=="SR" ? user.profile!:user.company.profile!}/> */}

                    <div className="flex flex-col">
                      <div className="font-bold  ">
                        {user.firstname!} {user.lastname!}
                      </div>
                    </div>
                  </div>
                </Table.Td>
                <Table.Td className="">{user.email ?? ""} </Table.Td>

                <Table.Td className="">{user.role!.name ?? ""} </Table.Td>

                <Table.Td className="">{user.address}</Table.Td>
                <Table.Td className="">{user.phone}</Table.Td>
                <Table.Td className="">{user.company?.name}</Table.Td>
                <Table.Td className="">
                  <Status
                    status={user.isActive!}
                    inactiveText="Inactif"
                    activeText="Actif"
                  />
                </Table.Td>
                <Table.Td className="last_td_container">
                  <TableActionItemDetails
                    label="voir details"
                    path={`/user/details/${user.id}`}
                  />
                  <TableActionItemEdit
                    label="voir details"
                    path={`/user/edit/${user.id}`}
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

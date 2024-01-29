import { useGetRoleByIdQuery } from "../../../../core/features/role.slice";
import { useParams } from "react-router-dom";
import { TablePagination } from "../../../components/table_pagination";
import { Status } from "../../../components/status";
import { formatDate } from "../../../utils/date_format";
import { Alert } from "../../../components/alert_success";

export const RoleDetails = () => {
  const id = parseInt(useParams().id!);
  const { data: role, isLoading, isSuccess, isError } = useGetRoleByIdQuery(id);
  return (
    <div>
      {isLoading && <Alert isOpen={ isLoading} type="loading" />}
      {isError && <Alert isOpen={ isLoading} type="faillure" />}
      <TablePagination
      title={`Liste des utilisateur avec le role ${role?.name}`}
        isPaginated={false}
        th={["Prenom & Prenom", "email", "phone", "company / restaurant", ""]}
        trs={
          <>
            {isSuccess&& role && role?.user!.map((e) => (
              <tr key={`user_${e.id}`}>
                <td>
                  {e.firstname} {e.lastname}
                </td>

                <td>{e.email}</td>
                <td>{e.phone}</td>
                <td>
                  {e.parent?.name!} {e.parent?.parent?.name!==null && ` / ${e.parent?.parent?.name!}`}
                </td>
                <td className="last_td_container">
                  <Status
                    activeText="active"
                    inactiveText="inactive"
                    status={e.isActive!}
                  />
                </td>
              </tr>
            ))}
          </>
        }
      />
       <TablePagination
        isPaginated={false}
        title="Liste des droits"
        subtitle={`privilèges accordés au ${role?.name}`}
        th={["Module", "Droit", "Creation", "Modification",  ""]}
        trs={
          <>
            {role?.rolePermission!.map((p) => (
              <tr key={`${p.permission?.id}_permission`} className="">
                <td>{p.permission?.name}</td>
                <td>{p.permission?.action!}</td>
                <td>{formatDate(p.details?.createdAt!)}</td>
                <td>{formatDate(p.details?.updatedAt!)}</td>

                <td className="last_td_container">
                  <Status
                    activeText="active"
                    inactiveText="inactive"
                    status={p.isActive!}
                  />
                </td>
              
              </tr>
            ))}
          </>
        }
      />
    </div>
  );
};

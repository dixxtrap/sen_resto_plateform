import { useGetRoleByIdQuery } from "../../../../core/features/role.slice";
import { useParams } from "react-router-dom";
import { TablePagination } from "../../../components/table_pagination";
import { Status } from "../../../components/status";
import { formatDate } from "../../../utils/date_format";

export const RoleDetails = () => {
  const id = parseInt(useParams().id!);
  const { data: role, isLoading, isSuccess, isError } = useGetRoleByIdQuery(id);
  return (
    <div>
      <TablePagination
      title={`Liste des utilisateur avec le role ${role?.name}`}
        isPaginated={false}
        th={["Prenom & Prenom", "email", "phone", "company / restaurant", ""]}
        trs={
          <>
            {role?.user.map((e) => (
              <tr key={`user_${e.id}`}>
                <td>
                  {e.firstname} {e.lastname}
                </td>

                <td>{e.email}</td>
                <td>{e.phone}</td>
                <td>
                  {e.company?.name} {e.restaurant?.name!=null &&` / ${e.restaurant.name}`}
                </td>
                <td className="last_td_container">
                  <Status
                    activeText="active"
                    inactiveText="inactive"
                    status={e.status!}
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
            {role?.permission!.map((p) => (
              <tr key={`${p.id}_permission`} className="">
                <td>{p.sousModule}</td>
                <td>{p.type}</td>
                <td>{formatDate(p.createdAt!)}</td>
                <td>{formatDate(p.updatedAt!)}</td>

                <td className="last_td_container">
                  <Status
                    activeText="active"
                    inactiveText="inactive"
                    status={p.isActive}
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

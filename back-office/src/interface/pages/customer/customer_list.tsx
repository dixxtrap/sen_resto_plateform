import { useCustomerQuery } from "../../../core/features/customer.slice";
import { TablePagination } from "../../components/table_pagination";
import { Link } from "react-router-dom";
import { Status } from "../../components/status";
import { formatDate } from "../../utils/date_format";

export const CustomerList = () => {
  const {
    data: customers = [],
    isLoading,
    isError,
    isSuccess,
  } = useCustomerQuery("");
  console.log(isSuccess)
  return (
    <>
      {isLoading&&<span>chargement</span>}
      {isError&&<span>error</span>}
      
      <TablePagination
        
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
            {customers.map((customer) => (
              <tr className=" whitespace-nowrap text-sm text-slate-500 ">
                <td className=" ">{customer!.firstname} {customer!.lastname}</td>
                <td className="">{customer!.phone}</td>
                <td className="">{customer!.address?.streetAddress}</td>
                <td className="">{formatDate(customer!.details?.createdAt!)}</td>
                <td className="">
                  <Status
                    status={customer.isActive!}
                    inactiveText="Inactif"
                    activeText="Actif"
                  />
                </td>
                <td className="">
                  <Status
                    status={customer.isPhoneVeirified!}
                    inactiveText="Non Verifié"
                    activeText="Verifié"
                  />
                </td>
                <td className="relative whitespace-nowrap py-3 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                  <Link
                    to={`/customer/details/${customer.id}`}
                    className="last_td"
                  >
                    Details<span className="sr-only"> {customer.phone}</span>
                  </Link>
                  <Link
                    to={`/customer/edit/${customer.id}`}
                    className="last_td"
                  >
                    Modifier<span className="sr-only"> {customer.phone}</span>
                  </Link>
                </td>
              </tr>
            ))}
          </>
        }
      />
    </>
  );
};

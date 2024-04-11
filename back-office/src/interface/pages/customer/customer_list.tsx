import { useGetCustomerQuery } from "../../../core/features/customer.slice";
import { TablePagination } from "../../components/table_pagination";
import { Link } from "react-router-dom";
import { Status } from "../../components/status";
import { formatDate } from "../../utils/date_format";

export const CustomerList = () => {
  const {
    data: customers,
    isLoading,
    isError,
    isSuccess,
    error
  } = useGetCustomerQuery("");
 
  return (
    <>

      
      <TablePagination
        isError={isError}
        isLoading={isLoading}
        isSuccess={isSuccess}
        error={error}
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
            {customers?.data.map((customer) => (
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
                    className="last_td accept"
                  >
                    Details<span className="sr-only"> {customer.phone}</span>
                  </Link>
                  <Link
                    to={`/customer/edit/${customer.id}`}
                    className="last_td default"
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

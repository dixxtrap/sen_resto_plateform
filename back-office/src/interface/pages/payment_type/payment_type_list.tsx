import { TablePagination } from "../../components/table_pagination";
import { useGetPaymentTypeQuery } from "../../../core/features/payment_type.slice";
import { Status } from "../../components/status";
import { formatDate } from "../../utils/date_format";
import { Link } from "react-router-dom";
import { Img } from "../../components/image_updatable";
import { BanknotesIcon } from "@heroicons/react/24/outline";

export const PaymentTypeList = () => {
  const { data: paymentType = [] } = useGetPaymentTypeQuery("");
  return (
    <>
      <TablePagination
        title="Methode de Paiement"
        th={[
          "Nom",
          "Telephone",
          "email",
          "frais",
          "frais Operateur",
          "date de Création",
          "status",
          "",
        ]}
        createPath="/payment_type/create"
        isPaginated={false}
        trs={paymentType.map((e) => (
          <tr className="whitespace-nowrap  max-w-xs text-sm text-gray-500 py-2">
            <td>
              <div className="flex gap-x-3 items-center " >
                <Img
                  imgPath={e.imagePath}

                  className="w-8 rounded-md"
                  icon={<BanknotesIcon className="h-7 mx-1 text-primary-600 bg" />} hasImg={e.imagePath!==null}                />
                <span className="font-bold">{e.name}</span>
              </div>
            </td>
            <td>{e.phone}</td>
            <td>{e.email }</td>
            <td>{e.fees} %</td>
            <td>{e.invertFees} %</td>
            <td>{formatDate(e.details?.createdAt!)} </td>
            <td>
              <Status
                status={e.isActive!}
                activeText="Actif"
                inactiveText="Inactif"
              />
            </td>
            <td className="relative whitespace-nowrap py-3 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
              <Link
                to={`/payment_type/details/${e.id}`}
                className="last_td">
              
                Details
              </Link>
              <Link
                to={`/payment_type/edit/${e.id}`}
               className="last_td">
                Modifier
              </Link>
            </td>
          </tr>
        ))}
      />
    </>
  );
};

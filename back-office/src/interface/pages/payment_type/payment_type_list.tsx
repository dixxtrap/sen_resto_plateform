import React from "react";
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
          "description",
          "frais",
          "frais Operateur",
          "date de Création",
          "status",
          "",
        ]}
        createPath="/payment_type/create"
        trs={paymentType.map((e) => (
          <tr className="whitespace-nowrap  max-w-xs text-sm text-gray-500 py-2">
            <td>
              <div className="flex gap-x-3 items-center" >
                <Img
                  hasImg={e.profile!.size! > 0}
                  imgId={e.profile!.id}
                  className="w-8 rounded-md"
                  icon={
                    <BanknotesIcon className="h-7 mx-1 text-indigo-600 bg" />
                  }
                />
                <span>{e.name}</span>
              </div>
            </td>
            <td>{e.description}</td>
            <td>{e.fees} %</td>
            <td>{e.feesInvert} %</td>
            <td>{formatDate(e.createdAt!)} </td>
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

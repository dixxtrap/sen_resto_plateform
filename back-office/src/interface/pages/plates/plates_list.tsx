import React from "react";
import { TablePagination } from "../../components/table_pagination";
import { useGetPlateQuery } from "../../../core/features/plate.slice";
import { BuildingStorefrontIcon } from "@heroicons/react/24/outline";
import { Img } from "../../components/image_updatable";

export const PlateList = () => {
  const { data: plates = [] } = useGetPlateQuery("");
  return (
    <TablePagination
      title="Plats"
      th={["Nom"]}
      trs={
        <>
          {plates.map((e) => (
            <tr>
              <td className="whitespace-nowrap py-3 pl-4 pr-3 text-sm sm:pl-0">
                <div className="flex items-center">
                  <div className="h-11 w-11 flex-shrink-0">
                    {e.file && (
                      <Img
                        hasImg={true}
                        icon={<BuildingStorefrontIcon className="h-7" />}
                        className="h-8 rounded-md aspect-square"
                        imgId={e.file[0].photo.id}
                      />
                    )}
                  </div>

                  <div className="font-medium text-gray-900">{e.name}</div>
                  {/* <div className="mt-1 text-gray-500">{company.email}</div> */}
                </div>
              </td>
            </tr>
          ))}
        </>
      }
      subtitle="Listes des Plats"
    />
  );
};

import React from "react";
import { TablePagination } from "../../components/table_pagination";
import { useGetPlateQuery } from "../../../core/features/plate.slice";
import { BuildingStorefrontIcon } from "@heroicons/react/24/outline";
import { Img } from "../../components/image_updatable";
import { clsx } from "../../utils/clsx";
import { Link } from "react-router-dom";
import { CakeIcon } from "@heroicons/react/20/solid";

export const PlateList = () => {
  const { data: plates = [] } = useGetPlateQuery("");
  return (
    <TablePagination
      title="Plats"
      createPath="/plate/create"
      th={[
        "Nom",
        "Préparation",
        "Prix",
        "Reduction",
        "Lun",
        "Mar",
        "Mer",
        "Jeu",
        "Ven",
        "Sam",
        "Dim",
        "",
      ]}
      trs={
        <>
          {plates.map((e) => (
            <tr>
              <td className="whitespace-nowrap py-3 pl-4 pr-3 text-sm sm:pl-0">
                <div className="flex items-center">
                  <div className="h-11 w-11 flex-shrink-0">
                    {e.file && e.file.length > 0 ? (
                      <Img
                        hasImg={true}
                        icon={<BuildingStorefrontIcon className="h-7" />}
                        className="h-8 rounded-md aspect-square"
                        imgId={e.file[0].photo.id}
                      />
                    ):<CakeIcon className="h-8  md:h-8 text-indigo-500 bg-indigo-100 p-1 rounded-md"/>}
                  </div>
                  <div className="flex flex-shrink-0 flex-col">
                    <div className="font-medium text-gray-900">{e.name}</div>
                    <div className="mt-1 text-gray-500">
                      {" "}
                      {e.description!.substring(0, 30)}
                    </div>
                  </div>
                </div>
              </td>
              <td className="whitespace-nowrap  max-w-xs py-3 text-sm text-gray-500">
                {e.cookingTime} minutes
              </td>
              <td className="whitespace-nowrap  max-w-xs py-3 text-sm text-gray-500">
                {e.price} F CFA
              </td>
              <td className="whitespace-nowrap  max-w-xs py-3 text-sm text-gray-500">
                {e.reduction}
              </td>
              <td className=" ">
                <div
                  className={clsx(
                    e.monday ? "bg-teal-400/20 " : "bg-slate-400/20",
                    " h-4 w-4 rounded-full p-1"
                  )}
                >
                  <div
                    className={clsx(
                      e.monday ? "bg-teal-400  " : "bg-slate-400",
                      "rounded-full h-full w-full"
                    )}
                  ></div>
                </div>
              </td>{" "}
              <td className=" ">
                <div
                  className={clsx(
                    e.tuesday ? "bg-teal-400/20 " : "bg-slate-400/20",
                    " h-4 w-4 rounded-full p-1"
                  )}
                >
                  <div
                    className={clsx(
                      e.tuesday ? "bg-teal-400  " : "bg-slate-400",
                      "rounded-full h-full w-full"
                    )}
                  ></div>
                </div>
              </td>{" "}
              <td className=" ">
                <div
                  className={clsx(
                    e.wednesday ? "bg-teal-400/20 " : "bg-slate-400/20",
                    " h-4 w-4 rounded-full p-1"
                  )}
                >
                  <div
                    className={clsx(
                      e.wednesday ? "bg-teal-400  " : "bg-slate-400",
                      "rounded-full h-full w-full"
                    )}
                  ></div>
                </div>
              </td>{" "}
              <td className=" ">
                <div
                  className={clsx(
                    e.thursday ? "bg-teal-400/20 " : "bg-slate-400/20",
                    " h-4 w-4 rounded-full p-1"
                  )}
                >
                  <div
                    className={clsx(
                      e.thursday ? "bg-teal-400  " : "bg-slate-400",
                      "rounded-full h-full w-full"
                    )}
                  ></div>
                </div>
              </td>{" "}
              <td className=" ">
                <div
                  className={clsx(
                    e.friday ? "bg-teal-400/20 p-1" : "bg-slate-400/20",
                    " h-4 w-4 rounded-full p-1"
                  )}
                >
                  <div
                    className={clsx(
                      e.friday ? "bg-teal-400  " : "bg-slate-400",
                      "rounded-full h-full w-full"
                    )}
                  ></div>
                </div>
              </td>{" "}
              <td className=" ">
                <div
                  className={clsx(
                    e.saturday ? "bg-teal-400/20 p-1" : "bg-slate-400/20",
                    " h-4 w-4 rounded-full p-1"
                  )}
                >
                  <div
                    className={clsx(
                      e.saturday ? "bg-teal-400  " : "bg-slate-400",
                      "rounded-full h-full w-full"
                    )}
                  ></div>
                </div>
              </td>
              <td className=" ">
                <div
                  className={clsx(
                    e.sunday ? "bg-teal-400/20 " : "bg-slate-400/20",
                    " h-4 w-4 rounded-full p-1"
                  )}
                >
                  <div
                    className={clsx(
                      e.sunday ? "bg-teal-400  " : "bg-slate-400",
                      "rounded-full h-full w-full"
                    )}
                  ></div>
                </div>
              </td>
              <td className="relative whitespace-nowrap py-3 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                <Link
                  to={`/plate/details/${e.id}`}
                  className="text-indigo-600 px-2 hover:text-indigo-900"
                >
                  Details
                </Link>
                <Link
                  to={`/plate/edit/${e.id}`}
                  className="text-indigo-600 px-2 hover:text-indigo-900"
                >
                  Modifier
                </Link>
              </td>
            </tr>
          ))}
        </>
      }
      subtitle="Listes des Plats"
    />
  );
};

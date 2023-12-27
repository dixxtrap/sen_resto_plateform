import React from "react";
import { TablePagination } from "../../components/table_pagination";
import {
  useGetPlateQuery,
  useGetRestaurantPlateQuery,
} from "../../../core/features/plate.slice";
import { BuildingStorefrontIcon } from "@heroicons/react/24/outline";
import { Img } from "../../components/image_updatable";
import { clsx } from "../../utils/clsx";
import { Link } from "react-router-dom";
import { CakeIcon } from "@heroicons/react/20/solid";
import { Alert } from "../../components/alert_success";
import { useProfileQuery } from "../../../core/features/security.slice";

export const PlateList = () => {
  const { data: profile } = useProfileQuery("");
  const {
    data: plates = [],
    isSuccess,
    isLoading,
    isError,
  } = useGetRestaurantPlateQuery(`${profile?.companyId!}`);
  return (
    <>
      <Alert isOpen={isLoading} type="loading" />
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
          isSuccess && (
            <>
              {plates.map((e) => (
                <tr>
                  <td className="">
                    <div className="flex items-center gap-x-3">
                      <div className=" flex-shrink-0">
                       
                          <Img
                            hasImg={true}
                            icon={<BuildingStorefrontIcon className="h-7" />}
                            className="h-8 rounded-md aspect-square"
                            imgId={ e.plate?.file?.length!>0? e.plate?.file![0].photoId! : 1}
                          />
                      
                      </div>
                      <div className="flex flex-shrink-0 flex-col">
                        <div className="font-semibold">
                          {e.plate?.name}
                        </div>
                        <div className="mt-1 text-gray-500">
                          {" "}
                          {e.plate?.description!.substring(0, 30)}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="">{e.plate?.cookingTime} minutes</td>
                  <td className="">{e.plate?.price} F CFA</td>
                  <td className="">{e.plate?.reduction}</td>
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
                    <Link to={`/plate/details/${e.plateId}`} className="last_td">
                      Details
                    </Link>
                    <Link to={`/plate/edit/${e.plateId}`} className="last_td">
                      Modifier Plat
                    </Link>
                    <Link to={`/plate/management/${e.plateId}`} className="last_td">
                      Modifier Planing
                    </Link>
                  </td>
                </tr>
              ))}
            </>
          )
        }
        subtitle="Listes des Plats"
      />
    </>
  );
};

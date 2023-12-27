import React from "react";
import {
  useGetPlateQuery,
  useGetRestaurantPlateQuery,
  useGetRestaurantUserPlateQuery,
} from "../../../core/features/plate.slice";
import { Img } from "../../components/image_updatable";
import { useParams } from "react-router-dom";
import { PalteManagementItem } from "./plate_management_item";

export const RestaurantPlatManagement = () => {
  const { id } = useParams();
  const { data: plats = [], isLoading, isSuccess } = useGetRestaurantUserPlateQuery("");
  const {
    data: validplats = [],
    isLoading: isLoading2,
    isSuccess: isSuccess2,
  } = useGetRestaurantPlateQuery(id!);
  console.log(validplats)
  return (
    <div>
        {/* {validplats.map(item=><span>{item.companyId}</span>)} */}
      <div className="grid md:grid-cols-3 gap-2 rounded-md ">
        {plats.map((item) => (
        <PalteManagementItem plate={item} companyId={parseInt(id!)} isValid={validplats.some((vItem) => item.id === vItem.plateId)}/>
        ))}
      </div>
    </div>
  );
};

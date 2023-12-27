import React from "react";
import { Plate } from "../../../core/models/plate";
import { Img } from "../../components/image_updatable";
import { useAddPlateToRestaurantMutation } from "../../../core/features/plate.slice";
import { clsx } from "../../utils/clsx";
import { CheckCircleIcon } from "@heroicons/react/20/solid";

export const PalteManagementItem = ({
  plate,
  companyId,
  isValid,
}: {
  plate: Plate;
  companyId: number;
  isValid: boolean;
}) => {
  const [switchPlate, { isLoading, isSuccess }] =
    useAddPlateToRestaurantMutation();
  return (
    <button
      onClick={() => switchPlate({ companyId, plateId: plate.id! })}
      className={clsx(
        "flex  relative border rounded-sm ",
        isValid ? "  ring-2 border-teal-500" : ""
      )}
    >
      {isValid && (
        <div className="  absolute h-full w-full bg-teal-200/20"></div>
      )}
      <Img
        imgId={plate?.file![0]?.photoId ?? 1}
        className="h-28 p-2 w-28"
        hasImg={true}
      />
      <div className="flex  flex-col items-start">
      <div className="flex justify-between w-full">  <span className="text-lg font-bold">{plate.name}</span> {isValid && <CheckCircleIcon className="h-7 text-teal-500" />}</div>
        <span className="line-clamp-3 text-left">{plate.description}</span>
      </div>
    </button>
  );
};

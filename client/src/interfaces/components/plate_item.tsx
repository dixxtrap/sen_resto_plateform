import { useState } from "react";
import { Plate } from "../../cores/models/plate";
import { PlusIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";

import { constant } from "../../utils/constant";
import { PlateItemPoppup } from "./order_poppup";

export const PlateItem = ({ plate }: { plate: Plate }) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <PlateItemPoppup open={open} setOpen={setOpen} plate={plate} />
      <div key={plate.id} className="group plate">
        <div className="aspect-h-1  aspect-w-1 w-full  overflow-hidden   xl:aspect-h-4 xl:aspect-w-7 relative">
          <img
            src={`${constant.filePath}/${plate?.file![0]?.photoId??1}`}
            alt={plate.name}
            className="h-36 md:h-60 lg:h-72 w-full object-cover object-center group-hover:opacity-75"
          />
          <div className="describe ">
            <div className="flex flex-col h-full">
              <span className="title2">Description</span>
              <span className=" leading-8 text-left font-semibold">
                {plate.description}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col px-2 pt-2 ">
          <h3 className=" title2">{plate.name}</h3>
          <p className="text-slate-700">
            {plate.description && plate.description?.length > 0
              ? plate.description.substring(0, 30)
              : "pas de description"}
          </p>

          <div className="flex justify-between items-center py-2 ">
            <p className="mt-1 text-lg  text-red-500 font-bold">
              {plate.price} F CFA
            </p>
            <button
              onClick={() => setOpen(true)}
              className="bg-red-500 px-3 py-2 rounded-md ring-red-400 ring-2 ring-inset flex items-center"
            >
              {" "}
              <PlusIcon className="h-2 text-white " />
              <ShoppingCartIcon className="h-5 text-white " />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

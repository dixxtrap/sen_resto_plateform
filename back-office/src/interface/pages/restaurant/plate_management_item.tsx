import { Img } from "../../components/image_updatable";
import { useAddProductToRestaurantMutation } from "../../../core/features/product.slice";
import { clsx } from "../../utils/clsx";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { ProductDto } from "../../../core/models/product";

export const PalteManagementItem = ({
  product,
  companyId,
  isValid,
  onClick,
}: {
  product: ProductDto;
  companyId: number;
  isValid: boolean;
  onClick: () => {};
}) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "flex  relative border  border-gray-500/30 rounded-md ",
        isValid ? "  ring-2 border-teal-500" : ""
      )}
    >
      {isValid && (
        <div className="  absolute h-full w-full bg-teal-200/20"></div>
      )}
      <Img
        imgPath={product?.file![0]?.path}
        className="h-24  m-2 w-24 rounded-md "
        hasImg={true}
      />
      <div className="flex grow flex-col items-start">
        <div className="flex justify-between w-full">
          {" "}
          <span className="text-lg font-bold">{product.name}</span>{" "}
          {isValid && <CheckCircleIcon className="h-7 text-teal-500" />}
        </div>
        <span className="line-clamp-3 text-left text-sm">
          {product.description}
        </span>
      </div>
    </button>
  );
};

import { useState } from "react";
import { ProductManagementDto } from "../../../core/models/product_management";
import { ProductDto } from "../../../core/models/product";
import { Alert } from "../../components/alert_success";
import { CheckIcon } from "@heroicons/react/20/solid";
import { useAddProductManagementByIdMutation } from "../../../core/features/product.slice";
import { useParams } from "react-router-dom";
import { Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { modalStyleProps } from "../../components/form/custom_styles";

export const RestaurantAddProduct = ({
  productManagement,
}: {
  productManagement: ProductManagementDto[];
}) => {
  const [showDialog, { open, close }] = useDisclosure(false);
  const [listProduct, setListProduct] = useState<ProductDto[]>([]);
  const { id } = useParams();
  const [addProducts, { isLoading }] = useAddProductManagementByIdMutation();
  const handleListProduct = (body: ProductDto) => {
    if (!listProduct.some((item) => item.id === body.id)) {
      setListProduct([...listProduct!, body]);
    } else {
      setListProduct([...listProduct.filter((e) => e.id !== body.id)]);
    }
  };
  const _onsubmit = () => {
    addProducts({ id: parseInt(id!), body: listProduct });
    close();
    setListProduct([]);
  };
  return (
    <div>
      <button className="button primary " onClick={() => open()}>
        {" "}
        Ajouter des permission
      </button>
      {isLoading && <Alert isOpen={true} type="loading" />}
      {showDialog && (
        <Modal
          title={
            <Text size="lg" className="font-bold">
              Liste des permission
            </Text>
          }
          {...modalStyleProps}
          opened={showDialog}
          onClose={() => close()}
        >
          <div className="h-[75vh] relative flex flex-col">
            <div className="grow h-fit  w-full overflow-y-auto flex flex-col    ">
              {productManagement.map((item) => (
                <button
                  key={`role_permission_add_${item.id}`}
                  onClick={() => handleListProduct(item.product!)}
                  className=" flex justify-start gap-2  p-2 border-b border-gray-500/40 hover:bg-gray-500/20"
                >
                  <div className="h-10  w-10 ">
                    {item.product?.file?.length! > 0 && (
                      <img
                        title="daxx"
                        src={`${item.product?.file![0].path}`}
                        className="h-full"
                      />
                    )}
                  </div>
                  <div className="flex grow   flex-col">
                    <div className="flex ">
                      <span className="">{item.product?.name}</span>
                    </div>
                    <div className="flex  text-sm">
                      <span className="lowercase text-gray-500  truncate max-w-[240px]">
                        {" "}
                        {item.product?.description}
                      </span>
                    </div>
                  </div>
                  <div className="ring-2 ring-gray-500/60 rounded-md h-5 w-5 ">
                    {listProduct?.some((p) => p.id === item.product!.id) && (
                      <CheckIcon className="text-teal-50 h-5 p-0.5 w-5 m-auto bg-secondary-500 rounded-md" />
                    )}
                  </div>
                </button>
              ))}
              <div className="sticky bottom-0   pt-0.5 dark:bg-black  ">
                {listProduct.length > 0 && (
                  <button
                    className="button primary "
                    onClick={() => {
                      _onsubmit();
                    }}
                  >
                    {" "}
                    Ajouter les permission
                  </button>
                )}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

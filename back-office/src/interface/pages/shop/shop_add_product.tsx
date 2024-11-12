import { useEffect, useState } from "react";

import {
  Modal,
  Button,
  Image,
  SimpleGrid,
  ScrollAreaAutosize,
  ActionIcon,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { productApi } from "../../../core/features/product.slice";
import {

  IconCheese,
  IconCircleCheck,
} from "@tabler/icons-react";

export const ShopAddProduct = ({ shopId }: { shopId: string }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { data: shopManagement, ...getManagementState } =
    productApi.useGetManagementByShopQuery(shopId);
  const { data: allProduct } = productApi.useGetProductQuery("");
  const [listProduct, setListProduct] = useState<number[]>([]);
  const [addProducts, updateState] =
    productApi.useUpdateManagmentByShopMutation();
  const handleListProduct = (id: number) => {
    if (!listProduct.some((item) => item === id)) {
      setListProduct([...listProduct!, id!]);
    } else {
      setListProduct([...listProduct.filter((e) => e !== id)]);
    }
  };
  const _onsubmit = () => {
    addProducts({ id: shopId, body: { productIds: listProduct } });
    // close();
    // setListProduct([]);
  };
  useEffect(() => {
    setListProduct(shopManagement?.data?.map((e) => e.productId!) ?? []);
  }, [getManagementState.isSuccess]);
  useEffect(() => {
    if (updateState.isSuccess) {
      close();
    }
  }, [updateState.isSuccess]);

  return (
    <>
      {/* <Alert isOpen={updateState.isLoading} type="loading"></Alert> */}
      <Modal
        title={<span className="font-bold">Ajouter des produits</span>}
        onClose={close}
        opened={opened}
      >
        <div className="flex flex-col max-h-[75vh]">
          <ScrollAreaAutosize className="grow">
            <SimpleGrid p={3} cols={{ base: 2, md: 3 }}>
              {allProduct?.data?.map((e) => (
                <div
                  onClick={() => handleListProduct(e.id!)}
                  className="flex relative  flex-col items-center text-center"
                >
                  {listProduct.some((i) => e.id == i) && (
                    <IconCircleCheck className="absolute top-0 right-0  rounded-full size-5 m-1 content-center bg-primary-500" />
                  )}
                  <div className=" ring-2 ring-primary-500 rounded-md overflow-hidden">
                    <Image src={e.file![0].path ?? ""} />
                  </div>
                  {e.name}
                </div>
              ))}
            </SimpleGrid>
          </ScrollAreaAutosize>
          <div className="min-h-10 ">
            <Button onClick={_onsubmit} fullWidth>
              Valider
            </Button>
          </div>
        </div>
      </Modal>
      <ActionIcon className="md:block hidden" onClick={open}><IconCheese/></ActionIcon>
      <Button size="compact-md" variant="light" className="md:hidden font-light " rightSection={<IconCheese/>} onClick={open}>produits</Button>
    </>
  );
};

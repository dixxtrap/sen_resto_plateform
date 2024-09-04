import { FC } from "react";
import { OrderDto } from "../../../../cores/models/order.dto";

import {
  ActionIcon,
  Alert,
  Avatar,
  Badge,
  Button,
  ButtonGroup,
  Group,
  Image,
  LoadingOverlay,
  Modal,
  Text,
} from "@mantine/core";
import { ExclamationCircleIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { CompanyEnum } from "../../../../cores/models/company.dto";
import { orderApi } from "../../../../cores/apis/order.slice";
import { OrderDetailWidget } from "./oreder_detail_widget";
import { useDisclosure } from "@mantine/hooks";
import { IconInfoCircle } from "@tabler/icons-react";
type OrderWidgetProps = {
  order: OrderDto;
};
export const OrderWidget: FC<OrderWidgetProps> = ({ order }) => {
  const [del, deleteStatus] = orderApi.useDeleteMutation();
  const ondelete = async () => {
    try {
      await del(`${order.id}`).unwrap();
      close();
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
    } finally {
    }
  };
  const [opened, { close, open }] = useDisclosure();
  return (
    <div
      key={`order_${order.id}`}
      className="ring-1 hover:shadow-xl h-min  p-3 flex flex-col duration-150 ring-gray-300 overflow-hidden  rounded-md "
    >
      {/* {order.partner.type} */}
      <div>
        {" "}
        <Image
          className="h-28 w-auto mx-auto my-5"
          src={
            order.partner.type === CompanyEnum.RESTO &&
            order.partner.parentId == 1
              ? order.partner.parent?.imagePath
              : order.partner.imagePath
          }
        />
      </div>
      <div className=" flex flex-col  gap-3">
        <div className="flex  ">
          <div>
            <Text className="text-2xl font-bold">
              {order.partner.shortname}
            </Text>
            <Text className="text-sm font-thin">{order.partner.name}</Text>
          </div>
          <div className="grow"></div>
        </div>
        <div className="flex gap-3">
          {order.products.slice(0, 2).map((e) => (
            <Badge
              w={"auto"}
              classNames={{ label: "text-sm" }}
              variant="light"
              size="xl"
              className="h-10 p-0   pr-1 text-lg"
              leftSection={
                <Avatar src={e.productHistory?.product?.file![0]?.path} />
              }
            >
              <div className="flex  gap-2">
                <span className="text-sm">
                  {" "}
                  {e.productHistory.product.name}
                </span>
                <span className="text-white bg-primary-600 size-4 rounded-full text-center">
                  {e.quantity}
                </span>
              </div>
            </Badge>
          ))}
          {order.products.length > 2 && (
            <ActionIcon radius={100} size={"lg"}>
              <PlusIcon className="size-10" />
            </ActionIcon>
          )}
        </div>
        <div className="flex justify-between">
          <span>Total</span>
          {order && (
            <span className="text-2xl font-bold">
              {order.products
                .map((_e, j) => j)
                .map(
                  (i) =>
                    (Number(
                      order.products[i]?.productHistory.price *
                        (100 -
                          (order.products[i]?.productHistory.reduction! ?? 0))
                    ) /
                      100) *
                    order.products[i].quantity
                )
                .reduce((p1, p2) => p1 + p2)}{" "}
              FCFA
            </span>
          )}
        </div>
        <Modal classNames={{ content: "bg-red-100", header: "bg-red-100" }} title={<div> 
          <ExclamationCircleIcon className="size-8"/> 
          <span>Annulation</span>
        </div>} opened={opened} onClose={close}>
          <LoadingOverlay
            visible={deleteStatus.isLoading}
            zIndex={1000}
            overlayProps={{ radius: "sm", blur: 2 }}
            loaderProps={{ color: "pink", type: "bars" }}
          />
         

          <Group justify="center" gap="md" className="flex flex-col" style={{ marginTop: "20px" }}>
            <div>
            Voulez-Vous Annuler la Commande {order.id} ?
            </div>
            <div className="flex justify-around w-full">
            <Button
              onClick={ondelete}
              color="green"
              disabled={deleteStatus.isLoading}
            >
              Valider
            </Button>
            <Button color="red" onClick={close}>
              Annuler
            </Button>
         </div>
           
          </Group>
        </Modal>
        <ButtonGroup className="grow w-fit min-w-full ">
          <Button
            onClick={open}
            leftSection={<TrashIcon className="size-5" />}
            color="primary"
            className="grow"
          >
            Annuler
          </Button>
          <OrderDetailWidget order={order} />
        </ButtonGroup>
      </div>
    </div>
  );
};

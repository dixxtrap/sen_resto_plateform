import {
  Alert,
  Button,
  Group,
  LoadingOverlay,
  Modal,
  Pill,
  Table,
} from "@mantine/core";
import { orderApi } from "../../../core/features/order.slice";
import { TablePagination } from "../../components/table/table";
import { statusMessages } from "../../../core/models/order.dto";
import {
  TableActionItemDetails,
  TableActionItemEdit,
} from "../../components/table/action_item";
import { useDisclosure } from "@mantine/hooks";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

export const OrderList = () => {
  const order = orderApi.useGetOrdersQuery("");
  const [opened, { close, open }] = useDisclosure();
  const onValidate = async () => {
    try {
      close();
    } catch (error) {
      console.error(error);
    } finally {
    }
  };
  return (
    <TablePagination
      {...order}
      th={["customer", "Produit", "status", ""]}
      trs={
        <>
          {order.data?.data.map((e) => (
            <Table.Tr>
              <Table.Td>
                {e.customer?.firstname} {e.customer?.lastname}/
                {e.customer?.phone}
              </Table.Td>

              <Table.Td>
                <div className="flex gap-3">
                  {e.products?.map((p) => (
                    <Pill>{p.productHistory?.product?.name}</Pill>
                  ))}
                </div>
              </Table.Td>
              <Table.Td>
                <span className={e.status}>{statusMessages[e.status]}</span>
              </Table.Td>

              <Table.Td className="">
                <Modal opened={opened} onClose={close}>
                  <LoadingOverlay
                    zIndex={1000}
                    overlayProps={{ radius: "sm", blur: 2 }}
                    loaderProps={{ color: "pink", type: "bars" }}
                  />
                  <Alert
                    variant="light"
                    color="green"
                    title="Validation"
                    icon={<CheckCircleIcon fontSize={30} />}
                  ></Alert>
                  voulez-vous valider la commande{" "}
                  {order.data?.data.map((e) => e.id)}?
                  <Group
                    justify="center"
                    gap="md"
                    style={{ marginTop: "20px" }}
                  >
                    <Button color="green" onClick={onValidate}>
                      Valider
                    </Button>
                    <Button color="red" onClick={close}>
                      Annuler
                    </Button>
                  </Group>
                </Modal>
                <Group justify="center">
                  <Button color="green" onClick={open} size="compact-md">
                    valider
                  </Button>
                </Group>
                <TableActionItemDetails
                  label="voir details"
                  path={`/order/details/${e.id}`}
                />
                <TableActionItemEdit
                  label="voir details"
                  path={`/order/edit/${e.id}`}
                />
              </Table.Td>
            </Table.Tr>
          ))}
        </>
      }
    />
  );
};

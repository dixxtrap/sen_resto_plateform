import {
  Alert,
  Badge,
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
import { getSocket } from "../../../core/features/get_socket";

export const OrderList = () => {
  const { data: order, ...state } = orderApi.useGetOrdersQuery("");
  const [opened, { close, open }] = useDisclosure();
  const onValidate = async () => {
    try {
      close();
    } catch (error) {
      console.error(error);
    } finally {
    }
  };
  getSocket()?.on("messageFrom", async () => {
   handleRefetch()
  });
  const handleRefetch = () => {
   if(state.isSuccess && !state.isLoading){
    console.log("===============refetch================")
    state.refetch()}
  };
 

  return (
    <>
      <TablePagination
        {...state}
        isPaginated
        th={["customer","Téléphone", "Produit", "status", ""]}
        trs={
          <>
            {order?.data.map((e) => (
              <Table.Tr key={e.id}>
                <Table.Td>
                  {e.customer?.firstname} {e.customer?.lastname}
                </Table.Td>
                <Table.Td>
                 
                  {e.customer?.phone}
                </Table.Td>
                <Table.Td>
                  <div className="flex gap-3">
                    {e.products?.slice(0, 2)?.map((p) => (
                      <Pill key={`pill_${p.productHistory?.id}`}>{p.productHistory?.product?.name}</Pill>
                    ))}
                    {e.products?.length! > 2 && (
                      <Badge>+ {e.products?.length! - 2}</Badge>
                    )}
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
                    {order?.data.map((e) => e.id)}?
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
                    <Button fw={400} className="border-2 border-secondary-400" color="secondary.4" onClick={open} size="compact-sm">
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
    </>
  );
};

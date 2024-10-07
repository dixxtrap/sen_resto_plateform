import ExclamationCircleIcon from '@heroicons/react/24/solid/ExclamationCircleIcon'
import { Button, ButtonGroup, Text,Group, LoadingOverlay, Modal } from '@mantine/core'
import { orderApi } from '../../../../cores/apis/order.slice';
import { useDisclosure } from '@mantine/hooks';

export const DeleteOrder = ({orderId}:{orderId:number}) => {
    const [del, deleteStatus] = orderApi.useDeleteMutation();
    
  const [opened, { close }] = useDisclosure();
    const ondelete = async () => {
        try {
          await del(`${orderId}`).unwrap();
          close();
        } catch (error) {
          console.error("Erreur lors de la suppression:", error);
        } finally {
        }
      };
  return (
    <>
     <Modal
          p={0}
          size={"xs"}
          classNames={{ content: " p-0", body: "p-0", header: " p-0 px-2" }}
          title={
            <div className="flex text-red-500 items-center">
              <ExclamationCircleIcon className="size-8" />
              <span className="text-2xl font-bold">Annulation</span>
            </div>
          }
          opened={opened}
          onClose={close}
        >
          <LoadingOverlay
            visible={deleteStatus.isLoading}
            zIndex={1000}
            overlayProps={{ radius: "sm", blur: 2 }}
            loaderProps={{ color: "pink", type: "bars" }}
          />

          <Group
            gap="md"
            className="flex flex-col"
            style={{ marginTop: "5px" }}
          >
            <Text className="text-left w-full px-5">
              Voulez-Vous Annuler la Commande {orderId} ?
            </Text>
            <div className="flex justify-around w-full">
              <ButtonGroup className="grow">
                <Button
                  className="grow rounded-none"
                  color="red"
                  onClick={close}
                >
                  Annuler
                </Button>
                <Button
                  onClick={ondelete}
                  color="green"
                  className="grow rounded-none"
                  disabled={deleteStatus.isLoading}
                >
                  Valider
                </Button>
              </ButtonGroup>
            </div>
          </Group>
        </Modal>
        <Button
                  onClick={ondelete}
                  color="red"
                  className=" ring ring-red-400"
                  disabled={deleteStatus.isLoading}
                >
                  Valider
                </Button>
    </>
  )
}

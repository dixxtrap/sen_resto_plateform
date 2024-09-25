import { ProductDto } from "../../../../cores/models/product";
import {
  Card,
  Image,
  Group,
  Text,
  Avatar,
  Modal,
  ActionIcon,
  Space,
} from "@mantine/core";

import { PlateItemPoppup } from "./order_poppup";

import clsx from "clsx";
import { securityApi } from "../../../../cores/apis/security.slice";
import { PlusIcon } from "@heroicons/react/24/solid";
import { reductionPrice } from "../../../../utils/calcul";
import { ProtectedAction } from "../../../components/login/login_form";
import { useDisclosure } from "@mantine/hooks";

export const ProductItem = ({ product }: { product: ProductDto }) => {
  const [opened, { toggle }] = useDisclosure();
  const profile = securityApi.useProfileQuery("");
  console.log(import.meta.env.CURRENCY);
  return (
    <>
      {opened && (
        <Modal
          opened={opened}
        
          onClose={() => toggle()}
          size={"md"}
          h={{ base: "75vh" }}
        >
          {" "}
          <PlateItemPoppup open={opened} setOpen={toggle} product={product} />
        </Modal>
      )}

      <Card
     
       
     
        className={clsx(
          "bg-table flex p-0  md:p-3 md:border-none  lg:ring-1  ring-gray-400/60   border-gray-400/0 bg-[#f5f8fc58] h-full   duration-500  hover:shadow-lg"
        )}
      >
        {/* <Card.Section p={10}>
       <Group p={2} className="">
          <div className="h-12  w-12">
            <Avatar
              src={product.parent?.imagePath}
              radius="sm"
              className="w-auto h-auto"
            />
          </div>
          <div>
            <Text className="text-nowrap text-ellipsis " fw={500}>{product.parent?.shortname}</Text>
            <Text fz="xs" c="dimmed">
              preparation {product.cookingTime}
            </Text>
          </div>
          <div className="grow"></div>
         { product.reduction!=0&&<div>
            <Badge className="ring-1 hidden sm:visible ring-secondary-500" variant="light">-{product.reduction!}%</Badge>
          </div>}
        </Group>
     
        <Group flex={2}  gap={1}>
          <div className="flex flex-col">
        <Text fw={700} className={clsx(classes.title, "text-base md:text-lg md:my-3 text-nowrap text-ellipsis")}>
          {product.name}
        </Text>
        <div className="md:flex hidden  gap-3">
        {product.category?.slice(0, 3)?.map((c) => (
            <Pill key={c.name} radius={6}>{c.name}</Pill>
          ))}
        </div>
          
          </div>
        </Group>
       </Card.Section> */}

        <Group className="w-full grid grid-cols-12  grow pb-2 lg:pb-0 md:border-b-none  md:rounded-md ">
          <div className="h-[100px] xs:h-[100px] md:col-span-4  lg:h-[140px] col-span-4  overflow-hidden rounded-md ring-1 content-center box-border ring-gray-300  bg-black/5">
            <Image
              className="   h-full w-auto mx-auto"
              src={product.file![0].path}
              alt={product.description}
            />
          </div>
          <div className="h-full flex grow flex-col col-span-8">
            <Text className="font-bold capitalize">{product.name}</Text>
            <div className=" text-gray-600 text-xs md:text-sm">
              <Text className="text-xs md:text-sm">{product.description}</Text>
            </div>
            <Space flex={3}/>
            <Group gap={0} justify="space-between grow w-full">
            <Text
              className="text-lg  md:mr-3"
              c={"primary.5"}
              p={2}
              lineClamp={1}
            >
              {reductionPrice({
                price: product.price!,
                reduction: product.reduction!,
              })}
            </Text>
            <div className="hidden  md:block">
              {product.reduction! > 0 && (
                <Text
                  fw={900}
                  className="text-xs md:text-base  mr-3 line-through decoration-slice text-gray-600"
                >
                  {product.price}
                  {import.meta.env.VITE_REACT_CURRENCY}
                </Text>
              )}
            </div>

            <Space flex={2} />
            <ProtectedAction action={toggle}>
              <ActionIcon
                p={4}
                variant="light"
               
                className="rounded-full size-6"
              >
                <div className="flex items-center">
                  <PlusIcon className="md:size-8  size-4" />
                </div>
              </ActionIcon>
            </ProtectedAction>
          </Group>
          </div>
        </Group>

      
      </Card>
    </>
  );
};

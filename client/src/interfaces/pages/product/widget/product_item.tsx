import { ProductDto } from "../../../../cores/models/product";
import {
  Card,
  Image,
  Group,
  Text,
  Avatar,
  Pill,
  Modal,
  Badge,
  Button,
} from "@mantine/core";

import classes from "../style/product_item.module.css";

import { PlateItemPoppup } from "./order_poppup";

import {
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useDisclosure } from "@mantine/hooks";
import { securityApi } from "../../../../cores/apis/security.slice";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";

export const ProductItem = ({ product }: { product: ProductDto }) => {
  const [opened, { toggle }] = useDisclosure();
  const profile=securityApi.useProfileQuery("");
  console.log(import.meta.env.CURRENCY);
  return (
    <>
    {opened&&  <Modal
        opened={opened}
        title={
          <div className="flex gap-2">
            <Avatar src={product.parent?.imagePath} />
            <div className="flex  flex-col gap-1 md:gap-2">
              {" "}
              <span  className="text-base md:text-lg">{product.name}</span>
              <span>{product.parent?.shortname}</span>
            </div>
          </div>
        }
        onClose={() => toggle()}
        size={"md"}
        h={{ base: "75vh" }}
      >
        {" "}
        <PlateItemPoppup open={opened} setOpen={toggle} product={product} />
      </Modal>}

      <Card withBorder radius="md"  className={clsx("bg-table flex bg-[#f5f8fc58]  flex-col duration-500  hover:shadow-lg")}>
       <Card.Section p={10}>
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
            <Pill radius={6}>{c.name}</Pill>
          ))}
        </div>
          
          </div>
        </Group>
       </Card.Section>
       <div className="grow bg-red-500 " />
        <Card.Section mb="sm" className="pt-2 px-2">
          <Group style={{backgroundImage:`url(${product.file![0].path})`, backgroundSize:'180%'}} className="w-full  rounded-md overflow-hidden">
            <div  className="h-[180px] content-center backdrop-blur-xl bg-black/10 w-full">
        <Image
            className=" bg-black/50 max-h-full w-auto mx-auto"
            src={product.file![0].path}
            alt={product.description}
          
          />
          </div>
          </Group>
        </Card.Section>
        <Card.Section className={' px-2 py-1'}>
          <Group justify="space-between">
           
            <Text  fw={900} className="text-2xl" c={"primary.5"} p={2} lineClamp={1}>
              {product.price} {import.meta.env.VITE_REACT_CURRENCY}
            </Text>
           
            <Group gap={0}>
              {/* <ActionIcon variant="subtle" color="gray">
                <HeartIcon
                  style={{ width: rem(20), height: rem(20) }}
                  color={theme.colors.red[6]}
                />
              </ActionIcon>
              <ActionIcon variant="subtle" color="gray">
                <BookmarkIcon
                  style={{ width: rem(20), height: rem(20) }}
                  color={theme.colors.yellow[6]}
                />
              </ActionIcon> */}
              <Button p={4} variant="filled" className="text-white" onClick={ ()=>profile.isSuccess?toggle():null} color="primary.5">
                <div className="flex items-center">
                <PlusCircleIcon className=" size-4" />
                <ShoppingCartIcon className="text-white size-8"   />

                </div>
              </Button>
            </Group>
          </Group>
        </Card.Section>
       
      </Card>
    </>
  );
};

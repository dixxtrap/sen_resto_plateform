import { useState } from "react";
import { ProductDto } from "../../../../cores/models/product";
import {
  Card,
  Image,
  ActionIcon,
  Group,
  Text,
  Avatar,
  useMantineTheme,
  rem,
  Pill,
  Modal,
  Space,
  Badge,
} from "@mantine/core";

import classes from "../style/product_item.module.css";

import { PlateItemPoppup } from "./order_poppup";

import { Str } from "../../../../cores/constantes/str";
import {
  ShoppingBagIcon,
  BookmarkIcon,
  HeartIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useDisclosure } from "@mantine/hooks";
import { securityApi } from "../../../../cores/apis/security.slice";
import { OrderPaymentType } from "../../order/widget/order_payment_type";

export const PlateItem = ({
  product,
  isLogin = true,
}: {
  product: ProductDto;
  isLogin: boolean;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  console.log(isLogin);
  return (
    <>
      <PlateItemPoppup open={open} setOpen={setOpen} product={product} />
      <div className="flex flex-col items-center mt-12 pt-4  bg-gray-100  rounded-lg   ring-1  ring-black/10">
        <img
          alt="logo"
          className="md:h-40  md:-mt-20 rounded-full h-32 -mt-16  ring-1 ring-gray-200"
          src={product.file![0].path}
        />
        <div className="flex flex-col w-full divide-y divide-gray-500/50 ">
          <div className="flex flex-col item-center justify-center text-center pb-3">
            <span className="title2 text-center leading-3 h-[60px]">
              {" "}
              {product.name}
            </span>
            <div className="flex gap-3 items-start justify-center ">
              {product.reduction != null && product.reduction > 0 && (
                <span className="title3 line-through  decoration-2 text-gray-500">
                  {" "}
                  {product.price}{" "}
                </span>
              )}
              <span className="title3  text-primary-500">
                {" "}
                {Math.fround(product.price! * (1 - product.reduction! / 100))} F
                CFA
              </span>
            </div>
            <span className=" text-gray-500 text-sm ">
              {" "}
              {product.parent?.shortname}
            </span>
          </div>
          <div className="grid grid-cols-2 rounded-b-lg  overflow-hidden w-full divide-x  divide-gray-500/50 ">
            <div className="flex gap-2 cursor-pointer  justify-center p-2 place-items-end  hover:bg-secondary-400 hover:text-white">
              <ShoppingBagIcon className="h-6" />{" "}
              <span className="leading-3">{Str.favoris}</span>
            </div>

            <div
              onClick={() => {
                isLogin && setOpen(true);
              }}
              className="flex  gap-2 cursor-pointer justify-center p-2  hover:bg-secondary-400 hover:text-white  place-items-end"
            >
              <span className="leading-3"> {Str.bag}</span>
              <ShoppingBagIcon className="h-6" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const ProductItem = ({ product }: { product: ProductDto }) => {
  const theme = useMantineTheme();
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
            <div className="flex  flex-col gap-2">
              {" "}
              <span>{product.name}</span>
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
            <Text fw={500}>{product.parent?.shortname}</Text>
            <Text fz="xs" c="dimmed">
              preparation {product.cookingTime}
            </Text>
          </div>
        </Group>
     
        <Group flex={2}  gap={1}>
          <div className="flex flex-col">
        <Text fw={700} className={classes.title} mt="xs">
          {product.name}
        </Text>
        <div className="flex gap-3">
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
        <Card.Section className={classes.footer+' px-2 py-1'}>
          <Group justify="space-between">
            <Pill size="lg" radius={6} className="bg-gray-500/20 text-black" variant="light">
            <Text  fw={900} p={2} lineClamp={1}>
              {product.price} {import.meta.env.VITE_REACT_CURRENCY}
            </Text>
            </Pill>
            <Group gap={0}>
              <ActionIcon variant="subtle" color="gray">
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
              </ActionIcon>
              <ActionIcon variant="subtle" onClick={ ()=>profile.isSuccess?toggle():null} color="gray">
                <ShoppingBagIcon style={{ width: rem(20), height: rem(20) }} />
              </ActionIcon>
            </Group>
          </Group>
        </Card.Section>
       
      </Card>
    </>
  );
};

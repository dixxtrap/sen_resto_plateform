import { useState } from "react";
import { ProductDto } from "../../../../cores/models/product";
import {
  Card,
  Image,
  ActionIcon,
  Group,
  Text,
  Avatar,
  Badge,
  useMantineTheme,
  rem,
  Pill,
} from '@mantine/core';

import classes from '../style/product_item.module.css';

import { PlateItemPoppup } from "./order_poppup";
import { ShoppingBagIcon, StarIcon } from "@heroicons/react/24/solid";
import { Str } from '../../../../cores/constantes/str';
import { BookmarkIcon, HeartIcon, ShareIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";


export const PlateItem = ({ product, isLogin=true}: { product: ProductDto ,isLogin:boolean}) => {
  const [open, setOpen] = useState<boolean>(false);
console.log(isLogin)
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
            <span className="title2 text-center leading-3 h-[60px]"> {product.name}</span>
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
            <StarIcon className="h-6" /> <span className="leading-3">{Str.favoris}</span>
          </div>

          <div onClick={()=>{isLogin&&setOpen(true)}} className="flex  gap-2 cursor-pointer justify-center p-2  hover:bg-secondary-400 hover:text-white  place-items-end">
           <span className="leading-3"> {Str.bag}</span>
            <ShoppingBagIcon className="h-6" />
          </div>
        </div>
        </div>
      
      </div>
    </>
  );
};



export const ProductItem=({ product}: { product: ProductDto })=> {
  const theme = useMantineTheme();

  return (
    <Card withBorder  radius="md" className={clsx(classes.card, 'bg-table') }>
          <Group >
        <Avatar
          src={product.parent?.imagePath}
          radius="sm"
        />
        <div>
          <Text fw={500}>{product.parent?.shortname}</Text>
          <Text fz="xs" c="dimmed">
            preparation {product.cookingTime}
          </Text>
        </div>
      </Group>
      <Card.Section mb="sm" className="p-2">
        <Image
        className="rounded-md"
          src={product.file![0].path}
          alt="Top 50 underrated plants for house decoration"
          h={180}
        />
      </Card.Section>
<Group  gap={1}>
     {product.category?.slice(0,2)?.map(c=> <Pill radius={6} >
        {c.name}
      </Pill>)}
      </Group>
      <Text fw={700} className={classes.title} mt="xs">
       {product.name}
      </Text>

  

      <Card.Section className={classes.footer}>
        <Group justify="space-between">
          <Text fz="xs" c="dimmed">
            733 people liked this
          </Text>
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
            <ActionIcon variant="subtle" color="gray">
              <ShareIcon
                style={{ width: rem(20), height: rem(20) }}
                color={theme.colors.blue[6]}
             
              />
            </ActionIcon>
          </Group>
        </Group>
      </Card.Section>
    </Card>
  );
}
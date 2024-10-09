import ShoppingCartIconFill from "@heroicons/react/24/solid/ShoppingCartIcon";
import ShoppingCartIcon from "@heroicons/react/24/outline/ShoppingCartIcon";
import { useGetBagQuery } from "../../../../cores/apis/order.slice";

import { Link, NavLink } from "react-router-dom";
import { Modal, Image, Indicator, UnstyledButton } from "@mantine/core";

import { useDisclosure } from "@mantine/hooks";
import { ReactNode, useState } from "react";
import clsx from "clsx";
export const BagIconMobile = () => {
  const [active, setActive] = useState<boolean>();
  return (
    <>
      <NavLink className={"h-0 hidden w-0"} to={"/company/details"}>
        {({ isActive }) => {
          setActive(isActive);
          return <div className="hidden"></div>;
        }}
      </NavLink>
      <BagIcon
        childreen={
          <div className={clsx("bottom_nav_item") }>
           <div className={clsx("bottom_nav_item_icon",{"active":active})}>
           {active ? (
              <ShoppingCartIconFill className="size-6" />
            ) : (
              <ShoppingCartIcon className="size-6" />
            )}
            </div>
          
            <span className="text-xs">Company</span>
          </div>
        }
      />
    </>
  );
};
export const BagIcon = ({
  childreen,
}: {
  isShort?: boolean;
  childreen?: ReactNode;
}) => {
  const { data, ...bagState } = useGetBagQuery();
  const [opened, { open, close }] = useDisclosure();
  return (
    <>
      <Modal
       title={<span className="font-serif text-lg font-bold">Commandes</span>}
      
        classNames={{ root: "  ",close:"bg-slate-800 rounded-full text-white", overlay: "backdrop-blur-md bg-slate-500/40" }}
        opened={opened}
        onClose={close}
      >
        <div className="flex flex-col gap-4 p-2">
          {bagState.isSuccess &&
            data?.data.map((e) => (
              <Link to={`/company/details/${e.partnerId}`} onClick={close}>
                <div className="grid grid-cols-12 gap-2">
                  <div className="col-span-4 md:col-span-3 h-20 ring-1 ring-slate-300 rounded-md content-center">
                    <Image
                      className="max-h-full w-auto mx-auto"
                      src={e.partner.backgroundPath}
                    />
                  </div>
                  <div className="col-span-8 gap-2 flex flex-col md:col-span-9">
                    <div className="flex flex-col">
                      <span>{e.partner.shortname}</span>
                      <span className="text-sm text-gray-500">
                        {e.partner.name}
                      </span>
                    </div>
                    <div>{e.details.createdAt}</div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </Modal>
      <Indicator
        inline
        offset={-0}
        size={18}
        color={"primary.5"}
        classNames={{ indicator: "bg-primary-500 text-3 font-bold p-1" }}
        label={data?.data.length}
      >
        {
          <UnstyledButton onClick={open} className="content-center">
            {childreen ?? (
              <ShoppingCartIconFill className="size-7 text-white bg-slate-900 p-1 mt-1 rounded-full" />
            )}
          </UnstyledButton>
        }
      </Indicator>
    </>
  );
};

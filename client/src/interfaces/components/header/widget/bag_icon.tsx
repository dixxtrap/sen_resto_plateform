import { ShoppingBagIcon, ShoppingCartIcon } from "@heroicons/react/24/solid";
import { useGetBagQuery } from "../../../../cores/apis/order.slice";

import { Link, NavLink } from "react-router-dom";
import { Button, Flex, Indicator,  UnstyledButton } from "@mantine/core";
import clsx from "clsx";
import {} from "@heroicons/react/24/outline";

export const BagIcon = ({ isShort = true }: { isShort?: boolean }) => {
  const { data } = useGetBagQuery("");

  return (
    <Indicator
      inline
      offset={-0}
      size={18}
      color={"primary.5"}
      classNames={{ indicator: "bg-primary-500 text-3 font-bold p-1" }}
      label={data?.data.length}
    >
      {isShort ?  <Button
          component={Link}
          to={"/order"}
          variant="transparent"
          p={0}
          radius={2}
          className=""
        >
          <ShoppingCartIcon className="size-7 text-white bg-slate-900  p-1 rounded-full" />
        </Button>
       : 
        <NavLink to={"/order"} onClick={close}>
          {({ isActive }) => (
            <UnstyledButton variant={isActive ? "filled" : "light"}>
              <Flex
                className={clsx("font-bold gap-3", {
                  "text-primary-500": isActive,
                })}
              >
                <ShoppingBagIcon className="size-6" />
                <span className="text-2xl">Mes commandes</span>
              </Flex>
            </UnstyledButton>
          )}
        </NavLink>
      }
    </Indicator>
  );
};

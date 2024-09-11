import {

  Button,
  Indicator,
  Flex,
  UnstyledButton,
} from "@mantine/core";
import { BellAlertIcon } from "@heroicons/react/24/solid";
import { clsx } from "clsx";
import { NavLink } from "react-router-dom";

export const NotificationIcon = ({ isShort = true }: { isShort?: boolean }) => {
  return (
    <Indicator
      inline
      offset={-0}
      size={18}
      color={"primary.5"}
      classNames={{ indicator: "bg-primary-500 text-3 font-bold p-1" }}
      label={0}
    >
      {isShort ? 
        <Button variant="transparent" p={0} value={`0`}>
          <BellAlertIcon className="size-7 text-white bg-slate-900 p-1 rounded-full" />
         
        </Button>
       : 
        <NavLink to={"/"} onClick={close}>
          {({ isActive }) => (
            <UnstyledButton variant={isActive ? "filled" : "light"}>
              <Flex
                className={clsx("font-bold gap-3", {
                  "text-primary-500": isActive,
                })}
              >
                <BellAlertIcon className="size-6" />
                <span className="text-2xl">Mes commandes</span>
              </Flex>
            </UnstyledButton>
          )}
        </NavLink>
      }
    </Indicator>
  );
};

import {
  ArrowRightCircleIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import {
  BellIcon,
  UserIcon,
  ChatBubbleBottomCenterIcon,
} from "@heroicons/react/24/solid";
import { Navigate } from "react-router-dom";
import { FC, useEffect } from "react";
import {
  useProfileQuery,
  useSignoutMutation,
} from "../../core/features/security.slice";
import { Alert } from "./alert_success";
import { ActionIcon, Menu, rem, Group, Indicator } from "@mantine/core";
import { ThemeToggler } from "./theme_toggler/theme_toggler";
import { multiSelectStyle } from "./form/custom_styles";
import ArrowRightStartOnRectangleIcon from "@heroicons/react/20/solid/ArrowRightStartOnRectangleIcon";
export const Header: FC<{
  open: () => void;
  close: () => void;
}> = ({ open }) => {
  const [
    signout,
    {
      isError: isDisconnecteError,
      isLoading: isDisconnecteLoading,
      isSuccess: isDisconnecteSuccess,
    },
  ] = useSignoutMutation();
  const { data: user, isSuccess, refetch, isError } = useProfileQuery("");
  // console.log(user);
  useEffect(() => {
    refetch();
  }, [refetch]);
  return (
    <>
      {isError && <Navigate to="/" />}
      <Alert isOpen={isDisconnecteLoading} type="loading" />
      <Alert isOpen={isDisconnecteError} type="faillure" />
      {isDisconnecteSuccess && <Navigate to={"/"} />}
      <div className="dark sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b  shadow-sm sm:gap-x-2  darkBg bg-white  darkDivider  px-3">
        {isSuccess && (
          <>

          <div className="flex items-center lg:ml-20 ">
          <ActionIcon
              size={40}
              color="primary.5"
              className="  lg:hidden"
              onClick={open}
            >
              <Bars3Icon className="h-6 w-6 " aria-hidden="true" />
            </ActionIcon>
          <div className="flex h-16 shrink-0  p-2  items-center sticky top-0 justify-center">
      {user?.parent && user.parent.imagePath && (
                <img
                alt=""
                className=" h-8 md:h-10  rounded-md backdrop-blur-lg"
                 src={`${user.parent.imagePath}`}
                />
              
              )}
              
        {/* <Logo className="bg-gradient-to-tr to-teal-500/20 backdrop-blur-sm from-indigo-500/20 h-14 w-14 p-1 rounded-md" /> */}
      </div>

          </div>
           
            {/* Separator */}
            <span className=" text-xl  text-left font-bold">
              {user?.parent?.parent?.id === 1|| user?.parent?.id === 1
                ? user.parent?.name
                : user?.parent?.parent?.name}
            </span>
            <div className="grow flex items-center gap-x-1"></div>
            <ThemeToggler />

            <Group className="gap-6 py-0.5 ring-1 ring-secondary-900/10 dark:ring-secondary-400/10 rounded-lg px-1 bg_card">
            
            <Indicator offset={0} size={16} label={"0"}>  <ActionIcon
                radius={10}
                type="button"
                color="secondary.5"
                variant="transparent"
                className=""
              >
            
                <ChatBubbleBottomCenterIcon
                  className="size-6 bg-slate-900 text-white p-0.5 rounded-full"
                  aria-hidden="true"
                />{" "}
                <span className="sr-only">View notifications</span>
              </ActionIcon>
              </Indicator>
              <Indicator offset={0} size={16} label={0}>
              <ActionIcon
                radius={10}
                type="button"
                variant="transparent"
                
                color="primary.5"
              >
                <BellIcon
                  className="size-6 bg-slate-900 text-white p-0.5 rounded-full"
                  
                />{" "}
                <span className="sr-only">View notifications</span>
               
              </ActionIcon>
              </Indicator>
              {/* Separator */}

              <Menu
                styles={multiSelectStyle}
                shadow="md"
                position="bottom-end"
                withArrow
              >
                <Menu.Target>
                  
                  <ActionIcon radius={10} variant="transparent" >
                    <UserIcon className="size-6 p-1 rounded-full text-white bg-slate-900" />
                  </ActionIcon>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Label>{user.email}</Menu.Label>

                  <Menu.Divider />

                  <Menu.Label>Danger zone</Menu.Label>
                  <Menu.Item
                    leftSection={
                      <ArrowRightCircleIcon
                        style={{ width: rem(14), height: rem(14) }}
                      />
                    }
                  >
                    Transfer my data
                  </Menu.Item>
                  <Menu.Item
                  
                    leftSection={
                      <ArrowRightStartOnRectangleIcon className="size-4 rounded-full" />
                    }
                    onClick={()=>signout("")}
                    >
                     Déconnexion
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>

              {/* Profile dropdown */}
            </Group>
          </>
        )}
      </div>
    </>
  );
};

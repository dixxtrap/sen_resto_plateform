import { Navigate } from "react-router-dom";
import { FC, useEffect } from "react";
import {
  useProfileQuery,
  useSignoutMutation,
} from "../../core/features/security.slice";
import { Alert } from "./alert_success";
import { ActionIcon, Menu, rem, Indicator, Burger , Image} from "@mantine/core";
import { ThemeToggler } from "./theme_toggler/theme_toggler";
import { multiSelectStyle } from "./form/custom_styles";
import logo from '../../assets/react.svg'
import {
  IconArrowAutofitDown,
  IconArrowRightToArc,
  IconBell,
  
  IconMessage,
  IconUser,
} from "@tabler/icons-react";
export const Header: FC<{
  toggle: () => void;
  opened:boolean
}> = ({ toggle , opened }) => {
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
      <div className="flex h-full shrink-0 items-center gap-x-4   shadow-sm sm:gap-x-2  bg-transparent   darkDivider  px-3">
        {isSuccess && (
          <>
            <div className="flex items-center  ">
              <Burger
                        opened={opened}
                        onClick={toggle}
                        hiddenFrom="md"
                        size="md"
                      />
              <div className="flex h-16 shrink-0  p-2  items-center sticky top-0 justify-center">
                
                  <Image
                    alt=""
                    className=" h-8 md:h-10  rounded-md backdrop-blur-lg"
                    src={`${user?.company?.imagePath!}`}
                    fallbackSrc={logo}
                  />
               

                {/* <Logo className="bg-gradient-to-tr to-teal-500/20 backdrop-blur-sm from-indigo-500/20 h-14 w-14 p-1 rounded-md" /> */}
              </div>
            </div>

            {/* Separator */}
            <span className="hidden md:inline-block md:text-xl  text-left font-bold">
              {user.company?.name?? import.meta.env.VITE_APP_NAME}
            </span>
            <div className="grow "></div>
            <ThemeToggler />

            <div className=" flex h-[38px] gap-3 px-2 rounded-lg pt-2 content-center items-center justify-center bg-slate-950">
              <Indicator
                p={0}
                m={0}
                offset={0}
                size={20}
                classNames={{ indicator: "text-center leading-3" }}
                label={"0"}
              >
                {" "}
                <ActionIcon
                  radius={10}
                  type="button"
                  color="primary"
                  variant="transparent"
                
                >
                  <IconMessage
                    className="size-8  text-white rounded-full"
                    aria-hidden="true"
                  />{" "}
                  <span className="sr-only">View notifications</span>
                </ActionIcon>
              </Indicator>
              <Indicator p={0} m={0} offset={0} size={20} label={0}>
                <ActionIcon
                  radius={10}
                  type="button"
                  variant="transparent"
                  color="transp"
                 
                >
                  <IconBell className="size-6  text-white  rounded-full" />{" "}
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
                  <Indicator p={0} m={0} offset={0} size={20} classNames={{indicator:"hidden"}}>

                    <ActionIcon color={"primary.6"} className="" radius={10} variant="transparent">
                      <IconUser className="size-6  rounded-full text-white " />
                    </ActionIcon>
                  </Indicator>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Label>{user.email}</Menu.Label>

                  <Menu.Divider />

                  <Menu.Label>Danger zone</Menu.Label>
                  <Menu.Item
                    leftSection={
                      <IconArrowAutofitDown
                        style={{ width: rem(14), height: rem(14) }}
                      />
                    }
                  >
                    Transfer my data
                  </Menu.Item>
                  <Menu.Item
                    leftSection={
                      <IconArrowRightToArc className="size-4 rounded-full" />
                    }
                    onClick={() => signout("")}
                  >
                    Déconnexion
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>

              {/* Profile dropdown */}
            </div>
          </>
        )}
      </div>
    </>
  );
};

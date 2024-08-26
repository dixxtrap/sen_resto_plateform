import {
  ArrowRightCircleIcon,
  Bars3Icon,
  TrashIcon,
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
import { ActionIcon, Text, Button, Menu, rem, Group, Burger } from "@mantine/core";
import { ThemeToggler } from "./theme_toggler/theme_toggler";
import { multiSelectStyle } from "./form/custom_styles";
export const Header: FC<{
  open: () => void;
  close: () => void;
}> = ({ open }) => {
  const [
    _,
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
      <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b  shadow-sm sm:gap-x-2  darkBg bg-white  darkDivider  px-3">
        {isSuccess && (
          <>
            <ActionIcon
              size={40}
              color="primary.5"
              className="lg:ml-20 "
              onClick={open}
            >
              <Bars3Icon className="h-6 w-6 " aria-hidden="true" />
            </ActionIcon>
            {/* Separator */}
            <span className=" text-xl  text-left font-bold">
              {user?.parent?.parent?.id === 1
                ? user.parent?.name
                : user?.parent?.id === 1
                ? user?.parent?.name
                : user?.parent?.parent?.name}
            </span>
            <div className="grow flex items-center gap-x-1"></div>
            <ThemeToggler />

            <Group className="gap-0.5 py-0.5 ring-1 ring-secondary-900/10 dark:ring-secondary-400/10 rounded-lg px-1 bg_card">
              <Button
                radius={10}
                type="button"
                color="secondary.5"
                variant="transparent"
                className="px-2"
              >
                <ChatBubbleBottomCenterIcon
                  className="size-6 bg-secondary-600 text-white p-0.5 rounded-full"
                  aria-hidden="true"
                />{" "}
                <span className="sr-only">View notifications</span>
                <Text className="font-bold ml-3 font-sans  leading-4">
                  0
                </Text>
              </Button>
              <Button
                radius={10}
                type="button"
                variant="transparent"
                className="px-2"
                color="secondary.5"
              >
                <BellIcon
                  className="size-6 bg-secondary-600 text-white p-0.5 rounded-full"
                  aria-hidden="true"
                />{" "}
                <span className="sr-only">View notifications</span>
                <Text className="font-bold ml-3 font-sans  leading-4">
                  0
                </Text>
              </Button>
              {/* Separator */}

              <Menu
                styles={multiSelectStyle}
                shadow="md"
                position="bottom-end"
                withArrow
              >
                <Menu.Target>
                  <Button radius={10} variant="transparent" className="px-1">
                    <UserIcon className="size-6 p-1 rounded-full text-white bg-secondary-600" />
                  </Button>
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
                    color="red"
                    leftSection={
                      <TrashIcon style={{ width: rem(14), height: rem(14) }} />
                    }
                  >
                    Delete my account
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

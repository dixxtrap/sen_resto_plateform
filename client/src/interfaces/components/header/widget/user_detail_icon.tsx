import {
  ArrowLongRightIcon,
  
  PhoneIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import {
  securityApi,
  useProfileQuery,
} from "../../../../cores/apis/security.slice";
import { BagIcon } from "./bag_icon";
import { NotificationIcon } from "./notification_icon";
import { LoginForm } from "../../login/login_form";
import { useDisclosure } from "@mantine/hooks";
import {

  Box,
  Burger,
  Button,
  Divider,
  Drawer,
  Flex,
  UnstyledButton,

  Menu,
  rem,
} from "@mantine/core";
import { constant, links } from "../../../../utils/constant";
import { Link, Navigate, NavLink } from "react-router-dom";
import logo from "/assets/react.svg";
import clsx from "clsx";
export const UserDetailsMobile = () => {
  const [opened, { close, open }] = useDisclosure(false);
  const profile = useProfileQuery("");
  return (
    <>
      {" "}
      <Drawer
        offset={0}
        closeButtonProps={{
          icon: <Burger opened={opened} onClick={close} />,
        }}
        className="top-10"
        position={"top"}
        classNames={{ content: "top-10" }}
        opened={opened}
        onClose={close}
        title={
          <Link to="/" className="flex  items-end justify-center">
            <img alt="logo" src={logo} className="h-10" />
            <span className="text-lg md:text-2xl font-bold font-serif ml-4  text-kprimary-500">
              {constant.app_name}
            </span>
          </Link>
        }
      >
        {/* Drawer content */}
        <Box className="flex  flex-col gap-5">
          {links.map((e) => (
            <NavLink to={e.route} onClick={close}>
              {({ isActive }) => (
                <UnstyledButton variant={isActive ? "filled" : "light"}>
                  <Flex
                    className={clsx("font-bold gap-3", {
                      "text-primary-500": isActive,
                    })}
                  >
                    <e.icon className="size-6" />
                    <span className="text-2xl">{e.name}</span>
                  </Flex>
                </UnstyledButton>
              )}
            </NavLink>
          ))}
          <Divider />

          {profile.isSuccess && (
            <>
              <BagIcon isShort={false} />
              <NotificationIcon isShort={false} />
            </>
          )}
        </Box>
      </Drawer>
      <Burger opened={opened} className="lg:hidden" onClick={open}></Burger>
    </>
  );
};
export const UserDetailIcon = () => {
  const { data: profile, ...profileState } = useProfileQuery("");
  const [logout, logoutStatus] = securityApi.useLogoutMutation();


  return (
    <div className=" lg:ml-4 flex  relative  items-center">
      {logoutStatus.isSuccess && <Navigate to="/" />}
      <UserDetailsMobile />
      {profileState.isSuccess && (
        <>
          <div className="hidden lg:flex relative  border-b-2  border-r-2 bg-white/60 backdrop-blur-xl items-strech  gap-8 p-2  rounded-lg py-1  ">
            <BagIcon />
            <NotificationIcon />
            <Menu
              shadow="md"
              offset={10}
              classNames={{
                label: "p-1 m-0 ",
                dropdown: " absolute z-[2000] backdrop-blur-sm",
              }}
              withArrow
              position="bottom-end"
              width={200}
            >
              <Menu.Target>
                <UnstyledButton className="content-center">
                  <UserIcon className="size-7 text-white bg-slate-900 p-1 rounded-full" />
                </UnstyledButton>
              </Menu.Target>

              <Menu.Dropdown onScroll={undefined}>
                <Menu.Label>Application</Menu.Label>
                <Menu.Item
                  leftSection={
                    <UserIcon style={{ width: rem(14), height: rem(14) }} />
                  }
                >
                  {` ${profile?.data.firstname} ${profile?.data.lastname}`}
                </Menu.Item>

                <Menu.Item
                  leftSection={
                    <PhoneIcon style={{ width: rem(14), height: rem(14) }} />
                  }
                >
                  {profile?.data.phone}
                </Menu.Item>

                <Menu.Divider />

                <Menu.Label>Danger zone</Menu.Label>

                <Menu.Item
                  onClick={() => logout()}
                  color="red"
                  leftSection={
                    <ArrowLongRightIcon
                      style={{ width: rem(14), height: rem(14) }}
                    />
                  }
                >
                  Deconnexion
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </div>
        </>
      )}
  
      { (
    profileState.isSuccess==false&&
          <LoginForm
            component={
              <Button radius={30}>
                Connexion
              </Button>
            }
            close={close}
            action={() => close()}
          />
       
      )}
    </div>
  );
};

import {
  UserIcon,
} from "@heroicons/react/24/solid";
import { useProfileQuery } from "../../../../cores/apis/security.slice";
import { BagIcon } from "./bag_icon";
import { NotificationIcon } from "./notification_icon";
import { DialogAlert } from "../../dialog";
import { LoginForm } from "../../login/login_form";
import { useDisclosure } from "@mantine/hooks";
import { ActionIcon, Box, Burger, Button, Divider, Drawer, Flex, UnstyledButton } from "@mantine/core";
import { constant, links } from '../../../../utils/constant';
import {Link, NavLink } from "react-router-dom";
import logo from "/assets/react.svg";
import clsx from "clsx";
export const UserDetailsMobile=()=>{
  const [opened, { close, open }] = useDisclosure(false);
  const profile=useProfileQuery("")
  return (
    <> <Drawer offset={0}  closeButtonProps={{
      icon: <Burger opened={opened}  onClick={close} />,
    }} className="top-10"  position={'top'} classNames={{content:"top-10"}} opened={opened} onClose={close} title={  <Link to="/" className="flex  items-end justify-center">
      <img alt="logo" src={logo} className="h-10" />
      <span className="text-lg md:text-2xl font-bold font-serif ml-4  text-kprimary-500">
        {constant.app_name}
      </span>
    </Link>}>
    {/* Drawer content */}
    <Box className="flex  flex-col gap-5">
      {links.map(e=><NavLink to={e.route}  onClick={close}>
        {({isActive})=><UnstyledButton  variant={isActive?"filled":"light"} >
                        <Flex className={clsx("font-bold gap-3", {"text-primary-500":isActive})}>
                        <e.icon  className="size-6"/>
                        <span className="text-2xl">{e.name}</span>
                        </Flex>
                      </UnstyledButton>}
      </NavLink>)}
      <Divider/>
      <BagIcon isShort={false}/>
      <NotificationIcon isShort={false}/>
      {profile.isSuccess&&<>
      </>}
    </Box>
  </Drawer>

  <Burger opened={opened} className="lg:hidden" onClick={open}></Burger>
  </>)
}
export const UserDetailIcon = () => {
  const {  isSuccess, isError } = useProfileQuery("");
  const [opened, { close, open }] = useDisclosure(false);
 
  return (
    <div className=" lg:ml-4 flex    items-center">
       <UserDetailsMobile/>
      {isSuccess && (<>
       
        <div className="hidden lg:flex  gap-8 bg-slate-200 p-2 rounded-lg py-1  ">
          <BagIcon />
           <NotificationIcon />
          <Button onClick={open}   p={0}   variant="transparent" >
            <UserIcon  className='size-7 text-white bg-slate-900 p-1 rounded-full' />
          </Button>{" "}
        </div>
         </>
      )}
      {isError && (
        <>
          {" "}
          <ActionIcon onClick={open}    variant="outline"
    size={"lg"}>
            <UserIcon />
          </ActionIcon>{" "}
          <DialogAlert onClose={() => close()} isOpen={opened}>
            <LoginForm close={close} action={() => close()} />
          </DialogAlert>
        </>
      )}

   
    </div>
  );
};

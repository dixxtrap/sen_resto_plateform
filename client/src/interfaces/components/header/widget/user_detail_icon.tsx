import {
  UserIcon,
} from "@heroicons/react/24/solid";
import { useProfileQuery } from "../../../../cores/apis/security.slice";
import { BagIcon } from "./bag_icon";
import { NotificationIcon } from "./notification_icon";
import { DialogAlert } from "../../dialog";
import { LoginForm } from "../../login/login_form";
import { useDisclosure } from "@mantine/hooks";
import { ActionIcon, Box, Burger, Button, Drawer, List, ListItem, UnstyledButton } from "@mantine/core";
import { links } from '../../../../utils/constant';
import {Link } from "react-router-dom";

export const UserDetailsMobile=()=>{
  const [opened, { close, open }] = useDisclosure(false);
  return (
    <> <Drawer offset={8} radius="md" position="top" opened={opened} onClose={close} title="Authentication">
    {/* Drawer content */}
    <Box className="flex  flex-col">
      {links.map(e=><UnstyledButton className="h-10"   component={Link} to={e.route}>{e.name}</UnstyledButton>)}
    </Box>
  </Drawer>

  <Burger opened={opened} onClick={open}></Burger>
  </>)
}
export const UserDetailIcon = () => {
  const {  isSuccess, isError } = useProfileQuery("");
  const [opened, { close, open }] = useDisclosure(false);
 
  return (
    <div className=" lg:ml-4 flex   items-center">
      {isSuccess && (<>
        <UserDetailsMobile/>
        <div className="hidden lg:flex gap-3 bg-slate-200 p-2 rounded-lg py-1  ">
          <BagIcon /> <NotificationIcon />
          <Button onClick={open}   p={0}   variant="transparent" >
            <UserIcon  className='size-7 text-white bg-secondary-500 p-0.5 rounded-full' />
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

      {/* <Popover className="relative">
      <PopoverButton className="inline-flex items-center gap-x-1  mt-2 md:mt-0 text-sm font-semibold leading-6 text-gray-900">
<HeaderIcon onclick={_onclick} icon={<UserIcon className="h-8" />}/>
       
        <span>{`${profile?.data.firstname} ${profile?.data.lastname}`}</span>
        <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
      </PopoverButton>

      <Transition
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <PopoverPanel className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
          <div className="w-[300px] shrink rounded-xl bg-white p-4 text-sm  md:text-lg font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5">
            {(isError?unlockListMenu: listMenu).map((item) => (
              <Link key={item.name}  to={item.route!} className="flex items-center p-2 hover:text-secondary-400">
              {item.icon}  {item.name}
              </Link> 
            ))}
          </div>
        </PopoverPanel>
      </Transition>
    </Popover> */}
      {/* Profile dropdown */}
    </div>
  );
};

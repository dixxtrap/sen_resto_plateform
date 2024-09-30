import { FC, ReactNode, useEffect } from "react";
import {
  securityApi,
  useProfileQuery,
} from "../../../cores/apis/security.slice";
import { Logo } from "../logo";
import { Signup } from "./signup";
import { useForm } from "@mantine/form";
import { Button, Modal, NumberInput, UnstyledButton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { PinVerification } from "./pin_verification";
import { CustomForm } from "../custom_form";
type ProtectedActionProps = {
  action: () => void;
  children: ReactNode;
};
export const ProtectedAction: FC<ProtectedActionProps> = ({
  children,
  action,
}) => {


  return (
    <div>
      {/* {IsLoginLoading && <Alert isOpen={true} type='loading'/>} */}



      <LoginForm
        component={children}
        close={close}
        action={() => {
          action();
          close();
        }}
      />


    </div>
  );
};

type LoginFormProps = {
  action: () => void;
  close: () => void;
  component: ReactNode;
};
export const LoginForm: FC<LoginFormProps> = ({ action, component }) => {
  const profile = useProfileQuery('')
  const [login, loginState] = securityApi.useSendOtpMutation();
  const [opened, { close, open }] = useDisclosure(false);
  const form = useForm<{ username: string; password: string }>({});
  const _onSubmit = form.onSubmit((data) => {
    login("221" + data.username).unwrap().then(result => {
      console.log(result)
    }).catch(err => {
      console.log(err)
    })
  });


  return (<>
    <UnstyledButton onClick={profile.isSuccess ? action : open}>
      {component}
    </UnstyledButton>
    <Modal opened={opened} onClose={close} withCloseButton={false}>
      {loginState.isSuccess ? (

        <>
          <PinVerification onSucess={() => { close(); action() }} phone={form.getValues().username} />
        </>
      ) : loginState.isError ? (<Signup phone={form.getValues().username} action={function (): void {

      }} onclose={close} />) : (
        <CustomForm
          successPath="."
          {...loginState}
          btnClassName="hidden"
          onSubmit={_onSubmit}

        >
          <div className="flex  flex-col items-center gap-3">


            
              <Logo />
             

            <span className="font-bold  title text-2xl">
              {import.meta.env.VITE_APP_NAME}
            </span>

            <NumberInput
              placeholder="Telephone"
              rightSection={<div></div>}
              {...form.getInputProps("username")}
              prefix="221 "
              radius={10}
              className="rounded-md"
              w={"100%"}
            />
          </div>
          <Button w={"100%"} type="submit" radius={100} mt={10} color={"primary.5"}>Se Connecter</Button>
        </CustomForm>
      )}
    </Modal>
  </>);
};

import { Logo } from "../logo";
import { TextConstant } from "../../../cores/constant/textConstant";
import { FC, } from "react";
import { securityApi } from "../../../cores/apis/security.slice";
import { Customer } from "../../../cores/models/customer";
import { useForm } from "@mantine/form";
import { NumberInput, Text, TextInput } from "@mantine/core";
import { PhoneIcon } from "@heroicons/react/24/outline";
import { CustomForm } from "../custom_form";
import { PinVerification } from "./pin_verification";
import { AddressForm } from "../form/address_form";

type SetProfileFormProps = {
  action: () => void;
  onclose: () => void;
  phone: string;
};
export const Signup: FC<SetProfileFormProps> = ({ phone, action }) => {
  const [signup, signupState] = securityApi.useSignupMutation();
 
  const form = useForm<Customer>({ initialValues: { phone,location:{latitude:0, longitude:0} } });
 
  const _onSubmit = form.onSubmit(async (data) => {
    signup({
      ...data,
      phone: `221${data.phone}`,
     
    } as Customer)
      .unwrap()
      .then((result: any) => {
        console.log(result);
        action();
      });
  });

  return (
    <>
      {signupState.isSuccess ? (
        <PinVerification
          onSucess={() => {
            action();
            close();
            
          }}
          phone={form.getValues().phone!}
        />
      ) : (
        <CustomForm successPath="." onSubmit={_onSubmit}>
          <Logo className="size-20 mx-auto" />
          <Text className="font-bold text-center">Inscription</Text>
          <NumberInput
            prefix="221 "
            rightSection={<PhoneIcon className="size-4" />}
            label={TextConstant.phone}
            {...form.getInputProps("phone")}
            w={"100%"}
          />
          <TextInput
            label={TextConstant.displayname}
            {...form.getInputProps("displayname")}
            key={form.key("displayname")}
            error={form.errors['displayname']}
            w={"100%"}
          />

          <AddressForm form={form} />
        </CustomForm>
      )}
    </>
  );
};

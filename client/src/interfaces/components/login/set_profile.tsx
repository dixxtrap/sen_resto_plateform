import { Logo } from "../logo";
import { TextConstant } from "../../../cores/constant/textConstant";
import { FC, useState } from "react";
import { useUpdateProfileMutation } from "../../../cores/apis/security.slice";
import { Customer } from "../../../cores/models/customer";
import { useForm } from "@mantine/form";
import { Button, NumberInput, Select, Text, TextInput } from "@mantine/core";
import { PhoneIcon } from "@heroicons/react/24/outline";
import { baseApi } from "../../../cores/apis/api";
type SetProfileFormProps = {
  action: () => void;
  onclose: () => void;
  phone: string;
};
export const SetProfileForm: FC<SetProfileFormProps> = ({ phone, action }) => {
  const [update] = useUpdateProfileMutation();
  const city=baseApi.useCityQuery()
  const [position, setPosition] = useState<{
    latitude: number;
    longitude: number;
  }>();
  const form = useForm<{
    firstname?: string;
    phone?: string;
    lastname?: string;
    citryId?: string;
  }>({ initialValues: { phone } });
  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (positionResult) => {
          setPosition({
            latitude: positionResult.coords.latitude,
            longitude: positionResult.coords.longitude,
          });
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  const _onSubmit = form.onSubmit(async (data) => {
    update({
      ...data,
      coordonates: {
        latitude: position?.latitude,
        longitude: position?.longitude,
      },
    } as Customer)
      .unwrap()
      .then((result) => {
        console.log(result);
        action();
      });
  });

  return (
    <form onSubmit={_onSubmit} className="flex items-center gap-3 flex-col ">
      <Logo />
      <Text className="font-bold">Inscription</Text>
      <NumberInput
        prefix="221 "
        rightSection={<PhoneIcon className="size-4" />}
        label={TextConstant.phone}
        {...form.getInputProps("phone")}
        w={"100%"}
      />
      <TextInput
        label={TextConstant.firstname}
        {...form.getInputProps("firstname")}
        w={"100%"}
      />
      <TextInput
        label={TextConstant.lastname}
        {...form.getInputProps("lastname")}
        w={"100%"}
      />
     
     <Select label={TextConstant.city}         {...form.getInputProps("cityId")}  w={"100%"} searchable data={city.data?.data.map(e=>({value:`${e.id}`, label:`${e.parent?.parent?.parent?.name} - ${e.parent?.parent?.name} - ${e.parent?.name} - ${e?.name}`}))}/>
     
    
      <Button w={"100%"} radius={100} mt={10} className=" bg-primary-500">
        Valider
      </Button>
    </form>
  );
};

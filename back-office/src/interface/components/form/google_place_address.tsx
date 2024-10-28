import { Checkbox, TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import {
  setKey,
  // setDefaults,
  // setLanguage,
  // setRegion,
  // fromAddress,
  fromLatLng,
  fromPlaceId,
  // setLocationType,
  // geocode,
  // RequestType,
} from "react-geocode";
export const PlaceAddressForm = ({
  form,
  isUpdatable,
}: {
  form: UseFormReturnType<any, any>;
  isUpdatable?: boolean;
}) => {
  setKey(import.meta.env.VITE_GOOGLE_KEY);
  const [useMyPosition, setUseMyPosition] = useState<boolean>(false);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      fromLatLng(
        position.coords.latitude,
        position.coords.longitude,
        import.meta.env.VITE_GOOGLE_KEY,
        "",
        "",
        "APPROXIMATE"
      ).then((pred) => {
        const address: any = (pred.results as []).find(
          (e: any) => e.geometry.location_type === "APPROXIMATE"
        );
        form.setValues({ address: address.formatted_address });
        form.setFieldValue("location.latitude", position.coords.latitude);
        form.setFieldValue("location.longitude", position.coords.longitude);
        console.log(
          "=====================prediction====================",
          address.formatted_address
        );
      });
    });
  };

  const [update, setUpdate] = useState(false);
  return (
    <>
      {/* <Checkbox  onChange={getLocation}></Checkbox> */}

      <Checkbox
        checked={useMyPosition}
        variant="filled"
        c={"secondary"}
        color="secondary"
        pb={4}
        label="utiliser mon adresse actuelle"
        classNames={{ label: "text-slate-900 dark:text-slate-50" }}
        onChange={(event) => {
          setUseMyPosition(event.currentTarget.checked);
          if (event.currentTarget.checked == true) getLocation();
          else form.setFieldValue("address", "");
        }}
      />
      {useMyPosition ? (
        <TextInput readOnly value={form.getValues().address} />
      ) : (
        <GooglePlacesAutocomplete 
          apiKey={import.meta.env.VITE_GOOGLE_KEY}
          selectProps={{
            // value:form.getValues().address,
            // onInputChange: (newValue) => {
            //   // setAddress( newValue!);
            //   on
            // },
            // inputValue:address,
          
            onChange: (newValue, actionMeta) => {
              form.setFieldValue("address", newValue!.label);

              console.log(newValue), console.log(actionMeta);
              fromPlaceId(
                newValue?.value.place_id,
                import.meta.env.VITE_GOOGLE_KEY
              )
                .then(({ results }) => {
                  const { lat, lng } = results[0].geometry.location;
                  console.log(lat, lng);

                  form.setFieldValue("location.latitude", lat);
                  form.setFieldValue("location.longitude", lng);
                })
                .catch(console.error);
            },
            className: "bg-transparent   p-0 ring-0 ring-none",
            classNames: {valueContainer:()=>' bgInput ring-none  ring-gray-500/50 ' ,
              container: () => "bg-red-500  rounded-md ring-none ring-gray-500/50  ",
              input: () => "bg-red-500/0 text-white ml-5",placeholder:({})=>"bgInput",indicatorsContainer:()=>"text-white",
              dropdownIndicator: ({}) => "z-[2300] ",option:({})=>" bgInput hover:bg-primary-500",
              menuList: ({}) =>
                "z-[10000] bgInput hover:bg-red-500 h-[150px] ring-1 relative overflow-y-scroll",
            },
          }}
          apiOptions={{ region: "sn",  }}
        />
      )}

      {isUpdatable && (
        <Checkbox
          checked={update}
          variant="filled"
          iconColor="secondary.6"
          label="Changer l address"
          onChange={(event) => setUpdate(event.currentTarget.checked)}
        />
      )}
    </>
  );
};

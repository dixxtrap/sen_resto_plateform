import {
  
  Checkbox,
  Textarea,
  TextInput,

} from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import {  useEffect, useState } from "react";
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
const loadGoogleMapsScript = (apiKey: string) => {
  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
  script.async = false;
  document.body.appendChild(script);
};
export const AddressForm = ({
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
        "",
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
useEffect(() => {
  loadGoogleMapsScript(import.meta.env.VITE_GOOGLE_KEY)
}, [])

  const [update, setUpdate] = useState(false);
  return (
    <>
      {/* <Checkbox  onChange={getLocation}></Checkbox> */}
      <Checkbox
        checked={useMyPosition}
        variant="filled"
        c={"secondary"} color="secondary" pb={4}
        label="utiliser mon adresse actuelle"
        classNames={{label:"text-slate-900"}}
        onChange={(event) => {
          setUseMyPosition(event.currentTarget.checked);
          if (event.currentTarget.checked == true) getLocation();
          else form.setFieldValue("address", "");
        }}
      />
     { useMyPosition?<TextInput readOnly value={form.getValues().address}/>:<GooglePlacesAutocomplete
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
          classNames: {
            dropdownIndicator: ({}) => "z-[2300] ",
            menuList: ({}) => "z-[2300]  h-[150px] relative overflow-y-scroll",
          },
        }}
        apiOptions={{ region: "sn" }}
      />}

      <Textarea
        className="h-max relative "
        label={"Details de la Commande"}
        h={140}
        classNames={{
          section: "h-full h-max scroll-y-none",
          input: "h-max h-[120px]",
        }}
        {...form.getInputProps("description")}
        resize={"vertical"}
      />

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

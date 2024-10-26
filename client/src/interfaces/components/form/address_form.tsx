import { Checkbox, Textarea } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { useEffect, useState } from "react";
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
export const AddressForm = ({
  form,
  isUpdatable,
}: {
  form: UseFormReturnType<any, any>;
  isUpdatable?: boolean;
}) => {
  setKey(import.meta.env.VITE_GOOGLE_KEY);
  const getLocation=()=>{
    navigator.geolocation.getCurrentPosition((position)=>{fromLatLng(position.coords.latitude, position.coords.longitude, "", "","", "APPROXIMATE").then(pred=>{
      const address:any=(pred.results as []).find((e: any)=>e.geometry.location_type==="APPROXIMATE");
form.setFieldValue("address", address.formatted_address);
      console.log("=====================prediction====================",address.formatted_address)
    })})
  }
  useEffect(() => {
  getLocation()
  }, [])
  
  const [update, setUpdate] = useState(false);
  return (
    <>
     <div className="text-sm">address</div>
     <GooglePlacesAutocomplete 
        apiKey={import.meta.env.VITE_GOOGLE_KEY} 

        selectProps={{defaultInputValue:form.getValues().address,
          onChange: (newValue, actionMeta) => {
            form.setFieldValue("address",newValue!.label)
            console.log(newValue), console.log(actionMeta);
            fromPlaceId(newValue?.value.place_id, import.meta.env.VITE_GOOGLE_KEY)
              .then(({ results }) => {
                const { lat, lng } = results[0].geometry.location;
                console.log(lat, lng);

                form.setFieldValue("location.latitude",lat);
                form.setFieldValue("location.longitude",lng);
              })
              .catch(console.error);
          },classNames:{dropdownIndicator:({})=>'z-[2300] ', menuList:({})=>'z-[2300]  h-[150px] relative overflow-y-scroll'}
        }}
        apiOptions={{ region: "sn" ,}}
      />
      <Textarea className="h-max relative "
        label={"Details de la Commande"} h={140} classNames={{section:'h-full h-max scroll-y-none', input:'h-max h-[120px]'}}
        {...form.getInputProps("description")} resize={"vertical"}
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

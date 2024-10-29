
import { useLoadScript, MarkerF, GoogleMap } from "@react-google-maps/api";
import { baseApi } from "../../../cores/apis/api";
import { useEffect, useState } from "react";
import { CompanyDto } from "../../../cores/models/company.dto";
import img from "../../../../assets/svg/restoMap.svg"
import { useNavigate } from "react-router-dom";
const containerStyle = {
  width: "fit",
  height: "100vh",
};

const center = {
  lat: 14.757556,
  lng: -17.390524,
};

// const destination = {
//   lat: 14.757556,
//   lng: -17.390524,
// };
export const MapView = () => {
  const nav = useNavigate();

  const { data:ets, ...estState} = baseApi.useGetEtsCompanyQuery("");
const [restos, setResto]=useState<CompanyDto[]>([]);
useEffect(() => {
  
  if(estState.isSuccess){
    const r:Array<CompanyDto> =[];
    ets?.data.forEach((e)=>{
e.company.forEach(c=>{r.push(c); if(c.children?.length!>=0){c.children?.forEach(ch=>{
  r.push({...ch, name:c.name, shortname:c.shortname,parentId:c.id, isCHild:true})
})}})
    })
    setResto(r);
  }
}, [estState])

  const loadScript = useLoadScript({
    googleMapsApiKey: "AIzaSyAkkKGmA3OpeRzTdTzy_o48pp1MlK2hiZ4",
  });
  return (
  <>
  {
  loadScript.isLoaded && (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15.18}
        clickableIcons={true}
      >
        {/* Marker */}
        {restos?.map((e) => (
          <MarkerF
            key={`key_${e.name}`}
            position={{
              lat: Number(e.location?.latitude!) ?? 17,
              lng: Number(e.location?.longitude!) ?? 14,
            }}
            icon={img}
            label={e.name}
            onClick={() => {
              nav(`/company/details/${e.isCHild==true?e.parentId:e.id}`);
            }}
          />
        ))}
        
        {/* <MarkerF position={destination} icon={plateMapImg} /> */}
        <MarkerF position={center} />

        {/* Directions */}
        {/* <DirectionsService
      options={{
        destination: destination,
        origin: center,

        travelMode: TravelMode.DRIVING,
      }}
      callback={(response: any) => {
        if (response !== null) {
          return <DirectionsRenderer directions={response} />;
        }
      }}
    /> */}
      </GoogleMap>
    )}
  </>
  );
}

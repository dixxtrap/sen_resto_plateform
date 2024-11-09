import { useLoadScript, MarkerF, GoogleMap } from "@react-google-maps/api";
import { baseApi } from "../../../cores/apis/api";
import { useEffect, useState } from "react";
import { CompanyDto } from "../../../cores/models/company.dto";
import { useNavigate } from "react-router-dom";
import { CoordonatesDto } from "../../../cores/models/coordonates.dto";
const containerStyle = {
  width: "fit",
  height: "calc(100vh - 180px)",
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

  const { data: ets, ...estState } = baseApi.useGetEtsCompanyQuery("");
  console.log(ets)
  const [restos, setResto] = useState<CompanyDto[]>([]);
  useEffect(() => {
    if (estState.isSuccess) {
      const r: Array<{id:number, location:CoordonatesDto,name:string}> = [];
      ets?.data.forEach((e) => {
        e.company.forEach((c) => {
          r.push({
            location:c.location!,
             name: c.shortname!,
             id: c.id!,
           
           });
          if (c.shop?.length! >= 0) {
            c.shop?.forEach((shop) => {
              r.push({
               location:shop.location!,
                name: shop.name!,
                
                id: c.id!,
              
              });
            });
          }
        });
      });
      setResto(r);
    }
  }, [estState.isSuccess]);

  const loadScript = useLoadScript({
    googleMapsApiKey: "AIzaSyAkkKGmA3OpeRzTdTzy_o48pp1MlK2hiZ4",
  });
  return (
    <div className="relative ring top-0 h-[100%]:">
      {loadScript.isLoaded && (
        <GoogleMap
        mapContainerClassName="sticky top-0"
          mapContainerStyle={containerStyle}
          center={center}
          zoom={13.18}
          clickableIcons={true}
        >
          {/* Marker */}
          {restos?.map((e, i) => (
            <MarkerF
              key={`key_${e.name}_${i}`}
              position={{
                lat: Number(e.location?.latitude!) ?? 17,
                lng: Number(e.location?.longitude!) ?? 14,
              }}
              label={{
                text: `${e.name!}`,
                className:
                  "text-sm rounded-full text-[white!important] font-semi-bold font-serif -mt-10 px-3  bg-secondary-500",
              }}
              title={e.name}
              onClick={() => {
                nav(
                  `/company/details/${e.id}`
                );
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
    </div>
  );
};

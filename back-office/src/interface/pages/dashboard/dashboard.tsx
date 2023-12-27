import React, { useEffect } from "react";
import {
  useLoadScript,
  MarkerF,
  GoogleMap,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import img from "../../../assets/svg/restoMap.svg";
import plateMapImg from "../../../assets/svg/plateMap.svg";
import { useGetResttaurantQuery } from "../../../core/features/restaurant.slice";
import { Navigate, useNavigate } from "react-router-dom";
import { BanknotesIcon, CakeIcon, UserIcon, WalletIcon } from "@heroicons/react/24/outline";
const containerStyle = {
  width: "fit",
  height: "100vh",
};

const center = {
  lat: 14.7394,
  lng: -17.506737,
};

const destination = {
  lat: 14.757556,
  lng: -17.390524,
};
enum TravelMode {
  BICYCLING = "BICYCLING",
  DRIVING = "DRIVING",
  TRANSIT = "TRANSIT",
  TWO_WHEELER = "TWO_WHEELER",
  WALKING = "WALKING",
}
export const GoogleMapComponent: React.FC = () => {
  const nav = useNavigate();
  const { data: restos = [] } = useGetResttaurantQuery("");
  const loadScript = useLoadScript({
    googleMapsApiKey: "AIzaSyBvAWNwnWriL2711NBIetCY0y54WzVNeMA",
  });
  useEffect(() => {}, []);

  return (
    <>
    <div className="  grid grid-cols-4 h-24  gap-4 pb-5">
    {  [
      {number:12005600, label:"Solde",  color:"card0",icon: <UserIcon className="h-full"/>},

    {number:16870, label:"Commandes", color:"card1", icon:<WalletIcon  className="h-full"/> },
    {number:150, label:"Produits",  color:"card2",  icon:<CakeIcon  className="h-full"/> },
      {number:2768, label:"Transactions",  color:"card3",  icon:<BanknotesIcon  className="h-full"/> },
  
].map((item, index)=><div className={` card `}>
     <div className={`h-12 ${item.color}`}>
     {item.icon!}
     </div>
    <div className="flex flex-col items-start  grow">
    <span className="text-lg font-semibold">{item.label}</span>
      <span className="text-2xl font-bold">{item.number}</span>
    </div>
    </div>)}
    </div>
    <div className="h-fit max-h-[800px] rounded-md overflow-hidden">
      {loadScript.isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={13.5}
        >
          {/* Marker */}
          {restos.map((e) => (
            <MarkerF
              key={`key_${e.id}`}
              position={{ lat: e.laltitude!, lng: e.longitude! }}
              icon={img}
              // label={<span style={{fontWeight:"bold"}}> {e.name}</span>}
              
              onClick={() => {
                nav(`/restaurant/details/${e.id}`);
              }}
            />
          ))}
          <MarkerF position={destination} icon={plateMapImg} />
          <MarkerF position={center} />

          {/* Directions */}
          <DirectionsService
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
          />
        </GoogleMap>
      ) : (
        <div>Loading</div>
      )}
    </div>
    </>
  );
};

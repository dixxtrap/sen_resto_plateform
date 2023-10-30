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
const containerStyle = {
  width: "100%",
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
              label={<span style={{fontWeight:"bold"}}> {e.name}</span>}
              
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
  );
};

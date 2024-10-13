import React, { useEffect } from "react";
import { useLoadScript, MarkerF, GoogleMap } from "@react-google-maps/api";
import img from "../../../assets/svg/restoMap.svg";
import plateMapImg from "../../../assets/svg/plateMap.svg";
import { useGetResttaurantQuery } from "../../../core/features/restaurant.slice";
import { useNavigate } from "react-router-dom";
import {
  BanknotesIcon,
  CakeIcon,
  QueueListIcon,
  WalletIcon,
} from "@heroicons/react/24/outline";
import { useGetCompanyQuery } from "../../../core/features/company.slice";
import { TransactionChart } from "./widget/transaction/transaction_chart";
const containerStyle = {
  width: "fit",
  height: "100vh",
};

const center = {
  lat: 14.757556,
  lng: -17.390524,
};

const destination = {
  lat: 14.757556,
  lng: -17.390524,
};
// enum TravelMode {
//   BICYCLING = "BICYCLING",
//   DRIVING = "DRIVING",
//   TRANSIT = "TRANSIT",
//   TWO_WHEELER = "TWO_WHEELER",
//   WALKING = "WALKING",
// }
export const GoogleMapComponent: React.FC = () => {
  const nav = useNavigate();
  const key = import.meta.env.VITE_MY_VARIABLE;
  const { data: restos } = useGetResttaurantQuery("");
  const { data: company } = useGetCompanyQuery("");
  const loadScript = useLoadScript({
    googleMapsApiKey: "AIzaSyAkkKGmA3OpeRzTdTzy_o48pp1MlK2hiZ4",
  });
  console.log(restos);
  console.log(key);
  useEffect(() => {}, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 h-[400] gap-4  ">
        <div className="  grid   grid-cols-2    gap-4 ">
          {[
            {
              number: 12005600,
              label: "Solde",
              color: "card0",
              icon: <BanknotesIcon className="h-full" />,
            },

            {
              number: 16870,
              label: "Commandes",
              color: "card1",
              icon: <WalletIcon className="h-full" />,
            },
            {
              number: 150,
              label: "Produits",
              color: "card2",
              icon: <CakeIcon className="h-full" />,
            },
            {
              number: 2768,
              label: "Transactions",
              color: "card3",
              icon: <QueueListIcon className="h-full" />,
            },
          ].map((item) => (
            <div
              className={`   flex-col  px-3 justify-center gap-2 lg:gap-7 flex rounded-md bgInput ring-1 ring-gray-400/30 h-full  `}
            >
              <div className="flex gap-2   items-end   ">
                <div className={`h-12  ${item.color}`}>{item.icon!}</div>
                <span className="text-lg font-semibold ">{item.label}</span>
              </div>
              <div className="text-lg md:text-2xl text-left  lg:text-3xl font-bold">
                {item.number}
              </div>
            </div>
          ))}
        </div>

        <div className=" h-[300px] text-white rounded-md overflow-hidden">
          {loadScript.isLoaded ? (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={15.18}
              clickableIcons={true}
            >
              {/* Marker */}
              {restos?.data.map((e) => (
                <MarkerF
                  key={`key_${e.name}`}
                  position={{
                    lat: Number(e.location?.latitude!) ?? 17,
                    lng: Number(e.location?.longitude!) ?? 14,
                  }}
                  icon={img}
                  label={e.name}
                  onClick={() => {
                    nav(`/restaurant/details/${e.id}`);
                  }}
                />
              ))}
              {company?.data.map((e) => (
                <MarkerF
                  key={`key_${e.name}`}
                  position={{
                    lat: e.location?.latitude! ?? 17,
                    lng: e.location?.longitude! ?? 14,
                  }}
                  icon={img}
                  label={e.name}
                  onClick={() => {
                    nav(`/organisation/details/${e.id}`);
                  }}
                />
              ))}
              <MarkerF position={destination} icon={plateMapImg} />
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
          ) : (
            <div>Loading</div>
          )}
        </div>
      </div>
      <div>
        <TransactionChart />
      </div>
    </div>
  );
};

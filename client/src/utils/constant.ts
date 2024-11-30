import { BuildingStorefrontIcon, HomeIcon, CakeIcon } from "@heroicons/react/24/outline";
import { Ilink } from "./constant.interface";
import logoIco from '../../assets/react.ico'
import logoSvg from '../../assets/react.svg'
export{ logoIco,logoSvg };

export const AppName=import.meta.env.VITE_APP_NAME.split(' ')
export const constant = {
  app_name: "Sen Resto",
  filePath:"/v1/",
};

export const links: Ilink[] = [
  { name: "Home", route: "" , icon:HomeIcon},
  { name: "Restaurants", route: "company", icon:BuildingStorefrontIcon },
 
  { name: "Produits", route: "product", icon:CakeIcon },
];

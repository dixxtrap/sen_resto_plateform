import { BuildingStorefrontIcon, HomeIcon, CakeIcon } from "@heroicons/react/24/outline";
import { Ilink } from "./constant.interface";

export const constant = {
  app_name: "Sen Resto",
  filePath:"/v1/",
};

export const links: Ilink[] = [
  { name: "Home", route: "" , icon:HomeIcon},
  { name: "Restaurants", route: "company", icon:BuildingStorefrontIcon },
 
  { name: "Produits", route: "product", icon:CakeIcon },
];

import { HomeIcon } from "@heroicons/react/24/outline";
import { Ilink } from "./constant.interface";

export const constant = {
  app_name: "Sen Resto",
  filePath:"/v1/",
};

export const links: Ilink[] = [
  { name: "Home", route: "" , icon:HomeIcon},
  { name: "Restaurants", route: "company", icon:HomeIcon },
 
  { name: "Produits", route: "product", icon:HomeIcon },
];

import {
  Icon,
  IconAdjustments,
  IconBuilding,
  IconBuildingBridge2,
  IconBuildingStore,
  IconCards,
  IconCheese,
  IconCoins,
  IconDeviceSpeaker,
  IconFile3d,
  IconGift,
  IconHome,
  IconMotorbike,
  IconNotification,
  IconPrison,
  IconProps,
  IconSettings2,
  IconShoppingCart,
  
  IconUserCog,
  IconUsersGroup,
  IconWallet,
} from "@tabler/icons-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { PathRouter } from "../../interface/router/path.route";
// import { PermissionDto } from "../../interface/role.dto";
type INavigation = {
  name: string;
  href: string;
  icon: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
  permissions: { code: string; type: string }[];
};
export const navigationData: INavigation[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: IconHome,
    permissions: [{ code: "*", type: "*" }],
  },
  {
    name: "Type d'Etablissement",
    href: "/establishment_type",
    icon: IconAdjustments,
    permissions: [{ code: "establishment_type", type: "*" }],
  },
  {
    name: "Produit Categories",
    href: "/company_category",
    icon: IconAdjustments,
    permissions: [{ code: "company_category", type: "*" }],
  },
  {
    name: "Organisation",
    href: "/organisation",
    icon: IconBuilding,
    permissions: [{ code: "company", type: "*" }],
  },
  {
    name: "Shop",
    href: "/shop",
    icon: IconBuildingStore,
    permissions: [{ code: "company_shop", type: "*" }],
  },
  {
    name: "Coorporate",
    href: `${PathRouter.coorporate}`,
    icon: IconBuildingBridge2,
    permissions: [{ code: "coorporate", type: "*" }],
  },
  {
    name: "Clients",
    href: "/customer",
    icon: IconUsersGroup,
    permissions: [{ code: "customer", type: "*" }],
  },
  {
    name: "Publications",
    href: "/story",
    icon: IconDeviceSpeaker,
    permissions: [{ code: "story", type: "*" }],
  },
  {
    name: "notification",
    href: "/notification",
    icon: IconNotification,
    permissions: [{ code: "notification", type: "*" }],
  },
  {
    name: "Delivers",
    href: "/deliver",
    icon: IconMotorbike,
    permissions: [{ code: "deliver", type: "*" }],
  },
  {
    name: "Utilisateurs",
    href: "/user",
    icon: IconUserCog,
    permissions: [{ code: "user", type: "*" }],
  },

  {
    name: "Cartes",
    href: "/card",
    icon: IconCards,
    permissions: [{ code: "card", type: "*" }],
  },
  {
    name: "Contrats",
    href: "/contrat",
    icon: IconFile3d,
    permissions: [{ code: "contrat", type: "*" }],
  },
  {
    name: "Produits",
    href: "/product",
    icon: IconCheese,
    permissions: [{ code: "product", type: "*" }],
  },
  {
    name: "Commandes",
    href: "/order",
    icon: IconShoppingCart,
    permissions: [{ code: "order", type: "*" }],
  },
  {
    name: "Methode de paiement",
    href: "/payment_type",
    icon: IconWallet,
    permissions: [{ code: "payment_type", type: "*" }],
  },
  {
    name: "Transaction",
    href: `/${PathRouter.transaction}`,
    icon: IconCoins,
    permissions: [{ code: "transaction", type: "*" }],
  },
  {
    name: "Cadeaux / Remise",
    href: `/${PathRouter.gift}`,
    icon: IconGift,
    permissions: [{ code: "*", type: "*" }],
  },
  {
    name: "Publicité",
    href: `${PathRouter.banner}`,
    icon: IconDeviceSpeaker,
    permissions: [{ code: "create_banner", type: "*" }],
  },
  {
    name: "Adresse",
    href: `/${PathRouter.city}`,
    icon: IconHome,
    permissions: [{ code: "read_city", type: "*" }],
  },
  // { name: "Documents", href: "#", icon: DocumentDuplicateIcon, current: false },
  // { name: "Reports", href: "#", icon: ChartPieIcon, current: false },
  {
    name: "Permission",
    href: "/permission",
    icon: IconPrison,
    permissions: [{ code: "permission", type: "*" }],
  },
  {
    name: "Role",
    href: "/security",
    icon: IconSettings2,
    permissions: [{ code: "role", type: "*" }],
  },
];
export const userNavigation = [
  { name: "Your profile", href: "#" },
  { name: "Sign out", href: "#" },
];

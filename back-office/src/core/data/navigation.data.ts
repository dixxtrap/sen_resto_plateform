import {
  Icon,
  IconAdjustments,
  IconBrandAirtable,
  
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
  IconIcons,
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
import { PermisisionTypeEnum } from "../../interface/components/protecter_page";
// import { PermissionDto } from "../../interface/role.dto";
type INavigation = {
  name: string;
  href: string;
  icon: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
  permissions: { code: string; type: PermisisionTypeEnum }[];
};
export const navigationData: INavigation[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: IconHome,
    permissions: [{ code: "*",  type: PermisisionTypeEnum.ALL}],
  },
  {
    name: "Type d'Etablissement",
    href: "/establishment_type",
    icon: IconAdjustments ,
    permissions: [{ code: "establishment_type", type: PermisisionTypeEnum.ALL }],
  },
  {
    name: "Icons",
    href: "/icon",
    icon: IconIcons,
    permissions: [{ code: "icon", type: PermisisionTypeEnum.ALL }],
  },
  {
    name: "Produit Categories",
    href: "/company_category",
    icon: IconAdjustments,
    permissions: [{ code: "company_category", type: PermisisionTypeEnum.ALL }],
  },
  {
    name: "Organisation",
    href: "/organisation",
    icon: IconBuilding,
    permissions: [{ code: "company", type: PermisisionTypeEnum.ALL }],
  },
  {
    name: "Shop",
    href: "/shop",
    icon: IconBuildingStore,
    permissions: [{ code: "company_shop", type: PermisisionTypeEnum.ALL }],
  },
  {
    name: "Coorporate",
    href: `${PathRouter.coorporate}`,
    icon: IconBuildingBridge2,
    permissions: [{ code: "coorporate", type: PermisisionTypeEnum.ALL }],
  },
  {
    name: "Clients",
    href: "/customer",
    icon: IconUsersGroup,
    permissions: [{ code: "customer", type: PermisisionTypeEnum.ALL }],
  },
  {
    name: "Publications",
    href: "/story",
    icon: IconDeviceSpeaker,
    permissions: [{ code: "story", type: PermisisionTypeEnum.ALL }],
  },
  {
    name: "notification",
    href: "/notification",
    icon: IconNotification,
    permissions: [{ code: "notification", type: PermisisionTypeEnum.ALL }],
  },
  {
    name: "Delivers",
    href: "/deliver",
    icon: IconMotorbike,
    permissions: [{ code: "deliver", type: PermisisionTypeEnum.ALL }],
  },
  {
    name: "Utilisateurs",
    href: "/user",
    icon: IconUserCog,
    permissions: [{ code: "user", type: PermisisionTypeEnum.ALL }],
  },

  {
    name: "Cartes",
    href: "/card",
    icon: IconCards,
    permissions: [{ code: "card", type: PermisisionTypeEnum.ALL }],
  },
  {
    name: "Contrats",
    href: "/contrat",
    icon: IconFile3d,
    permissions: [{ code: "contrat", type: PermisisionTypeEnum.ALL }],
  },
  {
    name: "Produits",
    href: "/product",
    icon: IconCheese,
    permissions: [{ code: "product", type: PermisisionTypeEnum.ALL }],
  },
  {
    name: "Commandes",
    href: "/order",
    icon: IconShoppingCart,
    permissions: [{ code: "order", type: PermisisionTypeEnum.ALL }],
  },
  {
    name: "Methode de paiement",
    href: "/payment_type",
    icon: IconWallet,
    permissions: [{ code: "payment_type", type: PermisisionTypeEnum.ALL }],
  },
  {
    name: "Transaction",
    href: `/${PathRouter.transaction}`,
    icon: IconCoins,
    permissions: [{ code: "transaction", type: PermisisionTypeEnum.ALL }],
  },
  {
    name: "Cadeaux / Remise",
    href: `/${PathRouter.gift}`,
    icon: IconGift,
    permissions: [{ code: "*", type: PermisisionTypeEnum.ALL }],
  },
  {
    name: "Publicité",
    href: `${PathRouter.banner}`,
    icon: IconDeviceSpeaker,
    permissions: [{ code: "create_banner", type: PermisisionTypeEnum.ALL }],
  },
  {
    name: "Table",
    href: `/seating`,
    icon: IconBrandAirtable,
    permissions: [{ code: "*", type: PermisisionTypeEnum.ALL }],
  },
  {
    name: "Adresse",
    href: `/${PathRouter.city}`,
    icon: IconHome,
    permissions: [{ code: "read_city", type: PermisisionTypeEnum.ALL }],
  },
  // { name: "Documents", href: "#", icon: DocumentDuplicateIcon, current: false },
  // { name: "Reports", href: "#", icon: ChartPieIcon, current: false },
  {
    name: "Permission",
    href: "/permission",
    icon: IconPrison,
    permissions: [{ code: "permission", type: PermisisionTypeEnum.ALL }],
  },
  {
    name: "Role",
    href: "/security",
    icon: IconSettings2,
    permissions: [{ code: "role", type: PermisisionTypeEnum.ALL }],
  },
];
export const userNavigation = [
  { name: "Your profile", href: "#" },
  { name: "Sign out", href: "#" },
];

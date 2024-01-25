import {
  BanknotesIcon,
  BuildingOffice2Icon,
  BuildingStorefrontIcon,
  CakeIcon,
  // CalendarIcon,
  // ChartPieIcon,
  ClipboardDocumentCheckIcon,
  ClipboardIcon,
  Cog6ToothIcon,
  CreditCardIcon,
  // DocumentDuplicateIcon,
  // FolderIcon,
  HomeIcon,
  IdentificationIcon,
  ShieldCheckIcon,
  TruckIcon,
  UsersIcon,
  WalletIcon,
} from "@heroicons/react/24/outline";
import {
  ForwardRefExoticComponent,

  RefAttributes,
  SVGProps,
} from "react";
// import { PermissionDto } from "../../interface/role.dto";
type INavigation = {
  name: string;
  href: string;
  icon: ForwardRefExoticComponent<
    Omit<SVGProps<SVGSVGElement>, "ref"> & {
      title?: string | undefined;
      titleId?: string | undefined;
    } & RefAttributes<SVGSVGElement>
  >;
  permissions: { code: string; type: string }[];
};
export const navigationData: INavigation[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: HomeIcon,
    permissions: [{ code: "*", type: "*" }],
  },
  {
    name: "Organisation",
    href: "/organisation",
    icon: BuildingOffice2Icon,
    permissions: [{ code: "company_restaurant", type: "*" }],
  },
  {
    name: "Restaurants",
    href: "/restaurant",
    icon: BuildingStorefrontIcon,
    permissions: [{ code: "restaurant", type: "*" }],
  },
 
  {
    name: "Clients",
    href: "/customer",
    icon: IdentificationIcon,
    permissions: [{ code: "customer", type: "*" }],
  },
  {
    name: "Delivers",
    href: "/deliver",
    icon: TruckIcon,
    permissions: [{ code: "*", type: "*" }],
  },
  {
    name: "Utilisateurs",
    href: "/user",
    icon: UsersIcon,
    permissions: [{ code: "user", type: "*" }],
  },
 
  {
    name: "Cartes",
    href: "/card",
    icon: CreditCardIcon,
    permissions: [{ code: "*", type: "*" }],
  },
  {
    name: "Contrats",
    href: "/contrat",
    icon: ClipboardIcon,
    permissions: [{ code: "*", type: "*" }],
  },
  {
    name: "Produits",
    href: "/product",
    icon: CakeIcon,
    permissions: [{ code: "product", type: "*" }],
  },
  {
    name: "Commandes",
    href: "/order",
    icon: ClipboardDocumentCheckIcon,
    permissions: [{ code: "order", type: "*" }],
  },
  {
    name: "Methode de paiement",
    href: "/payment_type",
    icon: BanknotesIcon,
    permissions: [{ code: "payment_type", type: "*" }],
  },
  {
    name: "Payement",
    href: "/payment",
    icon: BanknotesIcon,
    permissions: [{ code: "transaction", type: "*" }],
  },
  { name: "Facture", href: "/facture", icon: WalletIcon, permissions: [{ code: "*", type: "*" }] },
  // { name: "Documents", href: "#", icon: DocumentDuplicateIcon, current: false },
  // { name: "Reports", href: "#", icon: ChartPieIcon, current: false },
  {
    name: "Permission",
    href: "/permission",
    icon: ShieldCheckIcon,
    permissions: [{ code: "permission", type: "*" }],
  },
  { name: "Role", href: "/security", icon: Cog6ToothIcon, permissions: [{ code: "role", type: "*" }]  },
];
export const userNavigation = [
  { name: "Your profile", href: "#" },
  { name: "Sign out", href: "#" },
];

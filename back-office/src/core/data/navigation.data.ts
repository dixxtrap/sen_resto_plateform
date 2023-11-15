import {
  BanknotesIcon,
  BuildingOffice2Icon,
  BuildingStorefrontIcon,
  CakeIcon,
  // CalendarIcon,
  // ChartPieIcon,
  ClipboardDocumentCheckIcon,
  Cog6ToothIcon,
  // DocumentDuplicateIcon,
  // FolderIcon,
  HomeIcon,
  IdentificationIcon,
  LinkIcon,
  ShieldCheckIcon,
  UsersIcon,
  WalletIcon,
} from "@heroicons/react/24/outline";
import {
  ForwardRefExoticComponent,
  ReactNode,
  RefAttributes,
  SVGProps,
} from "react";
import { PermissionDto } from "../models/role.dto";
type INavigation = {
  name: string;
  href: string;
  icon: ForwardRefExoticComponent<
    Omit<SVGProps<SVGSVGElement>, "ref"> & {
      title?: string | undefined;
      titleId?: string | undefined;
    } & RefAttributes<SVGSVGElement>
  >;
  permissions: { sousModule: string; type: string }[];
};
export const navigationData: INavigation[] = [
  {
    name: "Dashboard",
    href: "/dash",
    icon: HomeIcon,
    permissions: [{ sousModule: "*", type: "*" }],
  },
  {
    name: "Utilisateur",
    href: "/user",
    icon: UsersIcon,
    permissions: [{ sousModule: "user", type: "*" }],
  },
  {
    name: "Client",
    href: "/customer",
    icon: IdentificationIcon,
    permissions: [{ sousModule: "customer", type: "*" }],
  },
  {
    name: "Organisation",
    href: "/organisation",
    icon: BuildingOffice2Icon,
    permissions: [{ sousModule: "company", type: "*" }],
  },
  {
    name: "Restaurant",
    href: "/restaurant",
    icon: BuildingStorefrontIcon,
    permissions: [{ sousModule: "restaurant", type: "*" }],
  },
  {
    name: "Plats",
    href: "/plate",
    icon: CakeIcon,
    permissions: [{ sousModule: "plate", type: "*" }],
  },
  {
    name: "Commandes",
    href: "/order",
    icon: ClipboardDocumentCheckIcon,
    permissions: [{ sousModule: "order", type: "*" }],
  },
  {
    name: "Methode de paiement",
    href: "/payment_type",
    icon: BanknotesIcon,
    permissions: [{ sousModule: "payment_type", type: "*" }],
  },
  {
    name: "Payement",
    href: "/payment",
    icon: BanknotesIcon,
    permissions: [{ sousModule: "payment", type: "*" }],
  },
  { name: "Facture", href: "/facture", icon: WalletIcon, permissions: [{ sousModule: "factue", type: "*" }] },
  // { name: "Documents", href: "#", icon: DocumentDuplicateIcon, current: false },
  // { name: "Reports", href: "#", icon: ChartPieIcon, current: false },
  {
    name: "Permission",
    href: "/permission",
    icon: ShieldCheckIcon,
    permissions: [{ sousModule: "permission", type: "*" }],
  },
  { name: "Role", href: "/security", icon: Cog6ToothIcon, permissions: [{ sousModule: "security", type: "*" }]  },
];
export const userNavigation = [
  { name: "Your profile", href: "#" },
  { name: "Sign out", href: "#" },
];

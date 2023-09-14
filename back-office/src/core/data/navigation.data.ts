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
} from "@heroicons/react/24/outline";

export const navigationData = [
  { name: "Dashboard", href: "/dash", icon: HomeIcon, current: true },
  { name: "Utilisateur", href: "/user", icon: UsersIcon, current: false },
  { name: "Client", href: "/customer", icon: IdentificationIcon, current: false },
  { name: "Organisation", href: "/organisation", icon: BuildingOffice2Icon, current: false },
  { name: "Restaurant", href: "/restaurant", icon: BuildingStorefrontIcon, current: false },
  { name: "Plats", href: "/plate", icon: CakeIcon, current: false },
  { name: "Commandes", href: "/order", icon: ClipboardDocumentCheckIcon, current: false },
  { name: "Payement", href: "/payment_type", icon: BanknotesIcon, current: false },
  // { name: "Documents", href: "#", icon: DocumentDuplicateIcon, current: false },
  // { name: "Reports", href: "#", icon: ChartPieIcon, current: false },
  { name: "Permission", href: "/permission", icon: ShieldCheckIcon, current: false },
  { name: "Role", href: "/security", icon: Cog6ToothIcon, current: false },
];
export const userNavigation = [
  { name: "Your profile", href: "#" },
  { name: "Sign out", href: "#" },
];

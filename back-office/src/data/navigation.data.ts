import {
  BanknotesIcon,
  BuildingOffice2Icon,
  BuildingStorefrontIcon,
  CakeIcon,
  CalendarIcon,
  ChartPieIcon,
  ClipboardDocumentCheckIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  IdentificationIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

export const navigationData = [
  { name: "Dashboard", href: "/dash", icon: HomeIcon, current: true },
  { name: "Team", href: "/user", icon: UsersIcon, current: false },
  { name: "Client", href: "/customer", icon: IdentificationIcon, current: false },
  { name: "Organisation", href: "/organisation", icon: BuildingOffice2Icon, current: false },
  { name: "Restaurant", href: "/restaurant", icon: BuildingStorefrontIcon, current: false },
  { name: "Plats", href: "/plate", icon: CakeIcon, current: false },
  { name: "Commandes", href: "/order", icon: ClipboardDocumentCheckIcon, current: false },
  { name: "Payement", href: "/payment", icon: BanknotesIcon, current: false },
  { name: "Documents", href: "#", icon: DocumentDuplicateIcon, current: false },
  { name: "Reports", href: "#", icon: ChartPieIcon, current: false },
  { name: "Role", href: "/role", icon: Cog6ToothIcon, current: false },
];
export const userNavigation = [
  { name: "Your profile", href: "#" },
  { name: "Sign out", href: "#" },
];

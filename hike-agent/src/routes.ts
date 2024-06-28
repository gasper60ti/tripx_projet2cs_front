import { FaMountain } from "react-icons/fa"
import { AiOutlineSetting } from "react-icons/ai"
import { GoHome, GoPeople } from "react-icons/go"
import { SideNavItem } from "./lib/types"

export const routes: SideNavItem[] = [
  {
    title: "Dashboard",
    icon: GoHome,
    link: "/",
    hasChildren: false
  },
  {
    title: "Hikes",
    icon: FaMountain,
    link: "/hikes",
    hasChildren: false
  },
  {
    title: "Bookings",
    icon: GoPeople,
    link: "/bookings",
    hasChildren: false
  },
  {
    title: "Agency Settings",
    icon: AiOutlineSetting,
    link: "/settings",
    hasChildren: false
  }
]

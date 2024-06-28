import { FaMountain, FaPlaneDeparture } from "react-icons/fa"
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
    title: "Travel Agencies",
    icon: FaPlaneDeparture,
    link: "/travel-agencies",
    hasChildren: false
  },
  {
    title: "Hike Agencies",
    icon: FaMountain,
    link: "/hiking-agencies",
    hasChildren: false
  },
  {
    title: "Users",
    icon: GoPeople,
    link: "/users",
    hasChildren: false
  },
  {
    title: "Settings",
    icon: AiOutlineSetting,
    link: "/settings",
    hasChildren: false
  }
]

import { getSession } from "@/actions/getSession"
import Link from "next/link"
import logout from "@/actions/logout"
import Logo from "@/assets/logo.svg"
import US from "@/assets/icons/lang/us.webp"
import Image from "next/image"
import Notif from "@/assets/icons/notif.svg"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

import { TriangleDownIcon } from "@radix-ui/react-icons"

import DefaultAvatar from "@/assets/images/default_pp.png"

export default async function Navbar() {
  const session = await getSession()
  return (
    <header className="bg-white font-dm-sans shadow-[0px_-1px_4px_0px_#E2E2EA]">
      <div className="page-container flex items-center justify-between gap-4 py-5">
        <Link href="/" className="flex items-center gap-3">
          <Logo width={30} />
          <span className="text-xl font-bold">TripX</span>
        </Link>
        <div className="flex gap-6">
          <button className="flex items-center gap-4 text-sm font-bold text-primary-gray">
            EN
            <Image src={US} alt="us flag" width={20} height={20} />
          </button>
          <button>
            <Notif width={24} height={24} />
          </button>
          <span className="w-0.5 bg-primary-gray opacity-20" />
          {session.user && (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-3 font-medium text-primary-black">
                <Image
                  src={session.user?.profile_picture || DefaultAvatar}
                  alt="user avatar"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span className="capitalize">{session.user?.first_name ?? "user"}</span>
                <TriangleDownIcon className="w-8 scale-125" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="right-0 mr-2 min-w-[10rem] text-primary-black"
                align="end"
                sideOffset={10}
              >
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/profile" className="w-full">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/profile/travels" className="w-full">
                    Travel bookings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/profile/hikes" className="w-full">
                    Hike bookings
                  </Link>
                </DropdownMenuItem>
                <form action={logout}>
                  <DropdownMenuItem className="relative">
                    <button className="w-full text-start" type="submit">
                      Logout
                    </button>
                  </DropdownMenuItem>
                </form>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          {!session.user && (
            <div className="flex gap-3">
              <Link href="/login" className="text-primary-blue hover:underline">
                Login
              </Link>
              <span className="h-full w-[1px] bg-primary-gray opacity-20" />
              <Link href="/signup" className="text-primary-blue hover:underline">
                Signup
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

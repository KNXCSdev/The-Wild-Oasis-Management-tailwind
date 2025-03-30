import {
  HiOutlineCalendarDateRange,
  HiOutlineCog8Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUserGroup,
} from "react-icons/hi2";

import MainNavLink from "./MainNavLink";
import { useLocation } from "react-router";

export default function MainNav() {
  const location = useLocation();

  return (
    <nav className="w-full">
      <ul className="flex list-none flex-col gap-4">
        <li>
          <MainNavLink link="/home">
            <HiOutlineHome
              className={`h-[2.6rem] w-[2.6rem] ${location.pathname === "/home" ? "text-brand-600" : "text-grey-400"}`}
            />
            <span>Home</span>
          </MainNavLink>
        </li>
        <li>
          <MainNavLink link="/bookings">
            <HiOutlineCalendarDateRange
              className={`h-[2.6rem] w-[2.6rem] ${location.pathname === "/bookings" ? "text-brand-600" : "text-grey-400"}`}
            />
            <span>Bookings</span>
          </MainNavLink>
        </li>
        <li>
          <MainNavLink link="/cabins">
            <HiOutlineHomeModern
              className={`h-[2.6rem] w-[2.6rem] ${location.pathname === "/cabins" ? "text-brand-600" : "text-grey-400"}`}
            />
            <span>Cabins</span>
          </MainNavLink>
        </li>
        <li>
          <MainNavLink link="/users">
            <HiOutlineUserGroup
              className={`h-[2.6rem] w-[2.6rem] ${location.pathname === "/users" ? "text-brand-600" : "text-grey-400"}`}
            />
            <span>Users</span>
          </MainNavLink>
        </li>
        <li>
          <MainNavLink link="/settings">
            <HiOutlineCog8Tooth
              className={`h-[2.6rem] w-[2.6rem] ${location.pathname === "/settings" ? "text-brand-600" : "text-grey-400"}`}
            />
            <span>Settings</span>
          </MainNavLink>
        </li>
      </ul>
    </nav>
  );
}

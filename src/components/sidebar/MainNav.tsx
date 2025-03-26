import {
  HiOutlineCalendar,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUserGroup,
} from "react-icons/hi2";
import { HiOutlineCog } from "react-icons/hi";
import MainNavLink from "./MainNavLink";
import { useLocation } from "react-router";

export default function MainNav() {
  const location = useLocation();

  return (
    <nav className="w-full">
      <ul className="flex list-none flex-col gap-3">
        <li>
          <MainNavLink link="/home">
            <HiOutlineHome
              className={`h-[2.4rem] w-[2.4rem] ${location.pathname === "/home" ? "text-brand-600" : "text-gray-400"}`}
            />
            <span>Home</span>
          </MainNavLink>
        </li>
        <li>
          <MainNavLink link="/bookings">
            <HiOutlineCalendar
              className={`h-[2.4rem] w-[2.4rem] ${location.pathname === "/bookings" ? "text-brand-600" : "text-gray-400"}`}
            />
            <span>Bookings</span>
          </MainNavLink>
        </li>
        <li>
          <MainNavLink link="/cabins">
            <HiOutlineHomeModern
              className={`h-[2.4rem] w-[2.4rem] ${location.pathname === "/cabins" ? "text-brand-600" : "text-gray-400"}`}
            />
            <span>Cabins</span>
          </MainNavLink>
        </li>
        <li>
          <MainNavLink link="/users">
            <HiOutlineUserGroup
              className={`h-[2.4rem] w-[2.4rem] ${location.pathname === "/users" ? "text-brand-600" : "text-gray-400"}`}
            />
            <span>Users</span>
          </MainNavLink>
        </li>
        <li>
          <MainNavLink link="/settings">
            <HiOutlineCog
              className={`h-[2.4rem] w-[2.4rem] ${location.pathname === "/settings" ? "text-brand-600" : "text-gray-400"}`}
            />
            <span>Settings</span>
          </MainNavLink>
        </li>
      </ul>
    </nav>
  );
}

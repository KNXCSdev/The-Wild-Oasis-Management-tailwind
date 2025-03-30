import { NavLink } from "react-router-dom";

interface MainNavLinkProps {
  children: React.ReactNode;
  link: string;
}

export default function MainNavLink({ children, link }: MainNavLinkProps) {
  return (
    <NavLink
      to={link}
      className={({ isActive }) =>
        `hover:bg-grey-50 hover:text-grey-800 flex items-center gap-[1.2rem] rounded-xl px-[2.4rem] py-[1.2rem] text-[1.6rem] font-medium transition ${
          isActive ? "text-grey-800 bg-grey-50" : "text-grey-600"
        }`
      }
    >
      {children}
    </NavLink>
  );
}

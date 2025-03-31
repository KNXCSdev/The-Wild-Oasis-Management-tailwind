import { HiOutlineMoon } from "react-icons/hi";
import { HiOutlineArrowRightOnRectangle, HiOutlineUser } from "react-icons/hi2";
import { useDarkMode } from "../../context/DarkModeContext";
import { useUser } from "../authentication/useUser";
import { useLogout } from "../authentication/useLogout";
import { useNavigate } from "react-router";

export default function Header() {
  const { toggleDarkMode } = useDarkMode();
  const { user } = useUser();
  const { fullName = "User", avatar = "default-user.jpg" } =
    user!.user_metadata;
  const { isLoading: isLoggingOut, logout } = useLogout();
  const navigate = useNavigate();

  return (
    <div className="bg-grey-0 flex items-center justify-end gap-10 border-b border-(--color-grey-100) px-[4.8rem] py-[1.2rem]">
      <div className="text-grey-600 flex items-center gap-5 text-2xl font-semibold">
        <img
          src={avatar}
          alt={`Avatar of ${fullName}`}
          className="outline-grey-100 block aspect-square w-[3.6rem] rounded-[50%] object-cover object-[center_center] outline-2"
        />
        <span>{fullName}</span>
      </div>
      <ul className="flex list-none gap-1.5">
        <li>
          <button className="cursor-pointer rounded-[--border-radius-sm] border-none bg-none p-2.5 transition-[0.2s]">
            <HiOutlineUser
              className="text-brand-600 h-[2.2rem] w-[2.2rem]"
              onClick={() => navigate("/account")}
            />
          </button>
        </li>
        <li>
          <button
            className="cursor-pointer rounded-[--border-radius-sm] border-none bg-none p-2.5 transition-[0.2s]"
            onClick={toggleDarkMode}
          >
            <HiOutlineMoon className="text-brand-600 h-[2.2rem] w-[2.2rem]" />
          </button>
        </li>
        <li>
          <button
            className="cursor-pointer rounded-[--border-radius-sm] border-none bg-none p-2.5 transition-[0.2s]"
            onClick={() => logout()}
            disabled={isLoggingOut}
          >
            <HiOutlineArrowRightOnRectangle className="text-brand-600 h-[2.2rem] w-[2.2rem]" />
          </button>
        </li>
      </ul>
    </div>
  );
}

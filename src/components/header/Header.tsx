import { HiOutlineUser } from "react-icons/hi2";

export default function Header() {
  return (
    <div className="bg-grey-0 flex items-center justify-end gap-10 border-b border-(--color-grey-100) px-[4.8rem] py-[1.2rem]">
      <div className="text-grey-600 flex items-center gap-5 text-2xl font-semibold"></div>
      <ul className="flex list-none gap-1.5">
        <li>
          <button className="cursor-pointer rounded-[--border-radius-sm] border-none bg-none p-2.5 transition-[0.2s]">
            <HiOutlineUser />
          </button>
        </li>
        <li>
          <button className="cursor-pointer rounded-[--border-radius-sm] border-none bg-none p-2.5 transition-[0.2s]">
            DarkMode
          </button>
        </li>
        <li>
          <button className="cursor-pointer rounded-[--border-radius-sm] border-none bg-none p-2.5 transition-[0.2s]">
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

import Logo from "./Logo";
import MainNav from "./MainNav";

export default function Sidebar() {
  return (
    <aside className="bg-grey-0 row-span-full flex flex-col items-center gap-16 border-r border-(--color-grey-100) px-[2.4rem] py-[3.2rem]">
      <Logo />
      <MainNav />
    </aside>
  );
}

import { Outlet } from "react-router";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";

export default function AppLayout() {
  return (
    <div className="grid h-screen grid-cols-[26rem_1fr] grid-rows-[auto_1fr]">
      <Header />
      <Sidebar />
      <main className="bg-grey-50 overflow-auto px-[4.8rem] pt-[4rem] pb-[6.4rem]">
        <div className="mx-auto my-0 flex w-full max-w-[120rem] flex-col gap-[3.2rem]">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

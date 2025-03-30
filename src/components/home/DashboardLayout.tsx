import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import DashboardBox from "./DashboardBox";
import { formatCurrency } from "../../utils/helpers";
import {
  HiOutlineBanknotes,
  HiOutlineCalendarDateRange,
} from "react-icons/hi2";
import TodayActivity from "../check-in-out/TodayActivity";
import DashboardChart from "./DashboardChart";
import DashboardSalesChart from "./DashboardSalesChart";

export default function DashboardLayout() {
  return (
    <div className="grid grid-cols-4 grid-rows-[auto_34rem_auto] gap-[2.4rem]">
      <DashboardBox
        bg={"bg-blue-100"}
        icon={
          <HiOutlineBriefcase className={`h-[3rem] w-[3rem] text-blue-700`} />
        }
        text={"Bookings"}
        value={9}
      />
      <DashboardBox
        bg={"bg-green-100"}
        icon={
          <HiOutlineBanknotes className={`h-[3rem] w-[3rem] text-green-700`} />
        }
        text={"Sales"}
        value={formatCurrency(27510)}
      />
      <DashboardBox
        bg={"bg-purple-100"}
        icon={
          <HiOutlineCalendarDateRange
            className={`h-[3rem] w-[3rem] text-purple-700`}
          />
        }
        text={"Check ins"}
        value={6}
      />
      <DashboardBox
        bg={"bg-yellow-100"}
        icon={
          <HiOutlineChartBar className={`h-[3rem] w-[3rem] text-yellow-700`} />
        }
        text={"Occupancy rate"}
        value={"57%"}
      />
      <TodayActivity />
      <DashboardChart />
      <DashboardSalesChart />
    </div>
  );
}

import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import DashboardStat from "./DashboardStat";
import {
  HiOutlineBanknotes,
  HiOutlineCalendarDateRange,
} from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

interface DashboardStatsProps {
  bookings: {
    totalPrice: number;
    created_at: string;
    extrasPrice: number;
  }[];
  confirmedStays: {
    numNights: number;
  }[];
  cabinCount: number;
  numDays: number;
}

export default function DashboardStats({
  bookings,
  confirmedStays,
  cabinCount,
  numDays,
}: DashboardStatsProps) {
  const totalSales = bookings.reduce(
    (acc, booking) => acc + booking.totalPrice,
    0,
  );
  const checkins = confirmedStays.length;
  const occupation =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * cabinCount);

  return (
    <>
      <DashboardStat
        bg={"bg-blue-100"}
        icon={
          <HiOutlineBriefcase className={`h-[3rem] w-[3rem] text-blue-700`} />
        }
        text={"Bookings"}
        value={bookings?.length || 0}
      />
      <DashboardStat
        bg={"bg-green-100"}
        icon={
          <HiOutlineBanknotes className={`h-[3rem] w-[3rem] text-green-700`} />
        }
        text={"Sales"}
        value={formatCurrency(Number(totalSales)) || 0}
      />
      <DashboardStat
        bg={"bg-purple-100"}
        icon={
          <HiOutlineCalendarDateRange
            className={`h-[3rem] w-[3rem] text-purple-700`}
          />
        }
        text={"Check ins"}
        value={checkins || 0}
      />
      <DashboardStat
        bg={"bg-yellow-100"}
        icon={
          <HiOutlineChartBar className={`h-[3rem] w-[3rem] text-yellow-700`} />
        }
        text={"Occupancy rate"}
        value={Math.round(occupation ? occupation * 100 : 0) + "%"}
      />
    </>
  );
}

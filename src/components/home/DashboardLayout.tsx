import TodayActivity from "../check-in-out/TodayActivity";
import DashboardChart from "./DashboardChart";
import DashboardSalesChart from "./DashboardSalesChart";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import DashboardStats from "./DashboardStats";
import { useRecentStays } from "./useRecentStays";
import { useCabins } from "../cabins/useCabins";

export default function DashboardLayout() {
  const { bookings = [], isLoading } = useRecentBookings();
  const {
    isLoading: isLoading2,
    confirmedStays = [],
    numDays,
  } = useRecentStays();
  const { cabins = [], isLoading: isLoading3 } = useCabins();

  if (isLoading || isLoading2 || isLoading3) return <Spinner />;

  return (
    <div className="grid grid-cols-4 grid-rows-[auto_34rem_auto] gap-[2.4rem]">
      <DashboardStats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      <TodayActivity />
      <DashboardChart confirmedStays={confirmedStays} />
      <DashboardSalesChart bookings={bookings} numDays={numDays} />
    </div>
  );
}

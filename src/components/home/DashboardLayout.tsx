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
    <div className="grid grid-cols-1 grid-rows-[auto_auto_auto_auto_34rem_34rem_34rem] gap-[2.4rem] md:grid-cols-2 md:grid-rows-[auto_auto_34rem_auto] lg:grid-cols-4 lg:grid-rows-[auto_34rem_auto]">
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

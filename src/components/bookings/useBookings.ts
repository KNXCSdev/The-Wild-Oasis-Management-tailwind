import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../api/apiBookings";

export function useBookings() {
  const { data: bookings, isLoading } = useQuery({
    queryKey: ["bookings"],
    queryFn: getBookings,
  });

  return { bookings, isLoading };
}

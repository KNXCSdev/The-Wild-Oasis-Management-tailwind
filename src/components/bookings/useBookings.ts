import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../api/apiBookings";
import { useSearchParams } from "react-router";

export function useBookings() {
  const [searchParams] = useSearchParams();

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const { data: { data: bookings, count = 0 } = {}, isLoading } = useQuery({
    queryKey: ["bookings", page],
    queryFn: () => getBookings({ page }),
  });

  return { bookings, isLoading, count };
}

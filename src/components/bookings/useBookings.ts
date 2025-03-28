import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../api/apiBookings";
import { useSearchParams } from "react-router";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  //FILTER
  const status =
    searchParams.get("status") === "all" ? null : searchParams.get("status");

  //PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const { data: { data: bookings, count = 0 } = {}, isLoading } = useQuery({
    queryKey: ["bookings", status, page],
    queryFn: () => getBookings({ page, status }),
  });

  const pageCount = Math.ceil((count ?? 0) / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", status, page + 1],
      queryFn: () => getBookings({ status, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", status, page - 1],
      queryFn: () => getBookings({ status, page: page - 1 }),
    });

  return { bookings, isLoading, count };
}

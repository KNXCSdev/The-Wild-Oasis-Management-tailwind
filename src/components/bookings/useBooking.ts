import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../api/apiBookings";
import { useParams } from "react-router";

export function useBooking() {
  const { bookingId } = useParams();

  const { data: booking, isLoading } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(Number(bookingId)),
    retry: false,
  });

  return { booking, isLoading, bookingId };
}

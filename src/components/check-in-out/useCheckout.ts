import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { updateBooking } from "../../api/apiBookings";

export function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkout, isLoading: isCheckinOut } = useMutation({
    mutationFn: (bookingId: number) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: () => {
      toast.success("Booking successfully checked-out");
      queryClient.invalidateQueries({ refetchType: "active" });
    },

    onError: ({ message }: { message: string }) => toast.error(message),
  });

  return { checkout, isCheckinOut };
}

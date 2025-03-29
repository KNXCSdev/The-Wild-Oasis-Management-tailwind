import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

import { useNavigate } from "react-router";
import { updateBooking } from "../../api/apiBookings";

interface CheckinParams {
  bookingId: number;
  breakfast?: {
    hasBreakfast?: boolean;
    extrasPrice?: number;
    totalPrice?: number;
  };
}

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isLoading: isCheckinIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }: CheckinParams) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: () => {
      toast.success("Booking successfully checked-in");
      queryClient.invalidateQueries({ refetchType: "active" });
      navigate("/");
    },

    onError: ({ message }: { message: string }) => toast.error(message),
  });

  return { checkin, isCheckinIn };
}

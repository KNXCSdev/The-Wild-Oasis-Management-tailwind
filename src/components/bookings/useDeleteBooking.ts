import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { deleteBooking as deleteBookingApi } from "../../api/apiBookings";

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { mutate: deleteBooking, isLoading: isDeleting } = useMutation({
    mutationFn: (id: number) => deleteBookingApi(id),
    onSuccess: () => {
      toast.success("Booking successfully deleted");

      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },

    onError: ({ message }: { message: string }) => toast.error(message),
  });

  return { deleteBooking, isDeleting };
}

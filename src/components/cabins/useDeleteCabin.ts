import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../api/apiCabins";
import toast from "react-hot-toast";

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { mutate, isLoading: isDeleting } = useMutation({
    mutationFn: (id: number) => deleteCabin(id),
    onSuccess: () => {
      toast.success("Cabin successfully deleted");

      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },

    onError: ({ message }: { message: string }) => toast.error(message),
  });

  return { mutate, isDeleting };
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMultipleCabins } from "../../api/apiCabins";
import toast from "react-hot-toast";

export function useDeleteCabins() {
  const queryClient = useQueryClient();

  const { mutate, isLoading: isDeletingCabins } = useMutation({
    mutationFn: (id: number[]) => deleteMultipleCabins(id),
    onSuccess: () => {
      toast.success("Cabins successfully deleted");

      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },

    onError: ({ message }: { message: string }) => toast.error(message),
  });

  return { mutate, isDeletingCabins };
}

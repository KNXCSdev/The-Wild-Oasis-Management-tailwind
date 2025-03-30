import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editCabin } from "../../api/apiCabins";
import toast from "react-hot-toast";

interface Cabin {
  discount: number;
  description: string;
  image: File;
  maxCapacity: number;
  name: string;
  regularPrice: number;
}

interface EditCabinParams {
  NewCabinsData: Cabin;
  cabinId: number;
}

export function useEditCabin() {
  const queryClient = useQueryClient();

  const { mutate, isLoading: isEditingCabin } = useMutation({
    mutationFn: ({ NewCabinsData, cabinId }: EditCabinParams) =>
      editCabin(NewCabinsData, cabinId),
    onSuccess: () => {
      toast.success("Cabin successfully updated");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: ({ message }: { message: string }) => toast.error(message),
  });

  return { mutate, isEditingCabin };
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewCabin } from "../../api/apiCabins";
import toast from "react-hot-toast";
interface Cabin {
  discount: number;
  description: string;
  image: File;
  maxCapacity: number;
  name: string;
  regularPrice: number;
}

export function useAddCabin() {
  const queryClient = useQueryClient();

  const { mutate, isLoading: isAddingCabin } = useMutation({
    mutationFn: (cabin: Cabin) => addNewCabin(cabin),
    onSuccess: () => {
      toast.success("Cabin successfully created");

      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },

    onError: ({ message }: { message: string }) => toast.error(message),
  });

  return { mutate, isAddingCabin };
}

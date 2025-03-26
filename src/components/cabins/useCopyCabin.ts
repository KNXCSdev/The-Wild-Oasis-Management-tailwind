import { useMutation, useQueryClient } from "@tanstack/react-query";
import { duplicateCubin } from "../../api/apiCabins";
import toast from "react-hot-toast";
interface Cabin {
  discount: number;
  description: string;
  image: string;
  maxCapacity: number;
  name: string;
  regularPrice: number;
}

export function useCopyCabin() {
  const queryClient = useQueryClient();

  const { mutate, isLoading: isCopying } = useMutation({
    mutationFn: (cabin: Cabin) => duplicateCubin(cabin),
    onSuccess: () => {
      toast.success("Cabin successfully created");

      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },

    onError: ({ message }: { message: string }) => toast.error(message),
  });

  return { mutate, isCopying };
}

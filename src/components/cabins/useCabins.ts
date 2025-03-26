import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../api/apiCabins";

export function useCabins() {
  const { data: cabins, isLoading } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  return { cabins, isLoading };
}

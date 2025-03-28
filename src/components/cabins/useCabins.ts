import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../api/apiCabins";
import { useSearchParams } from "react-router";

export function useCabins() {
  const [searchParams] = useSearchParams();

  const status = !searchParams.get("status")
    ? null
    : searchParams.get("status");

  const { data: cabins, isLoading } = useQuery({
    queryKey: ["cabins", status],
    queryFn: () => getCabins({ status }),
  });

  return { cabins, isLoading };
}

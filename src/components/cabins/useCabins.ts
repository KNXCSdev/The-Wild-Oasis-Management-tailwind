import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../api/apiCabins";
import { useSearchParams } from "react-router";

export function useCabins() {
  const [searchParams] = useSearchParams();

  const status = !searchParams.get("status")
    ? null
    : searchParams.get("status");

  const sort = !searchParams.get("sort") ? null : searchParams.get("sort");

  const { data: cabins, isLoading } = useQuery({
    queryKey: ["cabins", status, sort],
    queryFn: () => getCabins({ status, sort }),
  });

  return { cabins, isLoading };
}

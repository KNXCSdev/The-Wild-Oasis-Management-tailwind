import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../api/apiSettings";

export function useSettings() {
  const { data: settings, isLoading } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return { settings, isLoading };
}

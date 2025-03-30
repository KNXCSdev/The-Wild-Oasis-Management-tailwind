import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../api/apiBookings";

export function useTodayActivity() {
  const { isLoading, data: activities } = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ["today-activity"],
  });

  return { isLoading, activities };
}

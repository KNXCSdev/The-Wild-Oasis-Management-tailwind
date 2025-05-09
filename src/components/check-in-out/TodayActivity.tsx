import Spinner from "../../ui/Spinner";
import TodayItem from "./TodayItem";
import { useTodayActivity } from "./useTodayActivity";

export default function TodayActivity() {
  const { isLoading, activities = [] } = useTodayActivity();

  return (
    <div className="bg-grey-0 border-grey-100 col-span-2 flex flex-col gap-[2.4rem] rounded-lg border px-[3.2rem] pt-[2.4rem] pb-[3.2rem]">
      <div className="flex items-center justify-between">
        <h2 className="text-[2rem] leading-[1.4] font-semibold">Today</h2>
      </div>
      {!isLoading ? (
        activities.length > 0 ? (
          <ul className="scrollbar-hide overflow-scroll overflow-x-hidden">
            {activities.map((activity) => (
              <TodayItem activity={activity} key={activity.id} />
            ))}
          </ul>
        ) : (
          <p className="mt-[0.8rem] items-center text-center text-[1.8rem] font-medium">
            No activity Today
          </p>
        )
      ) : (
        <Spinner />
      )}
    </div>
  );
}

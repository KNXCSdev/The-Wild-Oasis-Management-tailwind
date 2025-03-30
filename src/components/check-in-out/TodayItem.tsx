import { Link } from "react-router";
import { useCheckout } from "./useCheckout";

function TodayItem({
  activity,
}: {
  activity: {
    id: number;
    status: string;
    guests: { countryFlag: string; country: string; fullName: string };
    numNights: number;
  };
}) {
  const { checkout } = useCheckout();
  const { id, status, guests, numNights } = activity;

  return (
    <div className="border-b-grey-100 first:border-t-grey-100 grid grid-cols-[9rem_2rem_1fr_7rem_9rem] items-center gap-[1.2rem] border-b px-0 py-[0.8rem] first:border-t">
      {status === "unconfirmed" && (
        <span className="w-fit rounded-full bg-blue-100 px-[1.2rem] py-[0.4rem] text-[1.1rem] font-semibold text-blue-700 uppercase">
          Arriving
        </span>
      )}
      {status === "checked-in" && (
        <span className="w-fit rounded-full bg-green-100 px-[1.2rem] py-[0.4rem] text-[1.1rem] font-semibold text-green-700 uppercase">
          Departing
        </span>
      )}

      <img
        src={guests.countryFlag}
        alt={`Flag of ${guests.country}`}
        className="border-grey-100 block max-w-[2rem] rounded-sm border"
      />
      <div className="text-[1.4rem] font-medium">{guests.fullName}</div>
      <div className="text-[1.3rem]">{numNights} nights</div>

      {status === "unconfirmed" && (
        <Link
          className="text-brand-50 bg-brand-600 rounded-lg border-none px-[0.8rem] py-[0.4rem] text-center text-[1.2rem] font-semibold uppercase shadow-(--shadow-sm)"
          to={`/checkin/${id}`}
        >
          Check in
        </Link>
      )}
      {status === "checked-in" && (
        <button
          className="text-brand-50 bg-brand-600 rounded-lg border-none px-[0.8rem] py-[0.4rem] text-center text-[1.2rem] font-semibold uppercase shadow-(--shadow-sm)"
          onClick={() => checkout(Number(id))}
        >
          Check out
        </button>
      )}
    </div>
  );
}

export default TodayItem;

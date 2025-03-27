import { HiDotsVertical } from "react-icons/hi";
import { formatCurrency } from "../../utils/helpers";

interface BookingRowProps {
  id: number;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  totalPrice: number;
  status: string;
  guests:
    | { fullName: string; email: string }
    | { fullName: string; email: string }[];
  cabins: { name: string } | { name: string }[];
}

export default function BookingsRow({ booking }: { booking: BookingRowProps }) {
  const {
    id: bookingId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    status,
    guests = [],
    cabins = [],
  } = booking;

  const guest = guests ? (Array.isArray(guests) ? guests[0] : guests) : null;
  const cabin = cabins ? (Array.isArray(cabins) ? cabins[0] : cabins) : null;

  return (
    <div className="grid grid-cols-[0.6fr_2fr_2.4fr_1.4fr_1fr_3.2rem] items-center gap-[2.4rem] py-[1.2rem] pr-[2.4rem] pl-[2.6rem] transition-none not-last:border-b not-last:border-b-(--color-grey-100)">
      <div className="text-grey-600 font-['Sono'] text-[1.7rem] font-semibold">
        007
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-medium">{guest?.fullName}</span>
        <span className="text-grey-500 text-xl">{guest?.email}</span>
      </div>
      <div className="flex flex-col gap-2">
        {/* TODO */}
        <span className="font-medium">DATE</span>
        <span className="text-grey-500 text-xl">DATE</span>
      </div>
      <div className="flex flex-col gap-2">
        <span
          className={`w-fit rounded-full px-4 py-2 text-lg text-[1.1rem] font-semibold ${
            status === "unconfirmed"
              ? "bg-blue-100 text-blue-700"
              : status === "checked-in"
                ? "bg-green-100 text-green-700"
                : "bg-silver-100 text-silver-700"
          } uppercase`}
        >
          {status}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-['Sono'] font-medium">
          {formatCurrency(totalPrice)}
        </span>
      </div>
      <div>
        <div className="relative flex items-center justify-end">
          <button className="relative z-20 translate-x-2 cursor-pointer rounded-sm border-none bg-none p-1 transition">
            <HiDotsVertical />
          </button>
        </div>
      </div>
    </div>
  );
}

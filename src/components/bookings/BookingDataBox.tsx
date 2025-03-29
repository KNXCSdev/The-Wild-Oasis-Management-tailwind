import { format, isToday } from "date-fns";
import { formatCurrency, formatDistanceFromNow } from "../../utils/helpers";
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineHomeModern,
} from "react-icons/hi2";
import { HiOutlineCheckCircle, HiOutlineCurrencyDollar } from "react-icons/hi";

interface Guest {
  fullName: string;
  email: string;
  country: string;
  countryFlag: string;
  nationalID: string;
}

interface Cabin {
  name: string;
}

interface Booking {
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  cabinPrice: number;
  extrasPrice: number;
  totalPrice: number;
  hasBreakfast: boolean;
  observations?: string;
  isPaid: boolean;
  guests: Guest;
  cabins: Cabin;
}

export default function BookingDataBox({ booking }: { booking: Booking }) {
  const {
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    cabinPrice,
    extrasPrice,
    totalPrice,
    hasBreakfast,
    observations,
    isPaid,
    guests: { fullName: guestName, email, country, countryFlag, nationalID },
    cabins: { name: cabinName },
  } = booking!;

  return (
    <section className="bg-grey-0 border-grey-100 overflow-hidden rounded-(--border-radius-md) border">
      <header className="bg-brand-500 flex items-center justify-between px-16 py-8 text-[1.8rem] font-medium text-[rgb(224,231,255)]">
        <div className="flex items-center gap-4 text-[1.8rem] font-semibold">
          <HiOutlineHomeModern className="h-14 w-14" /> {numNights} nights in
          Cabin <span className="font-['Sono'] text-[2rem]">{cabinName}</span>
        </div>
        {format(new Date(startDate), "EEE, MMM dd yyyy")} (
        {isToday(new Date(startDate))
          ? "Today"
          : formatDistanceFromNow(startDate)}
        ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
      </header>
      <section className="px-[4rem] pt-[3.2rem] pb-[1.2rem]">
        <div className="text-grey-500 mb-[1.6rem] flex items-center gap-4">
          <img
            src={countryFlag}
            alt={`Flag of ${country}`}
            className="border-grey-100 block max-h-[2rem] max-w-[2rem] rounded-sm border"
          />
          <p className="text-grey-700 font-medium">
            {guestName} {numGuests > 1 ? `+ ${numGuests - 1} guests` : ""}
          </p>
          <span>•</span>
          <p>{email}</p>
          <span>•</span>
          <p>National ID {nationalID}</p>
        </div>

        {observations && (
          <div className="flex items-center gap-4 px-0 py-4">
            <span className="flex items-center gap-4 font-medium">
              <HiOutlineChatBubbleBottomCenterText className="text-brand-600 h-8 w-8" />
              <span>Observations</span>
            </span>

            <span>{observations}</span>
          </div>
        )}

        <div className="flex items-center gap-4 px-0 py-4">
          <span className="flex items-center gap-4 font-medium">
            <HiOutlineCheckCircle className="text-brand-600 h-8 w-8" />
            <span>Breakfast included?</span>
          </span>

          <span>{hasBreakfast ? "Yes" : "No"}</span>
        </div>

        <div
          className={`mt-[2.4rem] flex items-center justify-between rounded-md px-[3.2rem] py-[1.6rem] ${isPaid ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
        >
          <div className="flex items-center gap-4 px-0 py-4">
            <HiOutlineCurrencyDollar className="h-[2.4rem] w-[2.4rem]" />
            <span className="font-medium">Total price</span>
            <span>
              {formatCurrency(totalPrice)}

              {hasBreakfast &&
                ` (${formatCurrency(cabinPrice)} cabin + ${formatCurrency(extrasPrice)} breakfast)`}
            </span>
          </div>
          <p className="text-right font-medium uppercase">
            {isPaid ? "Paid" : "Will pay at property"}
          </p>
        </div>
      </section>
      <footer className="text-grey-500 px-[4rem] py-[1.6rem] text-right text-[1.2rem]">
        <p>Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}</p>
      </footer>
    </section>
  );
}

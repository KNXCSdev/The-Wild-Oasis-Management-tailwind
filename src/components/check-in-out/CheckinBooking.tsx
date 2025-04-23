import { useNavigate } from "react-router";
import Heading from "../../ui/Heading";

import Spinner from "../../ui/Spinner";

import PageNotFound from "../../pages/PageNotFound";
import { useBooking } from "../bookings/useBooking";

import BookingDataBox from "../bookings/BookingDataBox";
import { formatCurrency } from "../../utils/helpers";
import { useSettings } from "../settings/useSettings";
import { useEffect, useState } from "react";
import { useCheckin } from "./useCheckin";

export default function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState<boolean>(false);
  const [addBreakfast, setAddBreakfast] = useState<boolean>(false);
  const { booking, isLoading, bookingId } = useBooking();
  const { checkin, isCheckinIn } = useCheckin();

  const navigate = useNavigate();

  const { settings, isLoading: isLoadingSettings } = useSettings();

  useEffect(() => setConfirmPaid(booking?.isPaid || false), [booking?.isPaid]);

  if (isLoading || isLoadingSettings) return <Spinner />;

  if (!booking) return <PageNotFound />;

  const { guests, totalPrice, numGuests, numNights, status } = booking!;

  const { breakfastPrice } = settings!;

  const optionalBreakfastPrice = breakfastPrice * numNights * numGuests;

  function handleCheckin() {
    if (!confirmPaid) return;

    if (addBreakfast) {
      checkin({
        bookingId: Number(bookingId),
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      checkin({ bookingId: Number(bookingId), breakfast: {} }!);
    }
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Heading title={`Check in booking #${bookingId}`} />
          <span
            className={`flex w-fit items-center rounded-full px-4 py-2 text-lg text-[1.1rem] font-semibold ${
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
        <button
          className="text-brand-600 rounded-(--border-radius-sm) border-none bg-none text-center font-medium transition"
          onClick={() => navigate(`/bookings/${bookingId}`)}
        >
          &larr; Back
        </button>
      </div>
      <BookingDataBox booking={booking} />

      <div className="bg-grey-0 border-grey-100 rounded-lg border px-[4rem] py-[2.4rem]">
        <div className="flex items-center gap-6">
          <input
            type="checkbox"
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add);
              setConfirmPaid(false);
            }}
            id="breakfast"
            className="accent-brand-600 h-[2.4rem] w-[2.4rem] origin-center outline-offset-4"
          />
          <label htmlFor="breakfast">
            {" "}
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}
          </label>
        </div>
      </div>

      <div className="bg-grey-0 border-grey-100 rounded-lg border px-[4rem] py-[2.4rem]">
        <div className="flex items-center gap-6">
          <input
            id="confirm"
            type="checkbox"
            checked={confirmPaid}
            disabled={confirmPaid && isCheckinIn}
            onChange={() => setConfirmPaid((confirm) => !confirm)}
            className="accent-brand-600 h-[2.4rem] w-[2.4rem] origin-center outline-offset-4"
          />

          <label htmlFor="confirm">
            I confirm that {guests.fullName} has paid the total amount of{" "}
            {!addBreakfast
              ? formatCurrency(totalPrice)
              : `${formatCurrency(totalPrice + optionalBreakfastPrice)} (${formatCurrency(
                  totalPrice,
                )} + ${formatCurrency(optionalBreakfastPrice)})`}
          </label>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button
          className="bg-brand-600 text-brand-50 rounded-xl border-none px-8 py-6 text-[1.4rem] font-medium shadow-(--shadow-sm)"
          onClick={handleCheckin}
          disabled={isCheckinIn}
        >
          Check in booking #{bookingId}
        </button>

        <button
          className="bg-grey-0 text-grey-600 border-grey-200 rounded-xl border px-8 py-6 text-[1.4rem] font-medium shadow-(--shadow-sm)"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
    </>
  );
}

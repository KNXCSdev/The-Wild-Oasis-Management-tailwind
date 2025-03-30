import { useNavigate } from "react-router";
import Heading from "../../ui/Heading";

import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";

import BookingDataBox from "./BookingDataBox";
import DeleteModal from "../../ui/DeleteModal";
import { useState } from "react";

import { useDeleteBooking } from "./useDeleteBooking";
import PageNotFound from "../../pages/PageNotFound";
import { useCheckout } from "../check-in-out/useCheckout";

export default function BookingDetails() {
  const navigate = useNavigate();
  const { booking, isLoading, bookingId } = useBooking();
  const { checkout, isCheckinOut } = useCheckout();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { deleteBooking } = useDeleteBooking();

  if (isLoading) return <Spinner />;

  if (!booking) return <PageNotFound />;

  const { status } = booking;

  const handleDelete = () => {
    deleteBooking(booking.id, { onSettled: () => navigate(-1) });
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Heading title={`Booking #${bookingId}`} />
          <span
            className={`flex w-fit items-center rounded-full px-4 py-2 text-[1.1rem] font-semibold ${
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
          onClick={() => navigate("/bookings")}
        >
          &larr; Back
        </button>
      </div>
      <BookingDataBox booking={booking} />
      <div className="flex justify-end gap-4">
        {status === "unconfirmed" && (
          <button
            className="bg-brand-600 text-brand-50 rounded-xl border-none px-8 py-6 text-[1.4rem] font-medium shadow-(--shadow-sm)"
            onClick={() => navigate(`/checkin/${bookingId}`)}
          >
            Check in
          </button>
        )}

        {status === "checked-in" && (
          <button
            className="bg-brand-600 text-brand-50 rounded-xl border-none px-8 py-6 text-[1.4rem] font-medium shadow-(--shadow-sm)"
            onClick={() => checkout(Number(bookingId))}
            disabled={isCheckinOut}
          >
            Check out
          </button>
        )}

        <button
          className="text-brand-50 rounded-xl border-none bg-red-700 px-8 py-6 text-[1.4rem] font-medium shadow-(--shadow-sm)"
          onClick={() => setIsDeleteModalOpen(true)}
        >
          Delete Booking
        </button>

        <button
          className="bg-grey-0 text-grey-600 border-grey-200 rounded-xl border px-8 py-6 text-[1.4rem] font-medium shadow-(--shadow-sm)"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>{" "}
      {isDeleteModalOpen && (
        <DeleteModal
          title="Delete Booking"
          message="Are you sure you want to delete this booking permanently? This action cannot be undone."
          onConfirm={handleDelete}
          onCancel={() => setIsDeleteModalOpen(false)}
        />
      )}
    </>
  );
}

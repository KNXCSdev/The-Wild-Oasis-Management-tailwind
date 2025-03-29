import { HiDotsVertical, HiEye, HiTrash } from "react-icons/hi";
import { formatCurrency, formatDistanceFromNow } from "../../utils/helpers";
import { format, isToday } from "date-fns";
import { Menu } from "../../ui/Menu";
import { HiArrowDownOnSquare, HiArrowUpOnSquare } from "react-icons/hi2";
import { useDeleteBooking } from "./useDeleteBooking";
import { useNavigate } from "react-router";
import DeleteModal from "../../ui/DeleteModal";
import { useState } from "react";

interface BookingProps {
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

interface BookingsRowProps {
  booking: BookingProps;
  openMenuId: number | null;
  toggleMenu: (id: number) => void;
}

export default function BookingsRow({
  booking,
  openMenuId,
  toggleMenu,
}: BookingsRowProps) {
  const { deleteBooking } = useDeleteBooking();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const navigate = useNavigate();

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

  const formattedDateStart = format(new Date(startDate), "MMM dd yyyy");
  const formattedDateEnd = format(new Date(endDate), "MMM dd yyyy");

  const actions = [
    {
      label: "See Details",
      icon: <HiEye className="text-grey-400 h-6 w-6 transition" />,
      onClick: () => navigate(`/bookings/${bookingId}`),
    },
    {
      label: "Delete Booking",
      icon: <HiTrash className="text-grey-400 h-6 w-6 transition" />,
      onClick: () => setIsDeleteModalOpen(true),
    },
    {
      label: "Check in",
      icon: (
        <HiArrowDownOnSquare className="text-grey-400 h-6 w-6 transition" />
      ),
      onClick: () => console.log("Cancel Booking clicked"),
    },
    {
      label: "Check out",
      icon: <HiArrowUpOnSquare className="text-grey-400 h-6 w-6 transition" />,
      onClick: () => console.log("Cancel Booking clicked"),
    },
  ];

  const handleDelete = () => {
    deleteBooking(booking.id);
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="grid grid-cols-[0.6fr_2fr_2.4fr_1.4fr_1fr_3.2rem] items-center gap-[2.4rem] py-[1.2rem] pr-[2.4rem] pl-[2.6rem] transition-none not-last:border-b not-last:border-b-(--color-grey-100)">
      <div className="text-grey-600 font-['Sono'] text-[1.7rem] font-semibold">
        {cabin?.name}
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-medium">{guest?.fullName}</span>
        <span className="text-grey-500 text-xl">{guest?.email}</span>
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-medium">
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span className="text-grey-500 text-xl">
          {formattedDateStart + " — " + formattedDateEnd}
        </span>
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
          <button
            className="relative z-20 translate-x-2 cursor-pointer rounded-sm border-none bg-none p-1 transition"
            onClick={() => toggleMenu(bookingId)}
          >
            <HiDotsVertical />
          </button>

          {openMenuId === bookingId && (
            <>
              <Menu actions={actions} />
              <div
                className="fixed top-0 left-0 z-10 h-screen w-screen bg-none"
                onClick={() => toggleMenu(bookingId)}
              ></div>
            </>
          )}
        </div>{" "}
        {isDeleteModalOpen && (
          <DeleteModal
            title="Delete Booking"
            message="Are you sure you want to delete this booking permanently? This action cannot be undone."
            onConfirm={handleDelete}
            onCancel={() => setIsDeleteModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
}

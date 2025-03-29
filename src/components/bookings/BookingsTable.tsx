import MoonLoader from "react-spinners/MoonLoader";
import TableHeader from "../../ui/TableHeader";
import BookingsRow from "./BookingsRow";
import { useBookings } from "./useBookings";
import Empty from "../../ui/Empty";
import BookingsPagination from "./BookingPagination";

export default function BookingsTable() {
  const { bookings, isLoading, count } = useBookings();

  if (isLoading)
    return (
      <div className="self-center">
        <MoonLoader color="#0038ff" />
      </div>
    );

  if (!bookings?.length) return <Empty resource="bookings" />;

  return (
    <>
      <div className="flex flex-col gap-[1.6rem]">
        <div
          role="table"
          className="bg-grey-0 overflow-hidden rounded-lg border border-(--color-grey-200) text-2xl"
        >
          <TableHeader gridRows="grid-cols-[0.6fr_2fr_2.4fr_1.4fr_1fr_3.2rem]">
            <div>Cabin</div>
            <div>Guest</div>
            <div>Dates</div>
            <div>Status</div>
            <div>Amount</div>
          </TableHeader>
          <section className="mx-0 my-[0.4rem]">
            {bookings?.map((booking) => (
              <BookingsRow booking={booking} key={booking.id} />
            ))}
          </section>
          <BookingsPagination count={count} />
        </div>
      </div>
    </>
  );
}

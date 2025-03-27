import BookingsTable from "../components/bookings/BookingsTable";
import Heading from "../ui/Heading";

export default function Bookings() {
  return (
    <>
      <Heading title="All Bookings" />
      <BookingsTable />
    </>
  );
}

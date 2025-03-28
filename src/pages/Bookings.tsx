import BookingsTable from "../components/bookings/BookingsTable";
import Filter from "../ui/Filter";
import Heading from "../ui/Heading";

export default function Bookings() {
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="All Bookings" />
        <Filter
          filterField="status"
          options={[
            { value: "all", label: "All" },
            { value: "checked-out", label: "Checked out" },
            { value: "checked-in", label: "Checked in" },
            { value: "unconfirmed", label: "Unconfirmed" },
          ]}
        />
      </div>

      <BookingsTable />
    </>
  );
}

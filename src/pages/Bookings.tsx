import BookingsTable from "../components/bookings/BookingsTable";
import Filter from "../ui/Filter";
import Heading from "../ui/Heading";
import SortSelect from "../ui/SortSelect";

export default function Bookings() {
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="All Bookings" />
        <div className="flex items-center gap-6">
          <Filter
            filterField="status"
            options={[
              { value: "all", label: "All" },
              { value: "checked-out", label: "Checked out" },
              { value: "checked-in", label: "Checked in" },
              { value: "unconfirmed", label: "Unconfirmed" },
            ]}
          />
          <SortSelect
            options={[
              { value: "startDate-desc", label: "Sort by date (recent first)" },
              { value: "startDate-asc", label: "Sort by date (earlier first)" },
              {
                value: "totalPrice-desc",
                label: "Sort by amount (high first)",
              },
              { value: "totalPrice-asc", label: "Sort by amount (low first)" },
            ]}
          />
        </div>
      </div>

      <BookingsTable />
    </>
  );
}

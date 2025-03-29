import CabinTable from "../components/cabins/CabinTable";
import Filter from "../ui/Filter";
import Heading from "../ui/Heading";
import SortSelect from "../ui/SortSelect";

export default function Cabins() {
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="All cabins" />
        <div className="flex items-center gap-6">
          <Filter
            filterField="status"
            options={[
              { value: "all", label: "All" },
              { value: "no-discount", label: "No discount" },
              { value: "with-discount", label: "With discount" },
            ]}
          />
          <SortSelect
            options={[
              { value: "name-asc", label: "Sort by name (A-Z)" },
              { value: "name-desc", label: "Sort by name (Z-A)" },
              {
                value: "regularPrice-asc",
                label: "Sort by price (low first)",
              },
              {
                value: "regularPrice-desc",
                label: "Sort by price (high first)",
              },
              {
                value: "maxCapacity-asc",
                label: "Sort by capacity (low first)",
              },
              {
                value: "maxCapacity-desc",
                label: "Sort by capacity (high first)",
              },
            ]}
          />
        </div>
      </div>
      <CabinTable />
    </>
  );
}

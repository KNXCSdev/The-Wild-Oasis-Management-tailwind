import CabinTable from "../components/cabins/CabinTable";
import Filter from "../ui/Filter";
import Heading from "../ui/Heading";

export default function Cabins() {
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="All cabins" />
        <Filter
          filterField="status"
          options={[
            { value: "all", label: "All" },
            { value: "no-discount", label: "No discount" },
            { value: "with-discount", label: "With discount" },
          ]}
        />
      </div>
      <CabinTable />
    </>
  );
}

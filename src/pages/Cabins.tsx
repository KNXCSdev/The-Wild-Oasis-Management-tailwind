import CabinTable from "../components/cabins/CabinTable";
import Heading from "../ui/Heading";

export default function Cabins() {
  return (
    <div className="mx-auto my-0 flex w-full max-w-[120rem] flex-col gap-[3.2rem]">
      <Heading title="All cabins" />
      <CabinTable />
    </div>
  );
}

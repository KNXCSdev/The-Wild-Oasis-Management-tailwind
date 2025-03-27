import { useState } from "react";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import MoonLoader from "react-spinners/MoonLoader";
import CabinForm from "./CabinForm";
import TableHeader from "../../ui/TableHeader";

export default function CabinTable() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { cabins, isLoading } = useCabins();
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [selectedCabins, setSelectedCabins] = useState<number[]>([]);

  if (isLoading)
    return (
      <div className="self-center">
        <MoonLoader color="#0038ff" />
      </div>
    );

  const toggleMenu = (id: number) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  return (
    <>
      <div className="flex flex-col gap-[1.6rem]">
        <div
          role="table"
          className="bg-grey-0 overflow-hidden rounded-md border border-(--color-grey-200) text-2xl"
        >
          <TableHeader gridRows={"0.2fr_0.6fr_1.8fr_2.2fr_1fr_1fr_1fr"}>
            <div></div>
            <div></div>
            <div>Cabin</div>
            <div>Capacity</div>
            <div>Price</div>
            <div>Discount</div>
            <div></div>
          </TableHeader>
          <section className="mx-0 my-[0.4rem]">
            {cabins?.map((cabin) => (
              <CabinRow
                cabin={cabin}
                key={cabin.id}
                toggleMenu={toggleMenu}
                openMenuId={openMenuId}
              />
            ))}
          </section>
        </div>
        <div>
          <button
            className="text-brand-50 bg-brand-600 rounded-lg border-none px-[1.6rem] py-[1.2rem] text-xl font-medium shadow-(--shadow-sm)"
            onClick={() => setIsOpen(!isOpen)}
          >
            Add new cabin
          </button>{" "}
          {selectedCabins.length > 0 && (
            <button className="text-brand-50 rounded-lg border-none bg-red-600 px-[1.6rem] py-[1.2rem] text-xl font-medium shadow-(--shadow-sm)">
              Delete selected cabins
            </button>
          )}
        </div>
      </div>
      {isOpen && <CabinForm showForm={setIsOpen} />}
    </>
  );
}

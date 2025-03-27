import { HiDotsVertical } from "react-icons/hi";
import { formatCurrency } from "../../utils/helpers";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useDuplicateCabin } from "./useDuplicateCabin";

interface Cabin {
  id: number;
  discount: number;
  created_at: string;
  description: string;
  image: string;
  maxCapacity: number;
  name: string;
  regularPrice: number;
}

interface CabinRowProps {
  cabin: Cabin;
  openMenuId: number | null;
  toggleMenu: (id: number) => void;
}

export default function CabinRow({
  cabin,
  openMenuId,
  toggleMenu,
}: CabinRowProps) {
  const { mutate: deleteCabin } = useDeleteCabin();
  const { mutate: duplicateCabin } = useDuplicateCabin();
  const { description, discount, id, image, maxCapacity, name, regularPrice } =
    cabin;

  function handleDuplicate() {
    duplicateCabin(
      {
        name: `Copy of ${name}`,
        description,
        image,
        maxCapacity,
        regularPrice,
        discount,
      },
      { onSettled: () => toggleMenu(id) },
    );
  }

  return (
    <div className="grid grid-cols-[0.2fr_0.6fr_1.9fr_2.2fr_1fr_1fr_1fr] items-center gap-[2.4rem] py-[1.2rem] pr-[2.4rem] pl-[1.2rem] transition-none not-last:border-b not-last:border-b-(--color-grey-100)">
      <input type="checkbox" className="h-7 w-7 cursor-pointer" />
      <img
        src={image}
        alt="Cabin"
        loading="lazy"
        className="block aspect-[3/2] w-26 scale-[1.5] object-cover object-center"
      />
      <div className="text-grey-600 font-['Sono'] text-[1.6rem] font-bold">
        {name}
      </div>
      <div>Fits up to {maxCapacity} guests</div>
      <div className="font-['Sono'] font-semibold">
        {formatCurrency(regularPrice)}
      </div>
      <span
        className={discount ? "font-['Sono'] font-medium text-green-700" : ""}
      >
        {discount ? formatCurrency(discount) : "-"}
      </span>
      <div>
        <div className="relative flex items-center justify-end">
          <button
            className="relative z-20 translate-x-2 cursor-pointer rounded-sm border-none bg-none p-1 transition"
            onClick={() => toggleMenu(id)}
          >
            <HiDotsVertical />
          </button>
          {openMenuId === id && (
            <>
              <CabinMenu
                deleteCabin={() => deleteCabin(id)}
                handleDuplicate={handleDuplicate}
              />
              <div
                className="fixed top-0 left-0 z-10 h-screen w-screen bg-none"
                onClick={() => toggleMenu(id)}
              ></div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

interface CabinMenuProps {
  deleteCabin: () => void;
  handleDuplicate: () => void;
}

function CabinMenu({ deleteCabin, handleDuplicate }: CabinMenuProps) {
  return (
    <ul className="bg-grey-0 absolute top-[25px] right-[2.0156px] z-30 list-none rounded-md shadow-md">
      <li>
        <button className="hover:bg-grey-50 flex w-full cursor-pointer items-center gap-[1.6rem] border-none bg-none px-12 py-5 text-left text-[1.4rem] transition">
          <HiPencil className="text-grey-400 h-6 w-6 transition" />
          <span>Edit</span>
        </button>
      </li>
      <li>
        <button
          className="hover:bg-grey-50 flex w-full cursor-pointer items-center gap-[1.6rem] border-none bg-none px-12 py-5 text-left text-[1.4rem] transition"
          onClick={handleDuplicate}
        >
          <HiSquare2Stack className="text-grey-400 h-6 w-6 transition" />
          <span>Duplicate</span>
        </button>
      </li>
      <li>
        <button
          className="hover:bg-grey-50 flex w-full cursor-pointer items-center gap-[1.6rem] border-none bg-none px-12 py-5 text-left text-[1.4rem] transition"
          onClick={deleteCabin}
        >
          <HiTrash className="text-grey-400 h-6 w-6 transition" />
          <span>Delete</span>
        </button>
      </li>
    </ul>
  );
}

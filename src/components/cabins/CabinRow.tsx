import { HiDotsVertical } from "react-icons/hi";
import { formatCurrency } from "../../utils/helpers";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useDuplicateCabin } from "./useDuplicateCabin";
import { Menu } from "../../ui/Menu";
import { useState } from "react";
import DeleteModal from "../../ui/DeleteModal";
import CabinForm from "./CabinForm";

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
  handleSelectCabin: (id: number) => void;
  selectedCabins: number[];
}

export default function CabinRow({
  cabin,
  openMenuId,
  toggleMenu,
  handleSelectCabin,
  selectedCabins,
}: CabinRowProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { mutate: deleteCabin } = useDeleteCabin();
  const { mutate: duplicateCabin } = useDuplicateCabin();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
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

  const handleDelete = () => {
    deleteCabin(id);
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="grid grid-cols-[0.2fr_0.6fr_1.9fr_2.2fr_1fr_1fr_1fr] items-center gap-[2.4rem] py-[1.2rem] pr-[2.4rem] pl-[1.2rem] transition-none not-last:border-b not-last:border-b-(--color-grey-100)">
      <input
        type="checkbox"
        className="h-7 w-7 cursor-pointer"
        onChange={() => handleSelectCabin(id)}
        checked={selectedCabins.includes(id)}
      />
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
              <Menu
                actions={[
                  {
                    label: "Edit",
                    icon: (
                      <HiPencil className="text-grey-400 h-6 w-6 transition" />
                    ),
                    onClick: () => {
                      setIsOpen(!isOpen);
                      toggleMenu(id);
                    },
                  },
                  {
                    label: "Duplicate",
                    icon: (
                      <HiSquare2Stack className="text-grey-400 h-6 w-6 transition" />
                    ),
                    onClick: handleDuplicate,
                  },
                  {
                    label: "Delete",
                    icon: (
                      <HiTrash className="text-grey-400 h-6 w-6 transition" />
                    ),
                    onClick: () => setIsDeleteModalOpen(true),
                  },
                ]}
              />
              <div
                className="fixed top-0 left-0 z-10 h-screen w-screen bg-none"
                onClick={() => toggleMenu(id)}
              ></div>
            </>
          )}
        </div>
        {isDeleteModalOpen && (
          <DeleteModal
            title="Delete Cabin"
            message="Are you sure you want to delete this cabin permanently? This action cannot be undone."
            onConfirm={handleDelete}
            onCancel={() => setIsDeleteModalOpen(false)}
          />
        )}
        {isOpen && <CabinForm showForm={setIsOpen} cabin={cabin} id={id} />}
      </div>
    </div>
  );
}

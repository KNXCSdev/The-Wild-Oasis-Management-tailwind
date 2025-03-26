import { formatCurrency } from "../../utils/helpers";

interface CabinTypes {
  cabin: {
    id: number;
    discount: number;
    created_at: string;
    description: string;
    image: string;
    maxCapacity: number;
    name: string;
    regularPrice: number;
  };
}

export default function CabinRow({ cabin }: CabinTypes) {
  return (
    <div className="grid grid-cols-[0.6fr_1.8fr_2.2fr_1fr_1fr_1fr] items-center gap-[2.4rem] px-[2.4rem] py-[1.2rem] transition-none not-last:border-b not-last:border-b-(--color-grey-100)">
      <img
        src={cabin.image}
        alt="Cabin"
        loading="lazy"
        className="block aspect-[3/2] w-26 -translate-x-4 scale-[1.5] object-cover object-center"
      />
      <div className="text-grey-600 font-['Sono'] text-2xl font-semibold">
        {cabin.name}
      </div>
      <div>Fits up to {cabin.maxCapacity} guests</div>
      <div className="font-['Sono'] font-semibold">
        {formatCurrency(cabin.regularPrice)}
      </div>
      <span
        className={
          cabin.discount ? "font-['Sono'] font-medium text-green-700" : ""
        }
      >
        {cabin.discount ? formatCurrency(cabin.discount) : "-"}
      </span>
      <div>
        <div className="flex items-center justify-end">
          <button className="translate-x-2 rounded-sm border-none bg-none p-1 transition">
            .
          </button>
        </div>
      </div>
    </div>
  );
}

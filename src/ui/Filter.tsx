import { useSearchParams } from "react-router";

interface FilterTypes {
  filterField: string;
  options: { value: string; label: string }[];
}

export default function Filter({ filterField, options }: FilterTypes) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentFilter = searchParams.get(filterField) || options.at(0)!.value;

  function handleClick(value: string) {
    searchParams.set(filterField, value);
    if (searchParams.get("page")) searchParams.set("page", "1");
    setSearchParams(searchParams);
  }

  return (
    <div className="flex items-center gap-6">
      <div className="border-grey-100 bg-grey-0 flex gap-2 rounded-lg border p-2 shadow-(--shadow-sm)">
        {options.map((option) => (
          <button
            className={`hover:bg-brand-600 hover:text-brand-50 rounded-md border-none px-3 py-1 text-[1.4rem] font-medium transition ${option.value === currentFilter ? "bg-brand-600 text-brand-50" : "bg-grey-0"}`}
            onClick={() => handleClick(option.value)}
            key={option.label}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

import { useSearchParams } from "react-router";

interface FilterTypes {
  options: { value: string; label: string }[];
}

export default function SortSelect({ options }: FilterTypes) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleSort(value: string) {
    searchParams.set("sort", value);

    setSearchParams(searchParams);
  }

  return (
    <select
      className="border-grey-100 bg-grey-0 shadow(--shadow-sm) rounded-lg border px-[1.2rem] py-[0.8rem] text-[1.5rem] font-medium"
      onChange={(e) => handleSort(e.target.value)}
    >
      {options.map((option) => (
        <option value={option.value} key={option.label}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

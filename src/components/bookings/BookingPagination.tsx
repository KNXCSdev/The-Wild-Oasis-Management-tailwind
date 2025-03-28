import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { useSearchParams } from "react-router";
import { PAGE_SIZE } from "../../utils/constants";

export default function BookingsPagination({ count }: { count: number }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const pageCount = Math.ceil(count / PAGE_SIZE);

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;

    searchParams.set("page", String(next));
    setSearchParams(searchParams);
  }

  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;

    searchParams.set("page", String(prev));
    setSearchParams(searchParams);
  }

  if (pageCount === 1) return null;

  return (
    <footer className="bg-grey-50 flex items-center justify-between py-3 pr-3 pl-10">
      <p>
        Showing{" "}
        <span className="font-semibold">
          {(currentPage - 1) * PAGE_SIZE + 1}
        </span>{" "}
        to{" "}
        <span className="font-semibold">
          {currentPage === pageCount ? count : currentPage * PAGE_SIZE}
        </span>{" "}
        of <span className="font-semibold">{count}</span> results
      </p>
      <div className="flex items-center gap-6 font-medium">
        <button
          className="hover:bg-brand-600 hover:text-grey-50 flex items-center justify-center rounded-md border-none px-5 py-3 transition"
          disabled={currentPage === 1}
          onClick={prevPage}
        >
          <HiOutlineChevronLeft className="h-[1.9rem] w-[1.9rem]" />
          Previous
        </button>
        <button
          className="hover:bg-brand-600 hover:text-grey-50 flex items-center justify-center rounded-md border-none px-5 py-3 transition"
          disabled={currentPage === pageCount}
          onClick={nextPage}
        >
          Next <HiOutlineChevronRight className="h-[1.9rem] w-[1.9rem]" />
        </button>
      </div>
    </footer>
  );
}

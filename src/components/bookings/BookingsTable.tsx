import TableHeader from "../../ui/TableHeader";

export default function BookingsTable() {
  return (
    <>
      <div className="flex flex-col gap-[1.6rem]">
        <div
          role="table"
          className="bg-grey-0 overflow-hidden rounded-lg border border-(--color-grey-200) text-2xl"
        >
          <TableHeader gridRows={"0.6fr_2fr_2.4fr_1.4fr_1fr_3.2rem"}>
            <div>Cabin</div>
            <div>Guest</div>
            <div>Dates</div>
            <div>Status</div>
            <div>Amount</div>
          </TableHeader>
          <section className="mx-0 my-[0.4rem]"></section>
        </div>
      </div>
    </>
  );
}

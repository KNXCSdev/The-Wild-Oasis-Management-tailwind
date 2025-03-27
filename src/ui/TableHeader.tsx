export default function TableHeader({
  gridRows,
  children,
}: {
  gridRows: string;
  children: React.ReactNode;
}) {
  return (
    <header
      className={`bg-grey-50 text-grey-600 grid grid-cols-[${gridRows}] items-center gap-[2.2rem] border-b border-b-(--color-grey-100) px-[2.4rem] py-[1.6rem] font-semibold uppercase transition-none`}
    >
      {children}
    </header>
  );
}

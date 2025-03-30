export default function DashboardBox({
  bg,
  text,
  icon,
  value,
}: {
  bg: string;
  text: string;
  icon: JSX.Element;
  value: string | number;
}) {
  return (
    <div className="bg-grey-0 border-grey-100 grid grid-cols-[6.4rem_1fr] grid-rows-[auto_auto] gap-[0.4rem_1.6rem] rounded-lg border p-[1.6rem]">
      <div
        className={`row-span-full flex aspect-[1/1] items-center justify-center rounded-[50%] ${bg}`}
      >
        {icon}
      </div>
      <h5 className="text-grey-500 self-end text-[1.2rem] font-semibold uppercase">
        {text}
      </h5>
      <p className="text-[2.4rem] leading-[1] font-medium">{value}</p>
    </div>
  );
}

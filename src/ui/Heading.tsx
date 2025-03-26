export default function Heading({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-5xl leading-[1.4] font-semibold">{title}</h1>
    </div>
  );
}

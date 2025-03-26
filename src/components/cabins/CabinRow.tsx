export default function CabinRow() {
  return (
    <div className="grid grid-cols-[0.6fr_1.8fr_2.2fr_1fr_1fr_1fr] items-center gap-[2.4rem] border-b border-b-(--color-grey-100) px-[2.4rem] py-[1.2rem] transition-none">
      <img src="" alt="" />
      <div className="text-grey-600 font-['Sono'] text-2xl font-semibold">
        000
      </div>
      <div>Fits up</div>
      <div className="font-['Sono'] font-semibold">$140.23</div>
      <span>—</span>
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

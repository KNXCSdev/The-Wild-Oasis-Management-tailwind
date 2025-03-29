interface DeleteModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteModal({
  title,
  message,
  onConfirm,
  onCancel,
}: DeleteModalProps) {
  return (
    <div
      className="fixed top-0 left-0 z-50 h-screen w-full bg-(--backdrop-color) backdrop-blur-xs transition"
      onClick={onCancel}
    >
      <div className="bg-grey-0 fixed top-1/2 left-1/2 -translate-1/2 rounded-xl px-[4rem] py-[3.2rem] shadow-(--shadow-lg) transition">
        <button
          className="absolute top-8 right-10 translate-x-4 rounded-md border-none bg-none p-4 transition"
          onClick={onCancel}
        >
          ✕
        </button>
        <div>
          <div className="flex w-[40rem] flex-col gap-6">
            <h3 className="text-[2rem] leading-[1.4] font-medium">{title}</h3>
            <p className="text-grey-500 mb-[1.2rem]">{message}</p>
            <div className="flex justify-end gap-6">
              <button
                className="text-grey-600 bg-grey-50 border-grey-200 rounded-xl border px-8 py-5 text-[1.4rem] font-medium shadow-(--shadow-sm)"
                onClick={onCancel}
              >
                Cancel
              </button>
              <button
                className="text-brand-50 rounded-xl border-none bg-red-700 px-8 py-5 text-[1.4rem] font-medium shadow-(--shadow-sm)"
                onClick={onConfirm}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

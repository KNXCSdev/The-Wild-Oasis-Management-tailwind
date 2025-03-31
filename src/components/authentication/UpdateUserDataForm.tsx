import { useUser } from "./useUser";

export default function UpdateUserDataForm() {
  const { user } = useUser();
  const {
    email,
    user_metadata: { fullName: currentFullName },
  } = user!;

  return (
    <div className="flex flex-col gap-[1.6rem]">
      <h3 className="text-[2rem] leading-[1.4] font-medium">
        Update user data
      </h3>
      <form className="bg-grey-0 border-grey-100 overflow-hidden rounded-lg border px-[4rem] py-[2.4rem] text-[1.4rem]">
        <div className="grid grid-cols-[24rem_1fr_1.2fr] items-center gap-[2.4rem] border-b border-b-(--color-grey-100) px-0 py-[1.2rem] pt-0">
          <label htmlFor="email" className="font-medium">
            Email address
          </label>
          <input
            type="text"
            value={email}
            disabled
            id="email"
            className="disabled:bg-grey-200 disabled:text-grey-500 border-grey-300 rounded-md border px-[1.2rem] py-[0.8rem] shadow-(--shadow-sm) disabled:cursor-not-allowed"
          />
        </div>
        <div className="grid grid-cols-[24rem_1fr_1.2fr] items-center gap-[2.4rem] border-b border-b-(--color-grey-100) px-0 py-[1.2rem]">
          <label htmlFor="fullName" className="font-medium">
            Full name
          </label>
          <input
            type="text"
            defaultValue={currentFullName}
            id="fullName"
            className="border-grey-300 rounded-md border px-[1.2rem] py-[0.8rem] shadow-(--shadow-sm)"
          />
        </div>
        <div className="grid grid-cols-[24rem_1fr_1.2fr] items-center gap-[2.4rem] border-b border-b-(--color-grey-100) px-0 py-[1.2rem]">
          <label htmlFor="avatar" className="font-medium">
            Avatar image
          </label>{" "}
          <input
            id="avatar"
            type="file"
            accept="image/*"
            className="file:text-brand-50 file:bg-brand-600 file:hover:bg-brand-700 mr-[1.2rem] rounded-(--border-radius-sm) text-[1.4rem] file:cursor-pointer file:rounded-lg file:border-none file:px-[1.2rem] file:py-[0.8rem] file:font-medium file:transition"
          />
        </div>
        <div className="flex items-center justify-end gap-[1.2rem] px-0 py-[1.2rem] pb-0">
          <button className="text-grey-600 bg-grey-0 hover:bg-grey-50 rounded-lg border border-(--color-grey-200) px-[1.6rem] py-[1.2rem] text-[1.4rem] font-medium shadow-(--shadow-sm)">
            Cancel
          </button>
          <button className="text-brand-50 bg-brand-600 hover:bg-brand-700 rounded-lg border-none px-[1.6rem] py-[1.2rem] text-[1.4rem] font-medium shadow-(--shadow-sm)">
            Update account
          </button>
        </div>
      </form>
    </div>
  );
}

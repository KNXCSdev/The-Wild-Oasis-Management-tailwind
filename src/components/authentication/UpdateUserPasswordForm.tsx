import { SubmitHandler, useForm } from "react-hook-form";
import { useUpdateUser } from "./useUpdateUser";

interface UpdateUserPasswordFormProps {
  password: string;
  confirmPassword: string;
}

export default function UpdateUserPasswordForm() {
  const { register, handleSubmit, reset, getValues } =
    useForm<UpdateUserPasswordFormProps>();
  const { updateUser, isUpdatingUser } = useUpdateUser();

  const onSubmit: SubmitHandler<UpdateUserPasswordFormProps> = (data) => {
    updateUser({
      password: data.password,
    });
  };

  return (
    <div className="flex flex-col gap-[1.6rem]">
      <h3 className="text-[2rem] leading-[1.4] font-medium">Update password</h3>
      <form
        className="bg-grey-0 border-grey-100 overflow-hidden rounded-lg border px-[4rem] py-[2.4rem] text-[1.4rem]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-[24rem_1fr_1.2fr] items-center gap-[2.4rem] border-b border-b-(--color-grey-100) px-0 py-[1.2rem] pt-0">
          <label htmlFor="password" className="font-medium">
            Password (min 8 characters)
          </label>
          <input
            type="password"
            id="password"
            className="disabled:bg-grey-200 disabled:text-grey-500 border-grey-300 rounded-md border px-[1.2rem] py-[0.8rem] shadow-(--shadow-sm) disabled:cursor-not-allowed"
            disabled={isUpdatingUser}
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 8,
                message: "Password needs a minimum of 8 characters",
              },
            })}
          />
        </div>
        <div className="grid grid-cols-[24rem_1fr_1.2fr] items-center gap-[2.4rem] border-b border-b-(--color-grey-100) px-0 py-[1.2rem]">
          <label htmlFor="confirmPassword" className="font-medium">
            Confirm password
          </label>
          <input
            type="password"
            id="confirmPassword"
            disabled={isUpdatingUser}
            className="border-grey-300 rounded-md border px-[1.2rem] py-[0.8rem] shadow-(--shadow-sm)"
            {...register("confirmPassword", {
              required: "This field is required",
              validate: (value) =>
                value === getValues().password || "Passwords need to match",
            })}
          />
        </div>
        <div className="flex items-center justify-end gap-[1.2rem] px-0 py-[1.2rem] pb-0">
          <button
            className="text-grey-600 bg-grey-0 hover:bg-grey-50 rounded-lg border border-(--color-grey-200) px-[1.6rem] py-[1.2rem] text-[1.4rem] font-medium shadow-(--shadow-sm)"
            type="button"
            onClick={() => reset()}
          >
            Cancel
          </button>
          <button className="text-brand-50 bg-brand-600 hover:bg-brand-700 rounded-lg border-none px-[1.6rem] py-[1.2rem] text-[1.4rem] font-medium shadow-(--shadow-sm)">
            Update password
          </button>
        </div>
      </form>
    </div>
  );
}

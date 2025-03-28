import { SubmitHandler, useForm } from "react-hook-form";
import { useAddUser } from "./useAddUser";

interface UserSubmitProps {
  fullName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export default function UsersForm() {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<UserSubmitProps>();

  const { isSigninUp, signUpNewUser } = useAddUser();

  const onSubmit: SubmitHandler<UserSubmitProps> = (data) => {
    const userData = {
      fullName: data.fullName,
      email: data.email,
      password: data.password,
    };

    signUpNewUser(userData, { onSettled: () => reset() });
  };

  return (
    <div className="bg-grey-0 rounded-(--border-radius-lg) px-[4rem] py-[3.2rem] transition">
      <form
        className="w-full overflow-hidden text-2xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-[24rem_1fr_1.2fr] items-center gap-6 px-0 py-5 not-last:border-b not-last:border-b-(--color-grey-100) first:pt-0">
          <label htmlFor="fullName" className="font-medium">
            Full name
          </label>
          <input
            type="text"
            id="fullName"
            className="bg-grey-0 h-full rounded-md border border-(--color-grey-300) px-3 py-3 text-[1.6rem] shadow-(--shadow-sm)"
            disabled={isSigninUp}
            {...register("fullName", { required: "This field is required" })}
          />
          <span className="text-red-600">
            {errors?.fullName?.message as string | undefined}
          </span>
        </div>
        <div className="grid grid-cols-[24rem_1fr_1.2fr] items-center gap-6 px-0 py-5 not-last:border-b not-last:border-b-(--color-grey-100) first:pt-0">
          <label htmlFor="email" className="font-medium">
            Email address
          </label>
          <input
            type="text"
            id="email"
            className="bg-grey-0 h-full rounded-md border border-(--color-grey-300) px-3 py-3 text-[1.6rem] shadow-(--shadow-sm)"
            disabled={isSigninUp}
            {...register("email", {
              required: "This field is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Please provide a valid email address",
              },
            })}
          />
          <span className="text-red-600">
            {errors?.email?.message as string | undefined}
          </span>
        </div>
        <div className="grid grid-cols-[24rem_1fr_1.2fr] items-center gap-6 px-0 py-5 not-last:border-b not-last:border-b-(--color-grey-100) first:pt-0">
          <label htmlFor="password" className="font-medium">
            Password (min 8 characters)
          </label>
          <input
            type="password"
            id="password"
            disabled={isSigninUp}
            className="bg-grey-0 h-full rounded-md border border-(--color-grey-300) px-3 py-3 shadow-(--shadow-sm)"
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 8,
                message: "Password needs a minimum of 8 characters",
              },
            })}
          />{" "}
          <span className="text-red-600">
            {errors?.password?.message as string | undefined}
          </span>
        </div>
        <div className="grid grid-cols-[24rem_1fr_1.2fr] items-center gap-6 px-0 py-5 not-last:border-b not-last:border-b-(--color-grey-100) first:pt-0">
          <label htmlFor="passwordConfirm" className="font-medium">
            Repeat password
          </label>
          <input
            type="password"
            id="passwordConfirm"
            disabled={isSigninUp}
            className="bg-grey-0 h-full rounded-md border border-(--color-grey-300) px-3 py-3 shadow-(--shadow-sm)"
            {...register("passwordConfirm", {
              required: "This field is required",
              validate: (value) =>
                value === getValues().password || "Passwords need to match",
            })}
          />{" "}
          <span className="text-red-600">
            {errors?.passwordConfirm?.message as string | undefined}
          </span>
        </div>

        <div className="flex justify-end gap-3 pt-4 last:pb-0">
          <button
            onClick={() => reset()}
            className="text-grey-600 bg-grey-0 rounded-lg border border-(--color-grey-200) px-6 py-5 text-2xl font-medium shadow-(--shadow-sm)"
          >
            Reset
          </button>
          <button
            className="text-brand-50 bg-brand-600 rounded-lg border border-(--color-grey-200) px-6 py-5 text-2xl font-medium shadow-(--shadow-sm)"
            type="submit"
          >
            Create new user
          </button>
        </div>
      </form>
    </div>
  );
}

import { SubmitHandler, useForm } from "react-hook-form";
import { useLogin } from "./useLogin";

interface FormProps {
  email: string;
  password: string;
}

export default function LoginForm() {
  const { isLoading, login } = useLogin();

  const { register, handleSubmit, reset } = useForm<FormProps>();
  const onSubmit: SubmitHandler<FormProps> = (data) => {
    login({ email: data.email, password: data.password });
    reset();
  };

  return (
    <form
      className="bg-grey-0 border-grey-100 overflow-hidden rounded-lg border px-[4rem] py-[2.4rem] text-[1.4rem]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-[0.8rem] px-0 py-[1.2rem]">
        <label htmlFor="email" className="font-medium">
          Email address
        </label>
        <input
          type="email"
          id="email"
          defaultValue="knxcs@example.com"
          className="border-grey-300 bg-grey-0 rounded-md border px-[1.2rem] py-[0.8rem] shadow-(--shadow-sm)"
          disabled={isLoading}
          {...register("email")}
        />
      </div>
      <div className="flex flex-col gap-[0.8rem] px-0 py-[1.2rem]">
        <label htmlFor="email" className="font-medium">
          Email address
        </label>
        <input
          type="password"
          id="password"
          defaultValue="password"
          disabled={isLoading}
          className="border-grey-300 bg-grey-0 rounded-md border px-[1.2rem] py-[0.8rem] shadow-(--shadow-sm)"
          {...register("password")}
        />
      </div>
      <div className="flex flex-col gap-[0.8rem] px-0 py-[1.2rem]">
        <button
          className="text-brand-50 bg-brand-600 rounded-md border-none px-[2.4rem] py-[1.2rem] font-medium shadow-(--shadow-sm)"
          disabled={isLoading}
        >
          Log in
        </button>
      </div>
    </form>
  );
}

import LoginForm from "../components/authentication/LoginForm";
import Logo from "../components/sidebar/Logo";

export default function Login() {
  return (
    <main className="bg-grey-50 grid min-h-screen grid-cols-[48rem] place-content-center gap-[3.2rem]">
      <Logo />

      <h4 className="text-center text-[3rem] leading-[1.4] font-semibold">
        Log in to your account
      </h4>

      <LoginForm />
    </main>
  );
}

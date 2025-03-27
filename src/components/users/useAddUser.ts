import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { signUpUser } from "../../api/apiUsers";

export function useAddUser() {
  const { mutate: signUpNewUser, isLoading: isSigninUp } = useMutation({
    mutationFn: (userData: {
      email: string;
      password: string;
      fullName: string;
    }) => signUpUser(userData),
    onSuccess: () => {
      toast.success(
        "Account successfully created! Please verify the new account from the user`s email address",
      );
    },

    onError: ({ message }: { message: string }) => toast.error(message),
  });

  return { signUpNewUser, isSigninUp };
}

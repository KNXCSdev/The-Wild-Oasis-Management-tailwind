import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { signInUser } from "../../api/apiUsers";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      signInUser({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      navigate("/home");
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("provided email or password are incorrect");
    },
  });

  return { login, isLoading };
}

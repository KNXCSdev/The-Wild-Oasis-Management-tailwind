import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { updateUser as updateUserApi } from "../../api/apiUsers";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isLoading: isUpdatingUser } = useMutation({
    mutationFn: ({
      password,
      avatar,
      fullName,
    }: {
      password?: string;
      avatar?: File | undefined;
      fullName?: string;
    }) => updateUserApi({ password, avatar, fullName }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      queryClient.invalidateQueries();
      toast.success("Successfully updated account data");
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Something went wrong with updating user data");
    },
  });

  return { updateUser, isUpdatingUser };
}

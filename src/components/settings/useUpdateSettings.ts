import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../api/apiSettings";

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success("Setting successfully edited");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },

    onError: ({ message }: { message: string }) => toast.error(message),
  });

  return { updateSetting, isUpdating };
}

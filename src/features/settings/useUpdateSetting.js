import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingAPI } from "../../services/apiSettings";
import { toast } from "react-hot-toast";


export function useUpdateSetting() {
      const queryClient = useQueryClient();
      const { isLoading: isUpdating, mutate: updateSetting } = useMutation({
            mutationFn: updateSettingAPI
            , onSuccess: () => {
                  toast.success('setting has updated.');
                  queryClient.invalidateQueries({ queryKey: ['settings'] })
            },
            onError: (err) => {
                  toast.error(err.message)
                  throw new Error('settings cannot updated.')
            }
      });
      return { updateSetting, isUpdating };
}
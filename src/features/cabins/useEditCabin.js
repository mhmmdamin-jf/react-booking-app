import { QueryClient, useMutation } from "@tanstack/react-query";
import { insertEditCabin } from "../../services/apiCabins";
import { toast } from "react-hot-toast";

export function useEditCabin() {
      const queryClient = new QueryClient();
      const { isLoading: isEditing, mutate: editCabin } = useMutation({
            mutationFn: insertEditCabin, onSuccess: () => {
                  toast.success('edited successfully.');
                  queryClient.invalidateQueries({ queryKey: ['cabins'] })
            },
            onError: () => { toast.error('cannot edited.') }
      });

      return { isEditing, editCabin };
}
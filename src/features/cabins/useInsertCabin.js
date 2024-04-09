import { QueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { insertEditCabin } from "../../services/apiCabins";

export function useInsertCabin() {
      const queryClient = new QueryClient();
      const { isLoading: isCreating, mutate: insertCabin } = useMutation({
            mutationFn: insertEditCabin, onSuccess: () => {
                  toast.success('craeted successfully.');
                  queryClient.invalidateQueries({ queryKey: ['cabins'] })
            },
            onError: () => { toast.error('cannot created.') }

      });
      return { isCreating, insertCabin };
}
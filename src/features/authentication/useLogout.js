import { QueryClient, useMutation } from "@tanstack/react-query"
import { apiGetLogout } from "../../services/apiAuth"
import toast from "react-hot-toast";
export function useLogout() {
      const queryClient = new QueryClient();
      const { data, mutate, isLoading, error } = useMutation({
            mutationKey: ["user"],
            mutationFn: apiGetLogout
            , onSuccess: () => queryClient.removeQueries()
      });
      if (error) {
            toast.error(error);
            console.log(error);
      }
      return { data, mutate, isLoading, error }
}
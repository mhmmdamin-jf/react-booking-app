import { useMutation } from "@tanstack/react-query";
import { apiLogin } from "../../services/apiAuth"
// import { useNavigate } from "react-router";
export function useLogin() {
      // const navigate = useNavigate();
      // const queryClient = new QueryClient();
      const { data, error, isLoading, mutate } = useMutation({
            mutationKey: ["user"],
            mutationFn: ({ email, password }) => apiLogin({ email, password }),
            // onSuccess: (data) => { console.log(data); queryClient.setQueryData(["user", { user: data }]); navigate("/dsahboard") }
      });
      if (error) {
            console.log(error);
      }
      return { data, isLoading, error, mutate };
}
import { useMutation } from "@tanstack/react-query";
import { apiSignUp } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast";
export function useSignUp() {
      const navigate = useNavigate();
      const { mutate, error, isLoading } = useMutation({
            mutationKey: ["user"], mutationFn:
                  ({ email, name, password }) => apiSignUp({ email, name, password })
            , onSuccess: () => { toast.success("user created."); navigate('/dashboard'); }
      });
      if (error) {
            console.log(error);
      }
      return { mutate, error, isLoading }
}
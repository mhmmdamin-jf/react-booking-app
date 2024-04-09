import { useQuery } from "@tanstack/react-query";
import { apiGetUser } from "../../services/apiAuth";

export function useUser() {
      const { data: { user, session } = {}, error, isLoading } = useQuery({ queryKey: ["user"], queryFn: apiGetUser });
      if (error) {
            console.log(error);
            return;
      }
      return { user, session, isLoading, isAuthenicated: user?.role === "authenticated" }
}
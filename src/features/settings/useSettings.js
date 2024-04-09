import { useQuery } from "@tanstack/react-query";
import { getAllSettings } from "../../services/apiSettings";
export function useSettings() {
      const { data, isLoading, error } = useQuery({ queryKey: ['Settings'], queryFn: getAllSettings });

      if (error) console.log(error)
      return { data, isLoading, error };
}

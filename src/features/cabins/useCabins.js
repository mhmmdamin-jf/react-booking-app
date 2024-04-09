import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabins() {
      const { data, error, isLoading } = useQuery({ queryKey: ['Cabins'], queryFn: getCabins });
      return { data, error, isLoading };
}
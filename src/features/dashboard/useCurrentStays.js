import { useQuery } from "@tanstack/react-query"
import { useUrl } from "../../hooks/useUrl"
import { getStaysAfterDate } from "../../services/apiBookings";
import toast, { } from "react-hot-toast"
import { subDays } from "date-fns";
export function useCurrentStays() {
      const [lastDaysNum] = useUrl({ param: "last", defaultValue: "7" });
      const numDays = subDays(Date.now(), Number(lastDaysNum)).toISOString();
      const { data, isLoading, error } = useQuery({ queryKey: [`last-${lastDaysNum}`], queryFn: () => getStaysAfterDate(numDays) });
      if (error) {
            toast.error(error);
            console.log(error)
      }
      return { data, isLoading, error };
}
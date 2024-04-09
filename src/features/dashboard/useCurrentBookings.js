import { useQuery } from "@tanstack/react-query"
import { useUrl } from "../../hooks/useUrl"
import { getBookingsAfterDate } from "../../services/apiBookings";
import toast, { } from "react-hot-toast"
import { subDays } from "date-fns";
export function useCurrentBookings() {
      const [lastDaysNum] = useUrl({ param: "last", defaultValue: "7" });
      const numDays = subDays(Date.now(), Number(lastDaysNum)).toISOString();
      const { data, isLoading, error } = useQuery({ queryKey: [`last-${lastDaysNum}`], queryFn: () => getBookingsAfterDate(numDays) });
      if (error) {
            toast.error(error);
            console.log(error)
      }
      return { data, isLoading, error, numDays };
}
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getBookings } from "../../services/apiBookings"
export function useBookings({ page }) {
      const queryClient = useQueryClient();
      const { data: { data, count } = {}, error, isLoading } = useQuery({ queryKey: ['Bookings', page], queryFn: () => getBookings({ page }) });
      if (page > 1) {
            queryClient.prefetchQuery({
                  queryKey: ['Bookings', String(page - 1)], queryFn: () => getBookings({ page: String(page - 1) })
            });
      }
      if (count && (page + 1) * 10 < count) {
            queryClient.prefetchQuery({
                  queryKey: ['Bookings', String(page + 1)], queryFn: () => getBookings({ page: String(page + 1) })
            })
      }
      return { data, count, error, isLoading };
}
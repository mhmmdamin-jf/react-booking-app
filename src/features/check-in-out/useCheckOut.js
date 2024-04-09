import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckOut() {
      const { mutate, data, error, isLoading } = useMutation({
            mutationKey: ["Bookings"], mutationFn: (id) => { updateBooking(id, { hasBreakfast: false, extrasPrice: 0, isPaid: false, status: "unconfirmed" }); }
      })
      if (error) {
            console.log(error);
            toast.error(error);
      }
      const queryClient = useQueryClient();
      queryClient.invalidateQueries({ queryKey: ["Bookings"] })
      return { mutate, data, isLoading, error };
}
import { useMutation } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export function useCheckIn() {
      const navigate = useNavigate();
      const { mutate, error, data, isLoading } = useMutation({
            mutationKey: ["Bookings"],
            mutationFn: ({ id, hasBreakfast }) => updateBooking(id, { status: "checked-in", isPaid: true, ...hasBreakfast }),
            onSuccess: () => { navigate("/bookings"); toast.success("checked in.") }
      });
      if (error) {
            toast.error(error);
            console.log(error);
            return;
      }
      return { mutate, data, error, isLoading };
}
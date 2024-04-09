import { useMutation } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";


export function useDeleteBooking(id) {
      const navigate = useNavigate();
      const { mutate, error, isLoading } = useMutation({ mutationKey: ["Bookings"], mutationFn: () => deleteBooking(id), onSuccess: () => navigate("/bookings") });
      if (error) {
            console.log(error);
            toast.error("cannot delete booking.")
            return;
      }
      return { mutate, error, isLoading }
}
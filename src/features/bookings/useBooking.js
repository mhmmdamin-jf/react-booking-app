import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getBooking } from "../../services/apiBookings";

export function useBooking() {
      const { bookingId } = useParams();
      const { data, error, isLoading } = useQuery({ queryKey: ["Bookings"], queryFn: () => getBooking({ id: bookingId }) });
      return { data, error, isLoading };
}
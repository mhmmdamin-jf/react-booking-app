import { formatCurrency } from "../../utils/helpers";
import Stat from "./Stat";
import { useCurrentBookings } from "./useCurrentBookings";
import { useCurrentStays } from "./useCurrentStays";
import { useCabins } from "../cabins/useCabins"
import {
      HiOutlineBanknotes,
      HiOutlineBriefcase,
      HiOutlineCalendarDays,
      HiOutlineChartBar,
} from "react-icons/hi2"; import Spinner from "../../ui/Spinner";
import { useUrl } from "../../hooks/useUrl";
export default function Stats() {
      const { data: Bookings = [], isLoading: BookingsLoading = true } = useCurrentBookings();
      const { data: Stays = [], isLoading: StaysLoading = true } = useCurrentStays();
      const { data: cabins, isLoading: isCabinsLoading } = useCabins();
      const [lastDaysNum] = useUrl({ param: "last", defaultValue: 7 })
      const totalSales = Bookings.reduce((acc, cur) =>
            acc + cur.totalPrice, 0);
      const checkings = Bookings.filter(booking => booking.status === "checked-in").length;
      const occupation = (Stays.reduce((acc, cur) => acc + cur.numNights, 0) / lastDaysNum * cabins?.length).toFixed(2).toString() + "%";
      if (StaysLoading || BookingsLoading || isCabinsLoading) {
            return <Spinner />
      }
      return <>
            <Stat color="blue"
                  icon={<HiOutlineBriefcase />} title="bookings" value={Bookings?.length} />
            <Stat color="green"
                  icon={<HiOutlineBanknotes />} title="sales" value={formatCurrency(totalSales)} />
            <Stat color="indigo"
                  icon={<HiOutlineCalendarDays />} title="checked-ins" value={checkings} />
            <Stat color="yellow"
                  icon={<HiOutlineChartBar />} title="occupation" value={occupation} />
      </>
}
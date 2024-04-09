import BookingRow from "./BookingRow";
import { Table } from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useBookings } from "./useBookings";
import { toast } from "react-hot-toast";
import Spinner from "../../ui/Spinner";
import { useUrl } from "../../hooks/useUrl"
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import BookingTableOperations from "./BookingTableOperations";
import { useEffect, useState } from "react";
import { getBookings } from "../../services/apiBookings";
import Pagination from "../../ui/Pagination";

function BookingTable() {
  const [data, setData] = useState();
  const [count, setCount] = useState();
  const [filterValue] = useUrl({ param: "booking-status", defaultValue: "all" });
  const [sortBy] = useUrl({ param: "sort-by", defaultValue: "date-desc" });
  const [method] = useUrl({ param: "sort-filter-method", defaultValue: "client" });
  const [page] = useUrl({ param: "page", defaultValue: 1 });
  let { data: bookings, error, isLoading } = useBookings({ page });
  let x = useBookings({ page });
  console.log(1, x, count)
  useEffect(function () {
    if (bookings && sortBy) {
      if (method === 'client' || !method) {
        const filteredData = filterValue === "all" ? bookings : bookings.filter(booking => booking.status === filterValue);
        const [sortValue, modifier] = sortBy.split("-");
        const align = modifier === "desc" ? 1 : -1;
        const sortedData = sortBy.toLowerCase().includes("date") ?
          filteredData.sort((a, b) => (new Date(a[sortValue]).getDate() - new Date(b[sortValue]).getDate()) * align)
          : filteredData.sort((a, b) => (a[sortValue] - b[sortValue]) * align);
        setData(sortedData);
        // setCount(bookingsCount);
      }
      if (method === 'api') {
        const fetchBookings = async () =>
          await getBookings({ filterValue, filterField: "booking-status", sortBy, page });
        fetchBookings().then(res => { setData(res.data); setCount(res.count); });
      }
    }
  }, [bookings, filterValue, method, sortBy, page])
  if (isLoading) { return (<Spinner />) }
  if (error) { toast.error("cannot get bookings information.", { duration: 500 }) }
  return (
    <Menus>
      <Row type="horizontal" justifyContent="space-between" >
        <Heading as="h1">All bookings</Heading>
        <BookingTableOperations />
      </Row>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={data}
          render={(booking) => (
            <BookingRow columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem" key={booking.id} booking={booking} />
          )}
        />
      </Table>
      <Pagination itemsCount={count} nextLable="next Page" prevLable="prev Page" pageSize={10} />
    </Menus >
  );
}

export default BookingTable;

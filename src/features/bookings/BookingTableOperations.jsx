import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";
import { useUrl } from "../../hooks/useUrl";
import Select from "../../ui/Select";
import Row from "../../ui/Row";

function BookingTableOperations() {
  const filterOptions = [
    { value: "all", lable: "All" },
    { value: "unconfirmed", lable: "UNCONFIRMED" },
    { value: "checked-in", lable: "CHECKED IN" },
    { value: "checked-out", lable: "CHECKED OUT" },
  ];
  const sortOptions = [
    { value: "startDate", lable: "Date(New-Old)" },
    { value: "startDate-desc", lable: "Date-Desc(Old-New)" },
    { value: "totalPrice", lable: "Amount(Higgest first)" },
    { value: "totalPrice-desc", lable: "Amount(Lowest first)" },
  ];
  const sortMethodOption = [
    { value: "client", lable: "Client Side" },
    { value: "api", lable: "API Side" },
  ]
  const [, setSortBy] = useUrl({ param: "sort-by", defaultValue: "date-desc" });
  const [, setMethod] = useUrl({ param: "sort-filter-method", defaultValue: "client" });
  return (
    <TableOperations>
      <Filter
        filterField="booking-status"
        options={filterOptions}
        defaultValue="all"
      />
      <SortBy
        options={sortOptions}
        setSortBy={setSortBy}
      />
      <Row type="horizontal">
        <p>sort and filter method:</p>
        <Select optionHandleClick={setMethod} options={sortMethodOption} ></Select>
      </Row>
    </TableOperations>
  );
}

export default BookingTableOperations;

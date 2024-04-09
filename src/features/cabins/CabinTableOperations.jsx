import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";
import { useUrl } from "../../hooks/useUrl";
import Select from "../../ui/Select";
import Row from "../../ui/Row";

function CabinTableOperations() {
      const filterOptions = [
            { value: "no-discount", lable: "No Discount" },
            { value: "with-discount", lable: "With Discount" },
            { value: "all", lable: "All" },
      ];
      const sortOptions = [
            { value: "regularPrice", lable: "Price(Higgest first)" },
            { value: "regularPrice-desc", lable: "Price(Lowest first)" },
            { value: "discount", lable: "Discount(Higgest first)" },
            { value: "discount-desc", lable: "Discount(Lowest first)" },
      ];
      const sortMethodOption = [
            { value: "client", lable: "Client Side" },
            { value: "api", lable: "API Side" },
      ]
      const [, setSortBy] = useUrl({ param: "sort-by", defaultValue: "price-desc" });
      const [, setMethod] = useUrl({ param: "sort-filter-method", defaultValue: "client" });
      return (
            <TableOperations>
                  <Filter
                        filterField="discount"
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

export default CabinTableOperations;

import CabinRowObj from "./CabinRow";
import Spinner from "../../../../s25/src/ui/Spinner";
// import Button from "../../ui/Button";
// import { useState } from "react";
// import CreateCabinForm from "./CreateCabinForm";
import { useCabins } from "./useCabins";
import { toast } from "react-hot-toast";
import ManageCabins from "./ManageCabins";
import { Table } from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useEffect, useState } from "react";
import { useUrl } from "../../hooks/useUrl";
import { getCabins } from "../../services/apiCabins";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import CabinTableOperations from "./CabinTableOperations";

// export const Table = styled.div`
//   border: 1px solid var(--color-grey-200);

//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `;


// export const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `;



export function QueryTable(prop) {
  // const [showAddForm, setShowAddForm] = useState(false);
  const { isCabinTable = false } = prop;
  const { isLoading, error, data: cabins } = useCabins();


  const [data, setData] = useState();
  const [filterValue] = useUrl({ param: "discount", defaultValue: "all" });
  const [sortBy] = useUrl({ param: "sort-by", defaultValue: "price-desc" });
  const [method] = useUrl({ param: "sort-filter-method", defaultValue: "client" });
  useEffect(function () {
    if (cabins) {
      if (method === 'client' || !method) {
        const filteredData = filterValue === "all" ? cabins : filterValue.toLowerCase().includes("with") ?
          cabins.filter(cabin => cabin.discount > 0) :
          cabins.filter(cabin => cabin.discount === 0);
        console.log(filterValue)
        const [sortValue, modifier] = sortBy.split("-");
        const align = modifier === "desc" ? -1 : 1;
        const sortedData = filteredData.sort((a, b) => (a[sortValue] - b[sortValue]) * align);
        setData(sortedData);
        console.log(sortedData);
      }
      if (method === 'api') {
        const fetchcabins = async () =>
          await getCabins({ filterValue, filterField: "discount", sortBy });
        fetchcabins().then(res => { setData(res); console.log("resault", res) });

      }
    }
  }, [cabins, filterValue, method, sortBy])


  if (isLoading) { return (<Spinner />) }
  if (error) {
    toast.error('cannot get cabins information.')
  }
  return (<>
    {isLoading && <Spinner />}
    <Menus>
      <Table role="table" columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
        <Row type="horizontal" justifyContent="space-between" >
          <Heading as="h1">All cabins</Heading>
          <CabinTableOperations />
        </Row>
        <Table.Header as='header'>
          <div></div>
          <div>Image</div>
          <div>Name</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body data={data} render={cabin => <CabinRowObj key={cabin.id} cabin={cabin} />}>
          {/* {cabins && cabins.map(cabin =>
          <Table.Row key={cabin.id}><CabinRowObj cabin={cabin} /></Table.Row>
        )} */}
        </Table.Body>
      </Table>
    </Menus>
    {/* {showAddForm && <CreateCabinForm />} */}
    {/* <Button onClick={() => setShowAddForm(!showAddForm)} variations={'primary'} size={'large'}>{showAddForm ? 'Close Form' : 'Add New Cabin'}</Button> */}
    {!isCabinTable && <ManageCabins />}
  </>
  )
}

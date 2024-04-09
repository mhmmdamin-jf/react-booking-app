import { useEffect } from "react";
import Row from "../ui/Row";
import { QueryTable } from '../features/cabins/CabinTable'
import { Toaster } from "react-hot-toast";
function Cabins() {

  useEffect(
    function () {
      // QueryTable();
      // getCabins().then(data => console.log(data));
    }
    , [])
  return (
    <Row type="vertical">
      <Toaster containerStyle={{ margin: 10 }} gutter={12} position="top-center" toastOptions={{ success: { duration: 2000 }, error: { duration: 5000 } }} />
      <QueryTable />
    </Row>
  );
}


export default Cabins;

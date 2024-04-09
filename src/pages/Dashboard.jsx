import Heading from "../ui/Heading";
import Row from "../ui/Row";
// import { styled } from "styled-components";
import DashboardFilter from "../features/dashboard/DashboardFilter";
import { StyledDashboardLayout } from "../features/dashboard/DashboardLayout"
import Stats from "../features/dashboard/Stats";
import SalesChart from "../features/dashboard/SalesChart";
import DurationChart from "../features/dashboard/DurationChart";
function Dashboard() {
  // const StyledDiv = styled.div`
  //   background-color: blueviolet;

  // `
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Dashboard</Heading>
        <DashboardFilter />
      </Row>
      <StyledDashboardLayout>
        <Stats />
        <DurationChart />
        <SalesChart />
      </StyledDashboardLayout>
    </>
  );
}

export default Dashboard;

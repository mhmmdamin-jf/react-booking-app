import { Outlet } from "react-router-dom"
import Sidebar from './ui/Sidebar';
import Header from './ui/Header'
import { styled } from "styled-components";
function AppLayout() {
      const StyledDiv = styled.div`
          display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
  background-color: var(--color-grey-50);
      `
      const StyledOutlet = styled.div`
                    background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow: scroll;

      `
      const Container = styled.div`
      max-width: 120rem;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 3.2rem;
    `;
      return (
            <StyledDiv>
                  <Header />
                  <Sidebar />
                  <StyledOutlet>
                        <Container>
                              <Outlet />
                        </Container>
                  </StyledOutlet>
            </StyledDiv>
      )
}

export default AppLayout
import { cloneElement, createContext, useContext } from "react";
import styled from "styled-components";
const TableContext = createContext();
const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const CommonRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;
  columns: ${(props) => props.columns};
  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

// const Footer = styled.footer`
//   background-color: var(--color-grey-50);
//   display: flex;
//   justify-content: center;
//   padding: 1.2rem;

//   /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
//   &:not(:has(*)) {
//     display: none;
//   }
// `;

// const StyledEmpty = styled.p`
//   font-size: 1.6rem;
//   font-weight: 500;
//   text-align: center;
//   margin: 2.4rem;
// `;

//eslint-disable-next-line
function Table(prop) {
  // const { children, columns } = prop;
  const { children, columns } = prop;
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable>
        {children}
        {/* {(prop.children).map(child => cloneElement(child, { columns: prop.columns }))} */}
        {/* {cloneElement(children, { columns: columns })} */}
      </StyledTable>
    </TableContext.Provider>
  )
}
//eslint-disable-next-line
function Header(prop) {
  const { columns: rowColumns } = useContext(TableContext);
  return (
    <StyledHeader columns={rowColumns}>
      {prop.children}
    </StyledHeader>
  )
}
//eslint-disable-next-line
function Body(prop) {
  const { columns: rowColumns } = useContext(TableContext);
  return (
    <StyledBody>
      {prop.data && (prop.data.map(prop.render)).map(child => cloneElement(child, { columns: rowColumns }))}
    </StyledBody>
  )
}

//eslint-disable-next-line
function Row(prop) {
  const { columns } = prop;
  return (
    <StyledRow columns={columns}>
      {/* {prop.children} */}
      {/* {prop.children && (prop.children).map(child => cloneElement(child, {}))} */}
      {/* {cloneElement(prop.children)} */}
      {prop.children}
    </StyledRow>
  )
}

//eslint-disable-next-line
// function Empty(children) {
//   console.log(children)
//   return (
//     <StyledEmpty>
//       {children}
//     </StyledEmpty>
//   )
// }

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
// Table.Empty = Empty;

export { Table }


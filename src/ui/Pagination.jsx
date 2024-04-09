import { createContext, useCallback, useContext, useMemo } from "react";
import styled from "styled-components";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { useUrl } from "../hooks/useUrl"
const PaginationContext = createContext();
const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function PaginationButtons() {
  const { prevLable, nextLable, nextPage, prevPage } = useContext(PaginationContext);
  return <Buttons>
    <PaginationButton onClick={prevPage} >
      <RiArrowLeftSLine />
      <span>{prevLable}</span>
    </PaginationButton>
    <PaginationButton onClick={nextPage}>
      <span>{nextLable}</span>
      <RiArrowRightSLine />
    </PaginationButton>
  </Buttons >
}
//eslint-disable-next-line
export default function Pagination({ nextLable, prevLable, pageSize, itemsCount }) {


  const [page, setPage] = useUrl({ param: "page", defaultValue: "1" });
  const pageCount = Number(page);
  const lastPageNumber = Math.ceil(itemsCount / pageSize)
  const nextPage = useCallback(() => {
    if (pageCount === lastPageNumber) { setPage({ value: pageCount }); console.log(22); return; }
    setPage({ value: pageCount + 1 });
  }, [pageCount, setPage, lastPageNumber])
  const prevPage = useCallback(() => {
    if (pageCount === 1) { setPage({ value: 1 }); return }
    setPage({ value: pageCount - 1 });
  }, [pageCount, setPage])
  const values = useMemo(() => { return { nextLable, prevLable, nextPage, prevPage } }, [nextLable, prevLable, nextPage, prevPage])
  return <PaginationContext.Provider value={values}>
    <StyledPagination>
      <P>Items <span>{(pageCount - 1) * pageSize + 1}</span> to <span>{(pageCount === lastPageNumber) ?
        itemsCount : pageCount * pageSize}</span> from <span>{itemsCount}</span> items</P>
      <PaginationButtons />
    </StyledPagination>
  </PaginationContext.Provider>
}

Pagination.Button = PaginationButtons;
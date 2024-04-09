import styled, { css } from "styled-components";
import { useUrl } from "../hooks/useUrl";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;
//eslint-disable-next-line
export default function Filter({ filterField, options, defaultValue, isLoading = false }) {
  //eslint-disable-next-line
  const [searchParams, setSearchParams] = useUrl({ param: filterField, defaultValue },);
  const handleClick = ({ value }) => {
    setSearchParams({ value })
  }
  return (<StyledFilter>
    {/* eslint-disable-next-line */}
    {options && options.map(option =>
      <FilterButton key={option.value} disabled={isLoading} active={searchParams === option.value}
        onClick={() => handleClick({ value: option.value })}>{option.lable}</FilterButton>)}
  </StyledFilter>)
} 
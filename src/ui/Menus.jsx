import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import useOutsideClick from "../hooks/useOusideClick";
import { HiDotsHorizontal } from "react-icons/hi";
const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;
border: 0.3px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext();
export default function Menus(prop) {
  const [openId, setOpenId] = useState('');
  const [position, setPosition] = useState({});
  const { children } = prop;
  const Open = setOpenId;
  const Close = () => setOpenId('');

  return (
    <MenusContext.Provider value={{ openId, Open, Close, position, setPosition }}>
      {children}
    </MenusContext.Provider>
  )
}

export function Menu(prop) {
  const { children } = prop;

  return (<StyledMenu>
    {children}
  </StyledMenu>)
}

export function Toggle(prop) {
  const { id } = prop;
  const { openId, Open, Close, setPosition } = useContext(MenusContext);

  function handleClick(e) {
    const rect = e.target.closest('button').getBoundingClientRect();
    const rectY = rect.y + rect.height * .9;
    const rectX = window.innerWidth - rect.x * 0.99;
    setPosition({ x: rectX, y: rectY })
    openId === '' || openId !== id ? Open(id) : Close;
  }

  return (
    <StyledToggle>
      <span onClick={e => handleClick(e)}><HiDotsHorizontal /></span>
    </StyledToggle>
  )
}

export function List(prop) {
  const { children, id } = prop;
  const { openId, Close, position } = useContext(MenusContext);
  const { boxRef } = useOutsideClick(Close, true);
  if (openId !== id) return null;
  return createPortal(<StyledList ref={boxRef} position={position}>
    {children}
  </StyledList>, document.body)
}

export function Button(prop) {
  const { children, disabled, onClick: clickFunction } = prop;
  const { Close } = useContext(MenusContext);
  function handleClick() {
    clickFunction?.();
    Close();
  }
  return (
    <li>
      <StyledButton disabled={disabled} onClick={handleClick}>{children}</StyledButton>
    </li>
  )
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;
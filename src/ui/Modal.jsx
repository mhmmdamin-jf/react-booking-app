import { cloneElement, createContext, useContext, useMemo, useState } from 'react';
import { createPortal } from 'react-dom'
// import useOutsideClick from '../hooks/useOusideClick';
import styled from "styled-components";
import useOutsideClick from '../hooks/useOusideClick';

const ModalContext = createContext();

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
  overflow: scroll;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;


//eslint-disable-next-line
export function Window({ children, name }) {
  const { isOpen, Close } = useContext(ModalContext);
  const { boxRef } = useOutsideClick(Close, true);
  if (isOpen !== name) return null;
  return createPortal(
    <Overlay >
      <StyledModal ref={boxRef}>
        <Button onClick={Close}>x</Button>
        {children}
        {/* {cloneElement(children, { onCloseModal: Close })} */}
      </StyledModal>
    </Overlay>
    , document.body
  )
}

export function Open({ children, opens }) {
  const { OpenWindow } = useContext(ModalContext);
  return cloneElement(children, { onClick: () => { OpenWindow?.(opens) } })
}

function Modal(children) {
  const { children: childrenn } = children;
  const [isOpen, setIsOpen] = useState("");
  const Close = () => { setIsOpen(""); }
  const OpenWindow = setIsOpen;
  const value = useMemo(() => { return { isOpen, Close, OpenWindow, setIsOpen } }, [isOpen, setIsOpen, OpenWindow])
  return (
    <ModalContext.Provider value={value}>
      {childrenn}
    </ModalContext.Provider>
  )
}


Modal.Open = Open;
Modal.Window = Window;
export default Modal;
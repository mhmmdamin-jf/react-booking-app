import { useEffect, useRef } from "react";

export default function useOutsideClick(func, capturePropagation = true) {
      const boxRef = useRef();
      const handleClick = e => {
            if (boxRef.current && !boxRef.current?.contains(e.target)) {
                  func?.();
            }
      }
      useEffect(function () {
            document.addEventListener('click', handleClick, { capture: capturePropagation })
            return function () {
                  document.removeEventListener('click', handleClick, { capture: capturePropagation })
            }
      }, [handleClick]);
      return { boxRef }
}
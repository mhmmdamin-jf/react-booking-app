import { useEffect, useState } from "react";


export function useLocalStorage({ key, initialValue }) {
  const [value, setValue] = useState(function () {
    const localValue = localStorage.getItem(key);
    return localValue ? JSON.parse(localValue) : initialValue;
  });
  useEffect(function () {
    localStorage.setItem(key, value);
  }, [value, key]);
  return [value, setValue];
}
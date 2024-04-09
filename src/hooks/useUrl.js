import { useSearchParams } from "react-router-dom"
export function useUrl({ param, defaultValue }) {
      const [seacrhParams, setSearchParams] = useSearchParams();
      const setUrl = ({ value }) => {
            seacrhParams.set(param, value);
            setSearchParams(seacrhParams);
      }
      return [seacrhParams.get(param)?.toString() || defaultValue, setUrl];
}
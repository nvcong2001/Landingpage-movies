import { useEffect, useState } from "react";

export default function useDebounceQuery(query = "", delay = 1000) {
  const [debounceValue, setDebounceValue] = useState(query);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(query);
    }, delay);
    return () => clearTimeout(timeout);
  }, [query, delay]);
  return debounceValue;
}

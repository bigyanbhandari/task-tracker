import { useEffect, useState } from 'react';
import type { Debounce } from '../../../utils/type';

export const useDebounce = ({ value, delay }: Debounce) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

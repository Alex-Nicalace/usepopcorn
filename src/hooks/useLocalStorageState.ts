import { Dispatch, SetStateAction, useEffect } from 'react';
import { useState } from 'react';

export function useLocalStorageState<T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(function () {
    const jsonData = localStorage.getItem(key);
    return jsonData ? (JSON.parse(jsonData) as T) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}

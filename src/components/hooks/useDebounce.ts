import { useCallback, useRef } from 'react';

/**
 * Делает функцию с задержкой.
 * @param callback - Функция, которую нужно задержать.
 * @param delay - Задержка в миллисекундах.
 * @returns Задержанная функция.
 */
export default function useDebounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
  const timerId = useRef<NodeJS.Timeout>();

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      return new Promise<ReturnType<T>>((resolve) => {
        if (timerId.current) {
          clearTimeout(timerId.current);
        }
        timerId.current = setTimeout(() => {
          const result = callback(...args);
          resolve(result);
        }, delay);
      });
    },
    [callback, delay]
  );

  return debouncedCallback;
}

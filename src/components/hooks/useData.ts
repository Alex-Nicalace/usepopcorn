import { useEffect, useRef, useState } from 'react';

export default function useData<T>(
  url: string,
  initialData: T,
  delay: number = 0
) {
  const [data, setData] = useState<T>(initialData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const timerId = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const controller = new AbortController();
    let ignore = false;
    if (timerId.current) {
      clearTimeout(timerId.current);
    }
    setIsLoading(true);
    setError('');
    timerId.current = setTimeout(async function () {
      try {
        const response = await fetch(url, {
          signal: controller.signal,
        });
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        if (data.Response === 'False') throw new Error('Movie not found!');
        if (!ignore) {
          setData(data);
        }
      } catch (error) {
        if (error instanceof Error) {
          if (!ignore && error.message !== 'AbortError') {
            setError(error.message);
          }
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }, delay);
    return () => {
      controller.abort(); // отменяем запрос при размонтировании компонента
      ignore = true;
    };
  }, [url, delay]);
  return { data, setData, isLoading, error };
}

import { useEffect, useRef, useState } from 'react';

export default function useData<T>(
  url: string,
  initialData: T,
  delay: number = 0,
  propertyNamePayload?: string,
  disabled: boolean = false
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

    setError('');

    if (disabled) {
      setIsLoading(false);
      setData([] as T);
      return;
    }

    setIsLoading(true);

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
          if (propertyNamePayload) {
            setData(data[propertyNamePayload]);
          } else {
            setData(data);
          }
        }
      } catch (error) {
        if (error instanceof Error) {
          if (!ignore && error.message !== 'AbortError') {
            console.error(error.message);
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
  }, [url, delay, propertyNamePayload, disabled]);
  return { data, isLoading, error };
}

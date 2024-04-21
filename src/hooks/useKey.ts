import { useEffect } from 'react';

export function useKey(keyCode: string, callback: () => void): void {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.code.toLowerCase() === keyCode.toLowerCase()) {
        callback();
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return function () {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [callback, keyCode]);
}

import { useEffect, useRef } from 'react';

export function useRenderCount() {
  const count = useRef(0);

  useEffect(() => {
    count.current += 1;
    return () => (count.current = 0);
  }, []);

  useEffect(() => console.log(`Rendering nr. ${count.current}`), [count]);

  const resetCount = () => (count.current = 0);

  return [count, resetCount];
}

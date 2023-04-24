import { useCallback, useDebugValue, useState } from 'react';

const useToggle = (initialState = false) => {
  const [state, setState] = useState(initialState);

  useDebugValue(state);

  // Memorize the toggler function in case we pass it down to components,
  // as this will never change, further renderes will simply use it again.
  const toggle = useCallback(() => {
    setState(currentState => !currentState);
  }, []);

  return [state, toggle];
};

export { useToggle };

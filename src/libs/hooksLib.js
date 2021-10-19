import { useLocation } from "react-router-dom";
import { useState, useEffect, useLayoutEffect, useCallback, useRef } from "react";

export function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
		return null;
  }, [delay]);
}

export function useTimeout(callback, delay) {
  const savedCallback = useRef(callback)

  // Remember the latest callback if it changes.
  useLayoutEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the timeout.
  useEffect(() => {
    // Don't schedule if no delay is specified.
    if (!delay) {
      return null;
    }

    const id = setTimeout(() => savedCallback.current(), delay)

    return () => clearTimeout(id)
  }, [delay])
}

export default useTimeout

// eslint-disable-next-line
export function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export function useDebounce(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );
  return debouncedValue;
}

// code taken from https://github.com/vmarchesin/react-konami-code
const KONAMI_CODE = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
export function useKonami(action: () => void, { code = KONAMI_CODE } = {}) {
  const [input, setInput] = useState([]);

  const onKeyUp = useCallback(
    (e) => {
      const newInput = input;
      newInput.push(e.keyCode);
      newInput.splice(-code.length - 1, input.length - code.length);

      setInput(newInput);

      if (newInput.join("").includes(code.join(""))) {
        action();
      }
    },
    [input, setInput, code, action]
  );

  useEffect(() => {
    document.addEventListener("keyup", onKeyUp);
    return () => {
      document.removeEventListener("keyup", onKeyUp);
    };
  }, [onKeyUp]);
}

import { useLocation } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";

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

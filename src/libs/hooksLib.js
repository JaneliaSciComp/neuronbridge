import { useState } from "react";
import { useLocation } from "react-router-dom";

// eslint-disable-next-line
export function useFormFields(initialState) {
  const [fields, setValues] = useState(initialState);

  return [
    fields,
    function(event) {
      setValues({
        ...fields,
        [event.target.id]: event.target.value
      });
    }
  ];
}

export function useQuery() {
  return new URLSearchParams(useLocation().search);
}

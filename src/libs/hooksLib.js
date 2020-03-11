import { useState } from "react";

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

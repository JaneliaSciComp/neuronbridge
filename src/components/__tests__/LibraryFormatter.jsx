import React from "react";
import {render} from '@testing-library/react';
import LibraryFormatter from "../LibraryFormatter";

describe('LibraryFormatter: unit tests', () => {
  it('formats FlyEM strings correctly', () => {
    const { getByText } = render(<LibraryFormatter type="flyem_library"/>);
    expect(getByText(/FlyEM/));
  });

  it('formats MCFO strings correctly', () => {
    const { getByText } = render(<LibraryFormatter type="flylight_gen1_mcfo_case_1"/>);
    expect(getByText(/FlyLight gen1 MCFO case 1/));
  });
  it('formats flylight strings correctly', () => {
    const { getByText, rerender } = render(<LibraryFormatter type="flylight_library"/>);
    expect(getByText(/FlyLight/));
    rerender(<LibraryFormatter type="FlyLight_library"/>);
    expect(getByText(/FlyLight/));
  });

  it('formats Split-GAL4 strings correctly', () => {
    const { getByText, rerender } = render(<LibraryFormatter type="splitgal4"/>);
    expect(getByText('Split-GAL4'));
    rerender(<LibraryFormatter type="split-gal4"/>);
    expect(getByText('Split-GAL4'));
    rerender(<LibraryFormatter type="split-gal4 library"/>);
    expect(getByText(/Split-GAL4/));
  });

  it('formats _ strings correctly', () => {
    const { queryByText, rerender } = render(<LibraryFormatter type="splitgal4_library_1"/>);
    expect(queryByText(/_/)).toBeNull();
    rerender(<LibraryFormatter type="flyem__should__not__have"/>);
    expect(queryByText(/_/)).toBeNull();
  });

});

import React from "react";
import {render} from '@testing-library/react';
import About from "./About";

describe('About: unit tests', () => {
  it('renders', () => {
    render(<About/>);
  });
});

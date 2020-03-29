import React from 'react';
import { render } from '@testing-library/react';
import InputOverflow from '..';

describe('Basic InputOverflow', () => {
  it('renders', () => {
    expect(render(<InputOverflow value="hello" readOnly />)).toBeTruthy();
  });
});

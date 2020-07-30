import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders applications', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Wrapped around edges?/i);
  expect(linkElement).toBeInTheDocument();
});

it('should match snapshot', async () => {
  const { asFragment } = render(<App />);
  expect(asFragment()).toMatchSnapshot();
});

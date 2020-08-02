import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { shallow, mount } from 'enzyme';

test('renders applications', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Wrapped around edges?/i);
  expect(linkElement).toBeInTheDocument();
});

it('should match snapshot', async () => {
  const { asFragment } = render(<App />);
  expect(asFragment()).toMatchSnapshot();
});

it('click a cell will toggle it between undefined and green for background color', async () => {
  // const { getByTestId } = render(<App />);
  // const usernameEl = getByTestId('grid')
  // // console.log('usernameEl=', usernameEl);
  // console.log('usernameEl=', usernameEl.getElementsByTagName('div'));
  // console.log('usernameEl=', usernameEl.children[0].getAttribute('style'));
  // expect(usernameEl.children[0].getAttribute('style')).toBe('width: 20px; height: 20px; border: 1px solid black;');
  // // usernameEl.children[0].simulate('click');

  // const wrapper = mount(<App />);
  // // wrapper.find('#0-0').simulate('click');
  // console.log('===============', wrapper.find('#grid div').get(0));
  // console.log('===============', wrapper.find('#grid div').get(0).props.style.backgroundColor);
  // // wrapper.find('#grid div').at(0).simulate('click');
  // console.log('===============', wrapper.find('#grid div').get(0).props.style.backgroundColor);

  const wrapper = mount(<App />);
  expect(wrapper.find('#grid div').get(0).props.style.backgroundColor).toBe(undefined);
  wrapper.find('#grid div').at(0).simulate('click');
  expect(wrapper.find('#grid div').get(0).props.style.backgroundColor).toBe('green');
  wrapper.find('#grid div').at(0).simulate('click');
  expect(wrapper.find('#grid div').get(0).props.style.backgroundColor).toBe(undefined);
});

it('click the last button can choose unwrapped and wrap the edges', async () => {
  // console.log('=================', wrapper.text());
  // startrandomresetnext generationWrapped around edges? No   wrap

  const wrapper = mount(<App />);
  expect(wrapper.text()).toContain('Wrapped around edges? Yes');
  wrapper.find('button[children="unwrap"]').simulate('click');
  expect(wrapper.text()).toContain('Wrapped around edges? No');
  expect(wrapper.exists('button[children="wrap"]')).toBe(true);

  wrapper.find('button[children="wrap"]').simulate('click');
  expect(wrapper.text()).toContain('Wrapped around edges? Yes');
  expect(wrapper.exists('button[children="unwrap"]')).toBe(true);
});

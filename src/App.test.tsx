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

it('click start and stop button', async () => {
  const wrapper = mount(<App />);
  expect(wrapper.exists('button[children="start"]')).toBe(true);

  wrapper.find('button[children="start"]').simulate('click');
  expect(wrapper.exists('button[children="start"]')).toBe(false);
  expect(wrapper.exists('button[children="stop"]')).toBe(true);

  wrapper.find('button[children="stop"]').simulate('click');
  expect(wrapper.exists('button[children="stop"]')).toBe(false);
  expect(wrapper.exists('button[children="start"]')).toBe(true);
});

it('click reset button', async () => {
  const wrapper = mount(<App />);
  expect(wrapper.find('#grid div').get(0).props.style.backgroundColor).toBe(undefined);
  wrapper.find('#grid div').at(0).simulate('click');
  expect(wrapper.find('#grid div').get(0).props.style.backgroundColor).toBe('green');
  wrapper.find('button[children="reset"]').simulate('click');
  expect(wrapper.find('#grid div').get(0).props.style.backgroundColor).toBe(undefined);
});

it('click random button', async () => {
  const wrapper = mount(<App />);
  let foundGreenCell = false;

  wrapper.find('button[children="random"]').simulate('click');

  for (let i = 0; i < 900; i++) {
    if (wrapper.find('#grid div').get(i).props.style.backgroundColor === 'green') {
      foundGreenCell = true;
      break;
    }
  }

  // expect to find at least one cell has turn green color;
  expect(foundGreenCell).toBe(true);
});

/*
 *   Test this structure:
 *   0 0 0 0 0 0
 *   0 0 1 1 1 0
 *   0 1 1 1 0 0
 *   0 0 0 0 0 0
 *
 *   will becomes:
 *   0 0 0 1 0 0
 *   0 1 0 0 1 0
 *   0 1 0 0 1 0
 *   0 0 1 0 0 0
 */
it('click next generation button', async () => {
  const wrapper = mount(<App />);

  wrapper.find('#grid div').at(32).simulate('click');
  wrapper.find('#grid div').at(33).simulate('click');
  wrapper.find('#grid div').at(34).simulate('click');

  wrapper.find('#grid div').at(61).simulate('click');
  wrapper.find('#grid div').at(62).simulate('click');
  wrapper.find('#grid div').at(63).simulate('click');

  wrapper.find('button[children="next generation"]').simulate('click');

  wrapper.find('#grid div').at(3).simulate('click');
  wrapper.find('#grid div').at(31).simulate('click');
  wrapper.find('#grid div').at(34).simulate('click');
  wrapper.find('#grid div').at(61).simulate('click');
  wrapper.find('#grid div').at(64).simulate('click');
  wrapper.find('#grid div').at(92).simulate('click');
});

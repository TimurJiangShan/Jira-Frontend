import React from 'react';
import App from './App';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// mount: 当前组件以及子组件全渲染出来
// 单元测试用 shallow, 集成测试用 mount

Enzyme.configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const wrapper = mount(<App />);
  expect(wrapper).toMatchSnapshot();
  // const container = wrapper.find('[data-test="container"]');
  // expect(wrapper.find('[data-test="container"]').length).toBe(1);
  // console.log(wrapper.debug());
  // expect(wrapper.find('[data-test="container"]').prop('title')).toBe('dell lee');
  // expect(container).toExist();
  // expect(container).toHaveProp('title', 'dell lee');
});

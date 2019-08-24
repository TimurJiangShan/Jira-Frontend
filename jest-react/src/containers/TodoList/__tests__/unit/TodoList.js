import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TodoList from '../../index';

// mount: 当前组件以及子组件全渲染出来
// 单元测试用 shallow, 集成测试用 mount

Enzyme.configure({ adapter: new Adapter() });

it('TodoList initializes list to be empty', () => {
  const wrapper = shallow(<TodoList />);
  expect(wrapper.state('undoList')).toEqual([]);
});

it('TodoList should pass a function which adds undolist content', () => {
  const wrapper = shallow(<TodoList />);
  const Header = wrapper.find('Header');
  expect(Header.prop('addUndoItem')).toBe(wrapper.instance().addUndoItem);
});

it('When Header enters, undoList should add new content', () => {
  const wrapper = shallow(<TodoList />);
  const Header = wrapper.find('Header');
  const addFunc = Header.prop('addUndoItem');
  addFunc('learn react');
  expect(wrapper.state('undoList').length).toBe(1);
  expect(wrapper.state('undoList')[0]).toBe('learn react');

});


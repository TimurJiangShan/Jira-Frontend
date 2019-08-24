import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Header from '../../components/Header';

// mount: 当前组件以及子组件全渲染出来
// 单元测试用 shallow, 集成测试用 mount

Enzyme.configure({ adapter: new Adapter() });

it('Header component contains a inputBox', () => {
  const wrapper = shallow(<Header />);
  const inputElem = wrapper.find("[data-test='input']");
  expect(inputElem.length).toBe(1);
});

/* 
it('Header component input changees as user input', () => {
    const wrapper = shallow(<Header />);
    const inputElem = wrapper.find("[data-test='input']");
    const userInput = 'learn jest';
    inputElem.simulate('change', {
        target: { value: userInput }
    })

})



*/

it('Header component initial should be empty', () => {
    const wrapper = shallow(<Header />);
    const inputElem = wrapper.find("[data-test='input']");
    expect(inputElem.prop('value')).toEqual('');
})


it('Header component input changes as user input', () => {
  const wrapper = shallow(<Header />);
  const inputElem = wrapper.find("[data-test='input']");
  const userInput = 'Learning Jest';
  inputElem.simulate('change', {
      target: { value: userInput }
  });
  // 单元测试中，更倾向于面向数据的测试
  expect(wrapper.state('value')).toEqual(userInput);

  // 集成测试中，更倾向于DOM的展示
  // const newInputElem = wrapper.find("[data-test='input']"); // 新的变量，重新获取一下DOM节点的值
  // expect(newInputElem.prop('value')).toEqual(userInput);
});

it('Header component, if no content, do nothing', () => {
  const fn = jest.fn();
  const wrapper = shallow(<Header addUndoItem={fn}/>);
  const inputElem = wrapper.find("[data-test='input']");
  wrapper.setState({
      value: ''
  });
  inputElem.simulate('keyUp', {
      keyCode: 13
  });
  expect(fn).not.toHaveBeenCalled();
})

it('Header component, if content exists, be called', () => {
  const fn = jest.fn();
  const wrapper = shallow(<Header addUndoItem={fn}/>);
  const inputElem = wrapper.find("[data-test='input']");
  wrapper.setState({
      value: 'learn react'
  });
  inputElem.simulate('keyUp', {
      keyCode: 13
  });
  expect(fn).toHaveBeenCalled();
  expect(fn).toHaveBeenCalledWith('learn react');
})

it('Header component, if content exists, should be removed', () => {
  const fn = jest.fn();
  const wrapper = shallow(<Header addUndoItem={fn}/>);
  const inputElem = wrapper.find("[data-test='input']");
  wrapper.setState({
      value: 'learn react'
  });
  inputElem.simulate('keyUp', {
      keyCode: 13
  });

  const newInputElem = wrapper.find("[data-test='input']");
  expect(newInputElem.prop('value')).toBe('');
})
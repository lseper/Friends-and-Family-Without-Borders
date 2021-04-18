import React from 'react';
import Alert from '../components/alert'
import "jest-enzyme"
import {shallow, configure, mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({adapter: new Adapter()});
it('renders', () => {
    const tree = mount(
        <Alert
            message="Button"
            color="red-500"
        />
    )
    expect(tree).toMatchSnapshot()
});

it('displays the correct background color', () => {
    const wrapper = mount(
        <Alert
            message="Button"
            color="red-500"
        />
    )

    const firstDiv = wrapper.find('div').at(0)
    expect(firstDiv.hasClass('bg-red-500')).toBeTruthy()
});

it('displays the correct background color if no background color is passed in', () => {
    const wrapper = mount(
        <Alert
            message="Button"
        />
    )

    const firstDiv = wrapper.find('div').at(0)
    expect(firstDiv.hasClass("bg-")).toBeFalsy()
});

it('displays the correct text color', () => {
    const wrapper = mount(
        <Alert
            message="Button"
            color="red-500"
        />
    )

    const firstDiv = wrapper.find('div').at(0)
    expect(firstDiv.hasClass('text-white')).toBeTruthy()
});

it('displays the correct text when no message if passed in', () => {
    const wrapper = mount(
        <Alert
            color="red-500"
        />
    )

    const firstDiv = wrapper.find('span').at(1)
    expect(firstDiv.text()).toBe("")
});

it('displays the correct text', () => {
    const wrapper = mount(
        <Alert
            message= "Button"
            color="red-500"
        />
    )

    const firstDiv = wrapper.find('span').at(1)
    expect(firstDiv.text()).toBe("Button")
});

it('displays the exclamation point icon', () => {
    const wrapper = mount(
        <Alert
            message="Button"
            color="red-500"
        />
    )

    const numIcons = 1;
    const icon = wrapper.find('FontAwesomeIcon');
    expect(icon.length).toBe(numIcons);
});

it('check that button click updates use state to chose alert popup', () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState')
    useStateSpy.mockImplementation((init)=> [init, setState]);
    
    const wrapper = mount(
        <Alert
            message="Button"
            color="red-500"
        />
    )

    const xButton = wrapper.find('span').at(2);
    xButton.simulate("click");
    expect(setState).toHaveBeenCalledWith(false);
});

